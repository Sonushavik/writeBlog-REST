-- CREATE TABLE blogs(
--         id VARCHAR(50) PRIMARY KEY,
--         username VARCHAR(50),
--         email VARCHAR(50) NOT NULL,
--         password VARCHAR(50) NOT NULL,
--         title VARCHAR(255) NOT NULL,
--         content MEDIUMTEXT NOT NULL,
--         published_at DATETIME
-- );


ALTER TABLE blogs MODIFY published_at DATETIME DEFAULT CURRENT_TIMESTAMP;
