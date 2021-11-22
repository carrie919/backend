-- Crud CREATE
CREATE DATABASE record_company;
USE record_company;
CREATE TABLE bands(
	id INT NOT NULL AUTO_INCREMENT,
	name_of_band VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE albums(
	id INT NOT NULL AUTO_INCREMENT,
    name_of_album VARCHAR(255) NOT NULL,
    year_of_release INT,
    band_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(band_id) REFERENCES bands(id)
);

INSERT INTO bands(name_of_band)
VALUES ('iron madien'),('ankor'),('deuce'),('avenged sevenfold');

SELECT * FROM bands;

INSERT INTO albums(name_of_album , year_of_release , band_id)
VALUES ('the number of beasts', 1985, 1),
	   ('power slave', 1984, 1),
       ('nightmare', 2018, 2),
       ('nightmare', 2010, 4),
       ('test album', NULL, 4);
       
-- cRud READ
SELECT * FROM albums;

SELECT DISTINCT name_of_album FROM albums;

SELECT * FROM albums
WHERE year_of_release < 2000;

SELECT * FROM albums
WHERE id = 4;

SELECT * FROM albums 
WHERE year_of_release = 1982;

SELECT  * FROM albums
WHERE year_of_release BETWEEN 1984 AND 2018;

SELECT  * FROM albums
WHERE year_of_release IS NULL;

-- crUd UPDATE
UPDATE albums
SET year_of_release = 1982
WHERE id = 1;

-- cruD DELETE
DELETE FROM albums WHERE id = 5;