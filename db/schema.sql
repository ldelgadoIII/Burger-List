-- DROP DATABASE IF EXISTS burgers_db;

-- CREATE DATABASE burgers_db;

-- USE burgers_db;

USE c7a3956gnaqzello;

CREATE TABLE burgers (
    id INT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(30) NULL,
    devour BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);