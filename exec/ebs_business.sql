-- MariaDB dump 10.19  Distrib 10.9.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ebs_business
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
-- Table structure for table `businesses`
--

DROP TABLE IF EXISTS `businesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `businesses` (
  `business_seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `business_email` varchar(255) DEFAULT NULL,
  `business_owner` varchar(255) DEFAULT NULL,
  `business_password` varchar(255) DEFAULT NULL,
  `business_refresh_token` varchar(255) DEFAULT NULL,
  `business_registration` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`business_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businesses`
--

LOCK TABLES `businesses` WRITE;
/*!40000 ALTER TABLE `businesses` DISABLE KEYS */;
INSERT INTO `businesses` VALUES
(1,'admin@gmail.com','김싸피','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFYnMiLCJzdWIiOiJFYnMgUmVmcmVzaFRva2VuIiwiZXhwIjoxNjc2NzM3OTE3fQ.0OlJkw-EnjsFrO-EQwZR3ohYgJ1etNxAnjk3MHQFskQ','2915700314'),
(2,'admin1@gmail.com','이싸피','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFYnMiLCJzdWIiOiJFYnMgUmVmcmVzaFRva2VuIiwiZXhwIjoxNjc2NzM5OTU0fQ.1EJ0ibjy0iucWOKIA5_l3v1iQVpUySRquyXWIESMLms','2915700314'),
(3,'admin3@gmail.com','박싸피','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFYnMiLCJzdWIiOiJFYnMgUmVmcmVzaFRva2VuIiwiZXhwIjoxNjc2NzM1ODAzfQ.hc5jRLJHiji35s8qcpz6LrknJE388aVeLBSAIMT_cHI','2915700314'),
(4,'admin4@gmail.com','최싸피','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFYnMiLCJzdWIiOiJFYnMgUmVmcmVzaFRva2VuIiwiZXhwIjoxNjc2NzM2MTY1fQ.DHd-3GQXuuVEHxnqUi-QoLPKM3HtYXGoUpsl24SWHaY','2915700314'),
(5,'admin5@gmail.com','정싸피','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFYnMiLCJzdWIiOiJFYnMgUmVmcmVzaFRva2VuIiwiZXhwIjoxNjc2NzM2ODc5fQ.akK-fpY-LC5WG03nnVJn5PmpqspsHV807acKImqC6W4','2915700314'),
(6,'admin6@gmail.com','류싸피','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFYnMiLCJzdWIiOiJFYnMgUmVmcmVzaFRva2VuIiwiZXhwIjoxNjc2NzM3MTg3fQ.Q95xM5QsJuzzr7ovNh-ODBjy9OB3EzaDb9Aru6d4-Ns','2915700314'),
(7,'admin7@gmail.com','강싸피','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFYnMiLCJzdWIiOiJFYnMgUmVmcmVzaFRva2VuIiwiZXhwIjoxNjc2NzM3NDcyfQ.jSZNEZG2NptzKaTPN2eg6KwzWGlgXPfaDb4vldMZCy8','2915700314'),
(8,'admin8@gmail.com','한싸피','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFYnMiLCJzdWIiOiJFYnMgUmVmcmVzaFRva2VuIiwiZXhwIjoxNjc2NzM3Nzc3fQ.xYYIFhEQTXCPeylMyJpIodtjRfH5Kkd-9NOUjwknYk4','2915700314'),
(9,'admin9@gmail.com','임싸피','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFYnMiLCJzdWIiOiJFYnMgUmVmcmVzaFRva2VuIiwiZXhwIjoxNjc2NzM4MDU1fQ.Rp_KPxCTa2TmxXTChZ12Z95hPqEUNRscqT1Xf27E3PU','2915700314'),
(10,'admin10@gmail.com','오싸피','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFYnMiLCJzdWIiOiJFYnMgUmVmcmVzaFRva2VuIiwiZXhwIjoxNjc2NzM4NzY2fQ.JLMING--Wc26G2HDhKnL6UxU2xSOsr_XI_E9QKEBYwM','2915700314');
/*!40000 ALTER TABLE `businesses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designers`
--

DROP TABLE IF EXISTS `designers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `designers` (
  `designer_seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `designer_description` varchar(255) DEFAULT NULL,
  `designer_name` varchar(255) DEFAULT NULL,
  `designer_photo` varchar(255) DEFAULT NULL,
  `business_seq` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`designer_seq`),
  KEY `FKo89mtv04k3bvbadraq5ulahuw` (`business_seq`),
  CONSTRAINT `FKo89mtv04k3bvbadraq5ulahuw` FOREIGN KEY (`business_seq`) REFERENCES `businesses` (`business_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designers`
--

LOCK TABLES `designers` WRITE;
/*!40000 ALTER TABLE `designers` DISABLE KEYS */;
INSERT INTO `designers` VALUES
(1,'남성 펌 전문입니다~','디자이너 수애','https://business.ssafy-ebs.com/photo/designer/1.blob',1),
(2,'남성 커트, 스타일링 맡겨주세요~','디자이너 민우','https://business.ssafy-ebs.com/photo/designer/2.blob',1),
(3,'친절로 모시겠습니다.','디자이너 용민','https://business.ssafy-ebs.com/photo/designer/3.blob',2),
(4,'남성 커트, 펌 전문입니다~ ^.^','디자이너 민아','https://business.ssafy-ebs.com/photo/designer/4.blob',3),
(5,'경력 15년차 남성 펌, 염색 전문입니다. 믿고 맡겨주세요~','원장 아영','https://business.ssafy-ebs.com/photo/designer/5.blob',3),
(6,'경력 20년 베테랑 디자이너에게 맡겨주세요~','원장 규민','https://business.ssafy-ebs.com/photo/designer/6.blob',4),
(7,'중요한 날, 저한테 맡겨주세요! 최고의 하루로 만들어 드리겠습니당!!','디자이너 소민','https://business.ssafy-ebs.com/photo/designer/7.blob',4),
(8,'남성 펌, 염색 전문입니다~ 친절하게 모시겠습니다.','디자이너 은정','https://business.ssafy-ebs.com/photo/designer/8.blob',4),
(9,'경력 20년차 베테랑 디자이너입니다. 믿고 맡겨주세요 ^^','원장 만석','https://business.ssafy-ebs.com/photo/designer/9.blob',5),
(10,'남성 펌, 염색 전문 입니다~ 친절로 모시겠습니다!!','디자이너 영찬','https://business.ssafy-ebs.com/photo/designer/10.blob',5),
(11,'경력 20년차 디자이너입니다. 중요한 날, 멋있는 모습으로 바꿔드리겠습니다!','원장 제임스','https://business.ssafy-ebs.com/photo/designer/11.blob',6),
(12,'아름다운 하루를 만들어 드리겠습니다 ^^','원장 나영','https://business.ssafy-ebs.com/photo/designer/12.blob',7),
(13,'남성 커트 전문입니다~ 많이 찾아주세요 ^^','부원장 시영','https://business.ssafy-ebs.com/photo/designer/13.blob',7),
(14,'친절한 서비스와 믿음직한 실력으로 보답하겠습니다 ^^','디자이너 수정','https://business.ssafy-ebs.com/photo/designer/14.blob',7),
(15,'신사의 완성은 헤어 스타일입니다~ 저에게 맡겨주세요!','디자이너 치원','https://business.ssafy-ebs.com/photo/designer/15.blob',8),
(16,'경력 10년차 디자이너입니다. 믿고 맡겨주시면 보답하겠습니다.','디자이너 원호','https://business.ssafy-ebs.com/photo/designer/16.blob',8),
(17,'경력 30년차 베테랑 이발사입니다...잘 부탁드립니다...','원장 성민','https://business.ssafy-ebs.com/photo/designer/17.blob',9),
(18,'강남 청담동 미용실 출신입니다~ 맡겨만주세요~','원장 혁준','https://business.ssafy-ebs.com/photo/designer/18.blob',10),
(19,'남성 커트, 펌, 염색 전문입니다~ ','디자이너 아름','https://business.ssafy-ebs.com/photo/designer/19.blob',10),
(20,'숨어있는 당신의 아름다움을 찾아드리겠습니다!','디자이너 은경','https://business.ssafy-ebs.com/photo/designer/20.blob',10),
(21,'10년차 디자이너 민아입니다. 최고의 서비스를 제공하겠습니다.','민아','https://business.ssafy-ebs.com/photo/designer/21.blob',2),
(22,'3년차 디자이너 서유입니다! 최고의 디자인을 보여드리겠습니다.','서유','https://business.ssafy-ebs.com/photo/designer/22.blob',2);
/*!40000 ALTER TABLE `designers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `federated_reservations`
--

DROP TABLE IF EXISTS `federated_reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `federated_reservations` (
  `reservation_seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_seq` bigint(20) DEFAULT NULL,
  `member_nickname` varchar(255) DEFAULT NULL,
  `designer_seq` bigint(20) DEFAULT NULL,
  `reservation_date` datetime DEFAULT NULL,
  `reservation_style` varchar(255) DEFAULT NULL,
  `reservation_service` varchar(255) DEFAULT NULL,
  `reservation_etc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reservation_seq`)
) ENGINE=FEDERATED DEFAULT CHARSET=utf8mb3 CONNECTION='mysql://d107_business:business107@13.125.10.183:13107/ebs/v_reservations';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hairshops`
--

DROP TABLE IF EXISTS `hairshops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hairshops` (
  `business_seq` bigint(20) NOT NULL,
  `hairshop_address` varchar(255) DEFAULT NULL,
  `hairshop_description` varchar(255) DEFAULT NULL,
  `hairshop_homepage` varchar(255) DEFAULT NULL,
  `hairshop_name` varchar(255) DEFAULT NULL,
  `hairshop_notice` varchar(255) DEFAULT NULL,
  `hairshop_phone` varchar(255) DEFAULT NULL,
  `hairshop_photo` varchar(255) DEFAULT NULL,
  `hairshop_visible_flag` bit(1) DEFAULT NULL,
  PRIMARY KEY (`business_seq`),
  CONSTRAINT `FKe72o8rv7ayjomhe1x7x3hlt2n` FOREIGN KEY (`business_seq`) REFERENCES `businesses` (`business_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hairshops`
--

LOCK TABLES `hairshops` WRITE;
/*!40000 ALTER TABLE `hairshops` DISABLE KEYS */;
INSERT INTO `hairshops` VALUES
(1,'대구광역시 달서구 파호동 200-1','환영합니다! 베테랑 헤어 디자이너에게 시술 받아 보세요~ ','www.ssafyhairshop.com','싸피헤어숍','매주 일요일 휴무','053-558-8944','https://business.ssafy-ebs.com/photo/hairshop/1.blob',''),
(2,'대구광역시 수성구 신매동 21-33','경력 20년 헤어 디자이너 항시 대기중','www.ssafyblueclub.com','싸피미용실','현금 결제 시 할인 행사 중','053-115-7789','https://business.ssafy-ebs.com/photo/hairshop/2.blob',''),
(3,'대구광역시 달서구 본리동 332-12','리뉴얼 후 새로운 마음으로 서비스 하겠습니다!','www.ssafysalon.com','싸피살롱','매주 화요일 정기휴무','053-552-3314','https://business.ssafy-ebs.com/photo/hairshop/3.blob',''),
(4,'대구광역시 달서구 본동 33-121','편안한 분위기에서 시술 도와드리겠습니다.','www.ssafyhair.com','싸피이발소','방문 고객 대상 이벤트 진행 중','053-557-3368','https://business.ssafy-ebs.com/photo/hairshop/4.blob',''),
(5,'대구광역시 수성구 신매동 667-23','친절과 정성으로 모시겠습니다~','www.ssafyhairworld.com','싸피헤어나라','매주 월요일 정기휴무','053-995-6877','https://business.ssafy-ebs.com/photo/hairshop/5.blob',''),
(6,'대구광역시 달서구 상인동 552-12','20년 베테랑 디자이너가 친절하게 모시겠습니다!','www.ssafybarbershop.com','싸피바버샵','첫 방문 고객 할인 행사중','053-214-6648','https://business.ssafy-ebs.com/photo/hairshop/6.blob',''),
(7,'대구광역시 달서구 상인동 23-47','깔끔한 인테리어! 친절한 서비스!','www.ssafybeauty.com','싸피아름다움','매주 화요일 정기 휴무','053-889-1157','https://business.ssafy-ebs.com/photo/hairshop/7.blob',''),
(8,'대구광역시 수성구 범어동 223-123','신사의 품격을 만들어 드립니다.','www.ssafybarberone.com','싸피바버원','매장 내 흡연실 구비완','053-321-3695','https://business.ssafy-ebs.com/photo/hairshop/8.blob',''),
(9,'대구광역시 수성구 황금동 221-55','30년 경력 베테랑 이발사 대기중입니다. 많은 이용 부탁드리겠읍니다.','www.ssafyhaircenter.com','싸피미용센터','따끈한 율무차 한잔 제공합니다.','053-798-1154','https://business.ssafy-ebs.com/photo/hairshop/9.blob',''),
(10,'대구광역시 달서구 상인동 554-21','강남 헤어숍 출신 디자이너로 구성된 매장입니다. 믿고 맡겨주시면 후회 할 일 없으십니다.','www.ssafyrealhairshop.com','싸피진헤어숍','매주 수요일 정기휴무','053-107-7777','https://business.ssafy-ebs.com/photo/hairshop/10.blob','');
/*!40000 ALTER TABLE `hairshops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricings`
--

DROP TABLE IF EXISTS `pricings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pricings` (
  `pricing_seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `pricing_month` int(11) DEFAULT NULL,
  `pricing_number` int(11) DEFAULT NULL,
  `pricing_price` int(11) DEFAULT NULL,
  `business_seq` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`pricing_seq`),
  KEY `FKqr6lvdabt69f3gca6b6yt5sc4` (`business_seq`),
  CONSTRAINT `FKqr6lvdabt69f3gca6b6yt5sc4` FOREIGN KEY (`business_seq`) REFERENCES `businesses` (`business_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricings`
--

LOCK TABLES `pricings` WRITE;
/*!40000 ALTER TABLE `pricings` DISABLE KEYS */;
INSERT INTO `pricings` VALUES
(1,6,6,55000,1),
(2,6,3,30000,1),
(3,6,2,22000,1),
(4,12,1,12000,1),
(5,6,6,55000,2),
(6,6,3,30000,2),
(7,6,2,22000,2),
(8,12,1,12000,2),
(9,6,6,55000,3),
(10,6,3,30000,3),
(11,6,2,22000,3),
(12,12,1,12000,3),
(13,6,6,55000,4),
(14,6,3,30000,4),
(15,6,2,22000,4),
(16,12,1,12000,4),
(17,6,6,55000,5),
(18,6,3,30000,5),
(19,6,2,22000,5),
(20,12,1,12000,5),
(21,6,6,55000,6),
(22,6,3,30000,6),
(23,6,2,22000,6),
(24,12,1,12000,6),
(25,6,6,55000,7),
(26,6,3,30000,7),
(27,6,2,22000,7),
(28,12,1,12000,7),
(29,6,6,55000,8),
(30,6,3,30000,8),
(31,6,2,22000,8),
(32,12,1,12000,8),
(33,6,6,55000,9),
(34,6,3,30000,9),
(35,6,2,22000,9),
(36,12,1,12000,9),
(37,6,6,55000,10),
(38,6,3,30000,10),
(39,6,2,22000,10),
(40,12,1,12000,10);
/*!40000 ALTER TABLE `pricings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `v_designers`
--

DROP TABLE IF EXISTS `v_designers`;
/*!50001 DROP VIEW IF EXISTS `v_designers`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_designers` AS SELECT
 1 AS `designer_seq`,
  1 AS `business_seq`,
  1 AS `designer_name`,
  1 AS `hairshop_name`,
  1 AS `designer_photo`,
  1 AS `designer_description` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_pricings`
--

DROP TABLE IF EXISTS `v_pricings`;
/*!50001 DROP VIEW IF EXISTS `v_pricings`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_pricings` AS SELECT
 1 AS `pricing_seq`,
  1 AS `business_seq`,
  1 AS `hairshop_name`,
  1 AS `hairshop_photo`,
  1 AS `pricing_month`,
  1 AS `pricing_number`,
  1 AS `pricing_price` */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_designers`
--

/*!50001 DROP VIEW IF EXISTS `v_designers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`d107_business`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_designers` AS select `d`.`designer_seq` AS `designer_seq`,`d`.`business_seq` AS `business_seq`,`d`.`designer_name` AS `designer_name`,`h`.`hairshop_name` AS `hairshop_name`,`d`.`designer_photo` AS `designer_photo`,`d`.`designer_description` AS `designer_description` from (`designers` `d` join `hairshops` `h` on(`d`.`business_seq` = `h`.`business_seq`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_pricings`
--

/*!50001 DROP VIEW IF EXISTS `v_pricings`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`d107_business`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_pricings` AS select `p`.`pricing_seq` AS `pricing_seq`,`p`.`business_seq` AS `business_seq`,`h`.`hairshop_name` AS `hairshop_name`,`h`.`hairshop_photo` AS `hairshop_photo`,`p`.`pricing_month` AS `pricing_month`,`p`.`pricing_number` AS `pricing_number`,`p`.`pricing_price` AS `pricing_price` from (`pricings` `p` join `hairshops` `h` on(`p`.`business_seq` = `h`.`business_seq`)) */;
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

-- Dump completed on 2022-11-20 17:09:10
