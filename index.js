import dotenv from "dotenv";
import mysql from "mysql2";
import express from "express";

dotenv.config();

const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("Connected to MySQL database");
});

app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

app.get("/categories/:id/products", (req, res) => {
  const categoryId = req.params.id;

  db.query(
    "SELECT * FROM products WHERE category_id = ?",
    [categoryId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(results);
    },
  );
});

app.post("/categories", (req, res) => {
  const { name } = req.body;

  db.query(
    "INSERT INTO categories (name) VALUES (?)",
    [name],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: result.insertId,
        name: name,
      });
    },
  );
});

app.patch("/categories/:id", (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  db.query(
    "UPDATE categories SET name = ? WHERE id = ?",
    [name, categoryId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        id: categoryId,
        name: name,
      });
    },
  );
});

app.delete("/categories/:id", (req, res) => {
  const categoryId = req.params.id;

  db.query(
    "DELETE FROM categories WHERE id = ?",
    [categoryId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: "Category deleted",
      });
    },
  );
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

app.get("/products/:id", (req, res) => {
  const productId = req.params.id;

  db.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(results[0]);
    },
  );
});

app.post("/products", (req, res) => {
  const { title, description, stock, price, image, category_id } = req.body;

  db.query(
    `INSERT INTO products
    (title, description, stock, price, image, category_id)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, stock, price, image, category_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: result.insertId,
        title: title,
      });
    },
  );
});

app.patch("/products/:id", (req, res) => {
  const productId = req.params.id;
  const { title, description, stock, price, image, category_id } = req.body;

  db.query(
    `UPDATE products
    SET title = ?, description = ?, stock = ?, price = ?, image = ?, category_id = ?
    WHERE id = ?`,
    [title, description, stock, price, image, category_id, productId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        id: productId,
        title: title,
        description: description,
        stock: stock,
        price: price,
        image: image,
        category_id: category_id,
      });
    },
  );
});

app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;

  db.query("DELETE FROM products WHERE id = ?", [productId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      message: "Product deleted",
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
