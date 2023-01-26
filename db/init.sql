CREATE DATABASE budgeter;
use budgeter;


CREATE TABLE item(
    id int NOT NULL AUTO_INCREMENT,
    billName varchar(200),
    amount int,
    dueDate varchar(200),
    hasAutoDraft boolean,
    PRIMARY KEY (id)
);