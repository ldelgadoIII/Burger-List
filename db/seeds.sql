INSERT burgers (burger_name)
VALUE ("Double Cheese Burger"), 
("Baja Blast Burger"), 
("Prince Royal Burger");

INSERT burgers (burger_name, devoured)
VALUE ("Tasty Burger", true);

SELECT * FROM burgers;