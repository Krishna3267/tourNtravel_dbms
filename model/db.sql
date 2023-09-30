CREATE DATABASE IF NOT EXISTS `nodesql` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodesql`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `admin` (`id`, `username`, `password`, `email`) VALUES (1, 'admin', 'admin', 'admin@admin.com');

CREATE TABLE IF NOT EXISTS `tours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `TourID` varchar(50) NOT NULL, 
	`destination` varchar(200) NOT NULL,
	`agency` varchar(200) NOT NULL,
	`datefrom` varchar(200) NOT NULL,
	`dateto` varchar(200) NOT NULL,
	`amount` double NOT NULL,
	`features` varchar(200) NOT NULL,
	`file_data` mediumblob NOT NULL,
	`category` varchar(100) NOT NULL,
	`duration` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `bookings` (
	  `id` int(11) NOT NULL AUTO_INCREMENT,
	  `name` varchar(50) NOT NULL,
	`tourID` varchar(50) NOT NULL,
	`age` int NOT NULL,
	`numberabv12` int NOT NULL,
	`numberbelow12` int NOT NULL,
	`address` varchar(100) NOT NULL,
	`state` varchar(100) NOT NULL,
	`phone` varchar(200) NOT NULL,
	`amount` int NOT NULL,
	`email` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user_profiles` (
  
  `username` varchar(50) NOT NULL,
   `email` varchar(200) NOT NULL,
   `number` int(100) NOT NULL,
   `address` varchar(200) NOT NULL,
   `state` varchar(200) NOT NULL,
  
  PRIMARY KEY (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


