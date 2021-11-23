-- MariaDB dump 10.19  Distrib 10.4.18-MariaDB, for Win64 (AMD64)
--
-- Host: coffeeshopdbriz.skom.id    Database: uwnpbm2k_zwallet
-- ------------------------------------------------------
-- Server version	10.3.31-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` int(11) DEFAULT NULL,
  `receiver` int(45) DEFAULT NULL,
  `amount` int(255) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` enum('Transfer','Top Up') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `balance` int(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_messages_1_idx` (`sender`),
  KEY `receiver` (`receiver`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,1,1,200000,'Topup','Top Up',200000,'2021-10-20 06:46:00'),(2,1,2,100000,'Transfer','Transfer',100000,'2021-10-20 06:54:31'),(5,1,1,15000,'isi opo','Top Up',215000,'2021-11-01 09:42:14'),(6,1,3,5000,'bayar lontss','Transfer',210000,'2021-11-01 09:45:17'),(7,1,1,10000,NULL,'Top Up',220000,'2021-11-01 17:59:31'),(8,1,3,2000,NULL,'Transfer',218000,'2021-11-01 19:06:06'),(9,1,5,8000,NULL,'Transfer',210000,'2021-11-01 19:17:14'),(10,1,3,50000,'bayar listrik','Transfer',160000,'2021-11-01 19:38:55'),(11,1,2,2000,NULL,'Transfer',158000,'2021-11-01 19:53:00'),(12,1,2,2000,NULL,'Transfer',156000,'2021-11-01 19:54:58'),(13,1,2,2000,NULL,'Transfer',154000,'2021-11-01 19:57:03'),(14,1,4,1999,NULL,'Transfer',152001,'2021-11-01 20:00:50'),(15,1,2,2000,NULL,'Transfer',150001,'2021-11-01 20:01:35'),(16,1,5,2001,NULL,'Transfer',148000,'2021-11-01 20:02:51'),(17,1,3,2000,NULL,'Transfer',146000,'2021-11-01 20:05:32'),(18,1,3,2000,NULL,'Transfer',144000,'2021-11-01 20:05:59'),(19,1,8,2000,NULL,'Transfer',142000,'2021-11-01 20:10:08'),(20,1,3,2000,NULL,'Transfer',140000,'2021-11-01 20:11:17'),(21,1,2,10000,NULL,'Transfer',130000,'2021-11-01 20:16:57'),(22,1,2,2000,NULL,'Transfer',128000,'2021-11-02 18:17:28'),(23,1,2,2000,NULL,'Transfer',126000,'2021-11-02 18:26:30'),(24,1,2,2000,NULL,'Transfer',126000,'2021-11-02 18:26:30'),(25,1,1,20000,NULL,'Top Up',146000,'2021-11-02 20:21:56'),(26,1,1,40000,NULL,'Top Up',186000,'2021-11-02 20:22:41'),(27,1,3,2000,NULL,'Transfer',184000,'2021-11-11 14:43:17'),(28,1,5,4000,NULL,'Transfer',180000,'2021-11-11 15:30:53'),(29,1,1,10000,NULL,'Top Up',190000,'2021-11-11 17:11:14'),(30,1,1,2000,NULL,'Top Up',192000,'2021-11-11 17:13:42'),(31,1,2,2000,'bayar gayung','Transfer',190000,'2021-11-11 17:15:30'),(32,1,1,20000,NULL,'Top Up',210000,'2021-11-11 17:17:22'),(33,1,1,200000,'Topup Zwallet','Top Up',410000,'2021-11-11 17:33:22'),(34,1,1,40000,'Topup Zwallet','Top Up',450000,'2021-11-12 03:35:47'),(35,1,3,50000,'bayar','Transfer',400000,'2021-11-12 03:37:11'),(36,1,1,50000,'Topup Zwallet','Top Up',450000,'2021-11-12 03:39:56'),(37,1,2,50000,'bayar rental ps','Transfer',400000,'2021-11-12 03:40:32'),(38,1,1,1000000,'Topup Zwallet','Top Up',1400000,'2021-11-16 15:17:11'),(39,1,5,20000,'oke','Transfer',1380000,'2021-11-16 20:21:38');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pin` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `balance` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'supri','yadi','supri@gmail.com','$2b$10$h4oBIqf8RIxpM1TzsoaEd.qbYPIoYBpd.yRRA1Z3p7rqX/aZM7f4y','123454345','810715194.png','$2b$10$YnLIxgjqzzWBBHhlBI/9xuN9MA7cxy1PoI5HBsbnFGHUCTy/ok7pm','halooo',1380000),(2,'paiman','joe','paiman@gmail.com','$2b$10$mo76VmwFhiv6ne5ZO2oJZOgk2p8gtw029ZZqqz/p.w01zXJ9amITS','123','default.png','$2b$10$j3PEH07TdoAZADcS/4CLUe7Mcj.Z2lhhHP32hVG56tou50Sz68Fqy',NULL,174000),(3,'Fariz','Irfan','fariz@gmail.com','$2b$10$21DYbeAHlChjvlcO9xXoW.DCtmzIs2JC/9.LE4Ka5c6k9wZASwHO2','123458','default.png','$2b$10$lodgG2IFYB8Y9Q1H.YBIF.OYzT/O2NDoAUz1/jSDEBILlGg9tuWI.',NULL,115000),(4,'jerry','rifai','jerry@gmail.com','$2b$10$myQlLl1inVX/RDr5Uig4I.2U3cjoNCTIZ4o0aCBiAY9AH9rJWbhzG','123','default.png',NULL,NULL,1999),(5,'haikal','joe','haikal@gmail.com','$2b$10$u1VrRz5JRScoRFhRTyOn2upEjxhi9wBgKX7zM9JCgMvKewXLUggn.','123','default.png',NULL,NULL,34001),(8,'brando','joe','brando@gmail.com','$2b$10$rjqB6N2zHhRSzwebmnca..bPnMJsG2tFwCztHhqZ3ZCA1TT.8FJUG','08984948','default.png','$2b$10$2ebp4XaETbL6ywW3FaNXU.wy6qrvpkX51/8SCaxZWbxgIMGtf6KsS',NULL,2000),(9,'jamil','harry','jamil@gmail.com','$2b$10$4sS4BISrDEWC8HY2ccpU2eUY4/mlmiAV0e.VTcHbOXomNviYXARc6','123','default.png','$2b$10$Hf9Rf8eH0mPzVP8VXc5p3O/sQyv/D3YXyQXftcGNWYW5CRDcoTj4S',NULL,0),(10,'andri ','tnm','andri@gmail.com','$2b$10$p1HkmvTuA.tOtSyZqTigveyYocChTh16x3Ux2pCVowSxqaDpVVttm','0892939','default.png',NULL,NULL,0),(11,'ragil','sipuden','ragil@gmail.com','$2b$10$s0DHJkBNVDDq0KBP8iSzB.evCYqu50w2dqPuxC8akKQ2fJnWE39c6','123','default.png',NULL,NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-23 12:54:13
