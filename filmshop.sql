DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    stock INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (id, name) VALUES
(1, 'Horror'),
(2, 'Thriller'),
(3, 'Comedy'),
(4, 'Drama');

INSERT INTO products
(id, title, description, stock, price, image, created_date, category_id)
VALUES
(1, 'Scream', 'A masked killer targets a group of teenagers in Woodsboro.', 10, 129.00, 'scream.jpg', '2026-08-03 11:37:06', 1),
(2, 'Halloween', 'A masked killer returns to the town of Haddonfield.', 8, 119.00, 'halloween.jpg', '2026-08-03 11:40:04', 1),
(3, 'Gone Girl', 'A woman disappears and suspicion falls on her husband.', 12, 139.00, 'gone-girl.jpg', '2026-08-03 11:40:04', 2),
(4, 'Black Swan', 'A ballerina struggles with the pressure of a demanding role.', 6, 129.00, 'black-swan.jpg', '2026-08-03 11:40:04', 2),
(5, 'Bridesmaids', 'A woman struggles with her role as maid of honor for her best friend.', 15, 99.00, 'bridesmaids.jpg', '2026-08-03 11:40:04', 3),
(6, 'White Chicks', 'Two FBI agents go undercover in an unusual disguise.', 9, 99.00, 'white-chicks.jpg', '2026-08-03 11:40:04', 3),
(7, 'Titanic', 'Two passengers fall in love aboard the Titanic.', 14, 149.00, 'titanic.jpg', '2026-08-03 11:40:04', 4),
(8, 'The Godfather', 'The story of a powerful crime family and its reluctant successor.', 7, 139.00, 'the-godfather.jpg', '2026-08-03 11:40:04', 4);