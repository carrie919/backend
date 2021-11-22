CREATE DATABASE register_and_update_users;
USE register_and_update_users;

CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    f_name VARCHAR(255) NOT NULL,
    l_name VARCHAR(255) NOT NULL,
    email_id VARCHAR(255) NOT NULL,
    phone_no INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);






