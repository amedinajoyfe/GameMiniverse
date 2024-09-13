CREATE DATABASE IF NOT EXISTS GamesMiniverse;
USE GamesMiniverse;

DROP TABLE IF EXISTS achievements;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS registeredUsers;

CREATE TABLE registeredUsers(
				id INT PRIMARY KEY auto_increment,
                username VARCHAR(20) NOT NULL,
				email VARCHAR(155) NOT NULL,
                pass VARCHAR(155) NOT NULL
);

CREATE TABLE games(
				id INT PRIMARY KEY auto_increment,
                name VARCHAR(50) NOT NULL,
                id_creator INT ,
		FOREIGN KEY(id_creator) REFERENCES registeredUsers(id)
);

CREATE TABLE achievements(
				id INT PRIMARY KEY auto_increment,
                name VARCHAR(40) NOT NULL,
                description TEXT,
                id_game INT,
		FOREIGN KEY(id_game) REFERENCES games(id)
);

INSERT INTO registeredUsers(username, email, pass) VALUES("Medina", "medina@correo.es", "FF75F63EE9FF9DEB:1000:CCD7C6E00322D05E8903FD00653272038334C6F2");
INSERT INTO games (name, id_creator) VALUES ("ShootingPractice", 1), ("HangedMan", 1), ("TicTacToe", 1);
INSERT INTO achievements(name, description, id_game) VALUES("10 disparos", 'Consigue 10 disparos en "Shooting practice"', 1), ("20 disparos", 'Consigue 20 disparos en "Shooting practice"', 1), ("30 disparos", 'Consigue 30 disparos en "Shooting practice"', 1), ("50 disparos", 'Consigue 50 disparos en "Shooting practice"', 1), ("Sin fallar", 'Completa una palabra sin fallar en "Hanged man"', 2), ("5 palabras", 'Completa cinco palabras en "Hanged man"', 2);

DROP TABLE IF EXISTS achievementsTesting;
DROP TABLE IF EXISTS gamesTesting;
DROP TABLE IF EXISTS registeredUsersTesting;

CREATE TABLE registeredUsersTesting(
				id INT PRIMARY KEY auto_increment,
                username VARCHAR(20) NOT NULL,
				email VARCHAR(155) NOT NULL,
                pass VARCHAR(155) NOT NULL
);

CREATE TABLE gamesTesting(
				id INT PRIMARY KEY auto_increment,
                name VARCHAR(50) NOT NULL,
                id_creator INT ,
		FOREIGN KEY(id_creator) REFERENCES registeredUsersTesting(id)
);

CREATE TABLE achievementsTesting(
				id INT PRIMARY KEY auto_increment,
                name VARCHAR(40) NOT NULL,
                description TEXT,
                id_game INT,
		FOREIGN KEY(id_game) REFERENCES gamesTesting(id)
);

INSERT INTO registeredUsersTesting(username, email, pass) VALUES("Medina", "medina@correo.es", "FF75F63EE9FF9DEB:1000:CCD7C6E00322D05E8903FD00653272038334C6F2");
INSERT INTO gamesTesting (name, id_creator) VALUES ("ShootingPractice", 1), ("HangedMan", 1), ("TicTacToe", 1);
INSERT INTO achievementsTesting(name, description, id_game) VALUES("10 disparos", 'Consigue 10 disparos en "Shooting practice"', 1), ("20 disparos", 'Consigue 20 disparos en "Shooting practice"', 1), ("30 disparos", 'Consigue 30 disparos en "Shooting practice"', 1), ("50 disparos", 'Consigue 50 disparos en "Shooting practice"', 1), ("Sin fallar", 'Completa una palabra sin fallar en "Hanged man"', 2), ("5 palabras", 'Completa cinco palabras en "Hanged man"', 2);


SELECT * FROM registeredUsers;
-- SELECT * FROM gamesTesting;
-- SELECT * FROM achievements;
-- SELECT * FROM achievements WHERE id_game = 1;