SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


CREATE DATABASE `magazin`;
USE `catalog`;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `magazin`
--

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `categorii`
--

CREATE TABLE `categories` (
  `id_categ` int NOT NULL AUTO_INCREMENT,
  `categorie` varchar(255) NOT NULL,
  `subcategorie` varchar(255) NOT NULL,
  `segment` varchar(255) not NULL default '{}',
    `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structura de tabel pentru tabelul `produse`
--

CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nume` varchar(255) NOT NULL,
  `id_categ` int NOT NULL,
  `pret_achiz` decimal(10,5) NOT NULL,
  `adaos_com` decimal(10,5) NOT NULL,
  `TVA` decimal(10,5) not NULL default 0,
  `latime` decimal(10,5) not NULL default 0,
    `createdAt` timestamp ,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--


CREATE TABLE `furnizori` (
  `id_furnizor` varchar(255) NOT NULL,
  `nume_furnizor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
