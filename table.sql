# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.23)
# Database: bamazon
# Generation Time: 2019-03-07 06:57:20 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table departments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `departments`;

CREATE TABLE `departments` (
  `department_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `department_name` varchar(50) NOT NULL DEFAULT '',
  `over_head_costs` decimal(11,2) NOT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;

INSERT INTO `departments` (`department_id`, `department_name`, `over_head_costs`)
VALUES
	(1,'Camping Equipment',2500.00),
	(2,'Mountaineering Equipment',5000.00),
	(3,'Outdoor Protection',3000.00),
	(4,'SKI',10000.00);

/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `department_name` varchar(50) NOT NULL DEFAULT '',
  `product_name` varchar(50) NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  `product_sales` decimal(11,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`id`, `department_name`, `product_name`, `price`, `stock_quantity`, `product_sales`)
VALUES
	(1,'Camping Equipment','TrailChef Deluxe Cook Set',500.00,486,4000.00),
	(2,'Camping Equipment','TrailChef Double Flame',360.00,245,4680.00),
	(3,'Camping Equipment','Star Dome',900.00,146,9000.00),
	(4,'Mountaineering Equipment','Husky Rope 50',200.00,133,20000.00),
	(5,'Mountaineering Equipment','Husky Rope 60',150.00,79,3000.00),
	(6,'Mountaineering Equipment','Husky Rope 100',750.00,227,75000.00),
	(7,'Outdoor Protection','BugShield Natural',620.00,9305,1240.00),
	(8,'Outdoor Protection','Sun Shelter Stick',140.00,3130,14000.00),
	(9,'Outdoor Protection','Sun Shelter 15',559.00,11690,5590.00),
	(10,'Outdoor Protection','Sun Shield',299.00,4906,29900.00),
	(11,'Camping Equipment','REI Tent',299.00,100,29900.00);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
