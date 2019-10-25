Create database bamazon;

USE bamazon;

CREATE TABLE items (
    item_id INT(10) AUTO_INCREMENT NOT NULL,
    item_name VARCHAR (50) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    item_quantity INT (100) NOT NULL,
    PRIMARY KEY (item_id)
)

Select * from items;

INSERT INTO item (item_name, department_name, price, stock_quantity)
VALUES ("salmon en Croute", "brunch", "15.00", "20"),
("asparagus & wild mushroom", "brunch", "11.00", "20"),
("eggs & polenta benedict", "brunch", "11.00", "15" ),
("smoked turkey monto cristo", "breakfast", "13.00", "25"),
("croque madame", "breakfast", "12.00", "10"),
("breakfast croissant sandwich", "breakfast", "9.00", "30"),
("g's grilled cheese", "lunch", "10.00", "15"),
("turkey avocado panini", "lunch", "11.00", "20"),
("reuben", "lunch", "12.00", "12");