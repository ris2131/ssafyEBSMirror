-- MariaDB dump 10.19  Distrib 10.9.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ebs
-- ------------------------------------------------------
-- Server version	10.9.3-MariaDB-1:10.9.3+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `federated_pricings`
--

DROP TABLE IF EXISTS `federated_pricings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `federated_pricings` (
  `pricing_seq` bigint(20) NOT NULL,
  `business_seq` bigint(20) DEFAULT NULL,
  `hairshop_name` varchar(255) DEFAULT NULL,
  `hairshop_photo` varchar(255) DEFAULT NULL,
  `pricing_month` int(11) DEFAULT NULL,
  `pricing_number` int(11) DEFAULT NULL,
  `pricing_price` int(11) DEFAULT NULL,
  PRIMARY KEY (`pricing_seq`)
) ENGINE=FEDERATED DEFAULT CHARSET=utf8mb3 CONNECTION='mysql://d107:gumi107@13.125.49.111:13107/ebs_business/v_pricings';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `federated_reservations`
--

DROP TABLE IF EXISTS `federated_reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `federated_reservations` (
  `designer_seq` bigint(20) NOT NULL,
  `business_seq` bigint(20) DEFAULT NULL,
  `designer_name` varchar(255) DEFAULT NULL,
  `hairshop_name` varchar(255) DEFAULT NULL,
  `designer_photo` varchar(255) DEFAULT NULL,
  `designer_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`designer_seq`)
) ENGINE=FEDERATED DEFAULT CHARSET=utf8mb3 CONNECTION='mysql://d107:gumi107@13.125.49.111:13107/ebs_business/v_designers';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `member_seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_address` varchar(255) NOT NULL,
  `member_logintype` char(1) NOT NULL,
  `member_nickname` varchar(255) NOT NULL,
  `member_token` varchar(255) NOT NULL,
  `member_uid` varchar(255) NOT NULL,
  PRIMARY KEY (`member_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES
(19,'구미 원호동','G','류인석','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlYnMiLCJzdWIiOiJJRW5nIFJlZnJlc2hUb2tlbiIsImV4cCI6MTY3NjczOTY3M30.hW4ME59GVYiIWMuqmj-MV8V8fHGBurMy5-n0XskT30w','104733006157394542186'),
(20,'대구 북구 구암동 구암고등학교','G','kofgb','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlYnMiLCJzdWIiOiJJRW5nIFJlZnJlc2hUb2tlbiIsImV4cCI6MTY3NjczNjQ4M30.5wfB5LMJFmSwb9Mrs1b5BxE9yRr7r9fCpQkjMeHQ3T4','114612317785719257656'),
(21,'경상북도 구미시 진평2길 25','G','김쌈봉','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlYnMiLCJzdWIiOiJJRW5nIFJlZnJlc2hUb2tlbiIsImV4cCI6MTY3NjczODgzMn0.WJOjJAT7jGt-chptcuTrCgI5WHepbE3I82qr-eDRbmc','115174752332675510941'),
(22,'대구광역시 달서구 파호동','G','리아멍','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlYnMiLCJzdWIiOiJJRW5nIFJlZnJlc2hUb2tlbiIsImV4cCI6MTY3NjczOTEzNn0.F6vqHvYhWQXzXNJqWsJ0seZ1ovOUUoru-M7zzVrpsKY','104682483643300739609');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pays`
--

DROP TABLE IF EXISTS `pays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pays` (
  `pay_seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `pay_cid` varchar(255) DEFAULT NULL,
  `pay_partner_order_id` varchar(255) DEFAULT NULL,
  `pay_partner_user_id` varchar(255) DEFAULT NULL,
  `pay_sid` varchar(255) DEFAULT NULL,
  `pay_quantity` bigint(20) DEFAULT NULL,
  `pay_tax_free_amount` bigint(20) DEFAULT NULL,
  `pay_total_amount` bigint(20) DEFAULT NULL,
  `subscription_seq` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`pay_seq`),
  KEY `FKo1tjfgq83qb83tnegjcakkb84` (`subscription_seq`),
  CONSTRAINT `FKo1tjfgq83qb83tnegjcakkb84` FOREIGN KEY (`subscription_seq`) REFERENCES `subscriptions` (`subscription_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pays`
--

LOCK TABLES `pays` WRITE;
/*!40000 ALTER TABLE `pays` DISABLE KEYS */;
/*!40000 ALTER TABLE `pays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_photo`
--

DROP TABLE IF EXISTS `reservation_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservation_photo` (
  `reservation_photo_seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `reservation_photo_file_count` int(11) DEFAULT NULL,
  `reservation_photo_url` varchar(255) DEFAULT NULL,
  `reservation_seq` bigint(20) DEFAULT NULL,
  `reservation_photo_file_name` int(11) DEFAULT NULL,
  PRIMARY KEY (`reservation_photo_seq`),
  KEY `FK6d0wt2kwxkbw3f4kl0a48jdwr` (`reservation_seq`),
  CONSTRAINT `FK6d0wt2kwxkbw3f4kl0a48jdwr` FOREIGN KEY (`reservation_seq`) REFERENCES `reservations` (`reservation_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_photo`
--

LOCK TABLES `reservation_photo` WRITE;
/*!40000 ALTER TABLE `reservation_photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservations` (
  `reservation_seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `reservation_date` datetime DEFAULT NULL,
  `reservation_etc` varchar(255) DEFAULT NULL,
  `reservation_photo` varchar(255) DEFAULT NULL,
  `reservation_service` varchar(255) DEFAULT NULL,
  `reservation_style` varchar(255) DEFAULT NULL,
  `designer_seq` bigint(20) DEFAULT NULL,
  `member_seq` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`reservation_seq`),
  KEY `FKpcbfi58gljficcurbp3d6pxv5` (`member_seq`),
  CONSTRAINT `FKpcbfi58gljficcurbp3d6pxv5` FOREIGN KEY (`member_seq`) REFERENCES `members` (`member_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES
(31,'2022-11-19 13:00:00','잘 부탁드립니다','image','커트 후 머리에 뭐 바르지 말아 주세요.','투블럭 해주세요 옆라인은 협의할게요.',2,19);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscriptions` (
  `subscription_seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `subscription_expiration` datetime DEFAULT NULL,
  `subscription_left` bigint(20) DEFAULT NULL,
  `pricing_seq` bigint(20) DEFAULT NULL,
  `member_seq` bigint(20) DEFAULT NULL,
  `subscription_renew` bit(1) DEFAULT NULL,
  PRIMARY KEY (`subscription_seq`),
  KEY `FKexk1julg0ytfu8dngw0o6uvwh` (`member_seq`),
  CONSTRAINT `FKexk1julg0ytfu8dngw0o6uvwh` FOREIGN KEY (`member_seq`) REFERENCES `members` (`member_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `v_reservations`
--

DROP TABLE IF EXISTS `v_reservations`;
/*!50001 DROP VIEW IF EXISTS `v_reservations`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_reservations` AS SELECT
 1 AS `reservation_seq`,
  1 AS `member_seq`,
  1 AS `member_nickname`,
  1 AS `designer_seq`,
  1 AS `reservation_date`,
  1 AS `reservation_style`,
  1 AS `reservation_service`,
  1 AS `reservation_etc` */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_reservations`
--

/*!50001 DROP VIEW IF EXISTS `v_reservations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`d107`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_reservations` AS select `r`.`reservation_seq` AS `reservation_seq`,`r`.`member_seq` AS `member_seq`,`m`.`member_nickname` AS `member_nickname`,`r`.`designer_seq` AS `designer_seq`,`r`.`reservation_date` AS `reservation_date`,`r`.`reservation_style` AS `reservation_style`,`r`.`reservation_service` AS `reservation_service`,`r`.`reservation_etc` AS `reservation_etc` from (`reservations` `r` join `members` `m` on(`r`.`member_seq` = `m`.`member_seq`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 17:05:22
