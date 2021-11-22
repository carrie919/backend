CREATE DATABASE JSON_test;
USE JSON_test;

CREATE TABLE jdoc(
	id INT NOT NULL AUTO_INCREMENT,
    test_obj JSON,
    PRIMARY KEY(id)
);


INSERT INTO jdoc(test_obj)
VALUES ('{
			"key1": "value1",
            "key2": "value2",
            "key3": "value3"
            }'),
		('{
			"name1": "value1",
            "name2": "value2",
            "name3": "value3"
            }'),
		('{
			"k1": "value1",
            "k2": "value2",
            "k3": "value3"
            }');
            
UPDATE jdoc
SET test_obj = '{
			"key1": "value_a",
            "key2": "value_b",
            "key3": "value_c"
            }'
WHERE id = 2;
UPDATE jdoc
SET test_obj = '{
			"key1": "value_x",
            "key2": "value_y",
            "key3": "value_z"
            }'
WHERE id = 3;