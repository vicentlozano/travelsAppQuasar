-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.7.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para travel_app
CREATE DATABASE IF NOT EXISTS `travel_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `travel_app`;

-- Volcando datos para la tabla travel_app.messages: ~8 rows (aproximadamente)
INSERT INTO `messages` (`id`, `message`, `sendTo`, `sendFrom`, `date`) VALUES
	(5, 'como estas?', 2, 1, '2025-04-09 14:29:23'),
	(6, 'como estas?', 1, 2, '2025-04-09 14:29:23'),
	(7, 'como estas?', 2, 1, '2025-04-09 14:29:50'),
	(8, 'como estas?', 1, 2, '2025-04-09 14:29:50'),
	(9, 'como estas?', 2, 1, '2025-04-09 14:29:52'),
	(10, 'como estas?', 1, 2, '2025-04-09 14:29:52'),
	(11, 'como estas?', 2, 1, '2025-04-09 14:29:53'),
	(12, 'como estas?', 1, 2, '2025-04-09 14:29:53'),
	(13, 'bieen?', 2, 1, '2025-04-09 14:30:02'),
	(14, 'hay hay?', 1, 2, '2025-04-09 14:30:02');

-- Volcando datos para la tabla travel_app.travels: ~3 rows (aproximadamente)
INSERT INTO `travels` (`id`, `name`, `days`, `price`, `background_image`, `travel_date`, `user_id`, `user_name`, `created_at`) VALUES
	(2, 'Tesoros de Italia', 8, 1200.00, 'https://content.skyscnr.com/m/54c9639578ce8882/original/GettyImages-18…', '2023-03-03', 2, 'vicent', '2025-04-03 14:32:49'),
	(3, 'Marruecos', 33, 333.00, 'https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2…', '2022-01-01', 1, 'vicent', '2025-04-03 14:32:49'),
	(4, 'asdfasd', 232, 2000.00, 'https://www.reykjavikcars.com/es/assets/img/blog/702.png', '2025-04-09', 1, 'admin', '2025-04-10 14:40:02'),
	(5, 'paquito', 333, 322.00, 'https://www.reykjavikcars.com/es/assets/img/blog/702.png', '2025-02-13', 1, 'admin', '2025-04-10 14:46:05');

-- Volcando datos para la tabla travel_app.travel_places: ~7 rows (aproximadamente)
INSERT INTO `travel_places` (`id`, `travel_id`, `place`) VALUES
	(4, 2, 'cordoba'),
	(5, 2, 'jaen'),
	(6, 2, 'londres'),
	(7, 4, 'caeb'),
	(8, 4, 'sgsguj'),
	(9, 5, 'madrid'),
	(10, 5, 'peloto');

-- Volcando datos para la tabla travel_app.users: ~4 rows (aproximadamente)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
	(1, 'admin', 'admin@gmail.com', '21232f297a57a5a743894a0e4a801fc3', 'admin', '2025-04-03 13:58:49'),
	(2, 'vicent', 'lozanodroid@gmail.com', '86069e4176c1bf6ac7f3eda95c31c460', 'user', '2025-04-03 13:58:49'),
	(3, 'tester', 'tester@gmail.com', 'f5d1278e8109edd94e1e4197e04873b9', 'user', '2025-04-10 16:14:37'),
	(6, 'teando', 'testeando@gmail.com', 'f5d1278e8109edd94e1e4197e04873b9', 'user', '2025-04-10 16:15:55'),
	(7, 'paquyito', 'paquito@gmail.com', 'f1aaaa4510293f29504303fc3111a7ae', 'user', '2025-04-10 16:20:29');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
