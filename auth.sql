-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 31. 08:00
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `auth`
--
CREATE DATABASE IF NOT EXISTS `auth` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `auth`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroleclaims`
--

CREATE TABLE `aspnetroleclaims` (
  `Id` int(11) NOT NULL,
  `RoleId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroles`
--

CREATE TABLE `aspnetroles` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserclaims`
--

CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserlogins`
--

CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(255) NOT NULL,
  `ProviderKey` varchar(255) NOT NULL,
  `ProviderDisplayName` longtext DEFAULT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserroles`
--

CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(255) NOT NULL,
  `RoleId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusers`
--

CREATE TABLE `aspnetusers` (
  `Id` varchar(255) NOT NULL,
  `FullName` longtext NOT NULL,
  `Age` int(11) NOT NULL,
  `DateOfBirth` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `UserName` varchar(256) DEFAULT NULL,
  `NormalizedUserName` varchar(256) DEFAULT NULL,
  `Email` varchar(256) DEFAULT NULL,
  `NormalizedEmail` varchar(256) DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext DEFAULT NULL,
  `SecurityStamp` longtext DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL,
  `PhoneNumber` longtext DEFAULT NULL,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL,
  `Fizetesi_elmaradas` int(11) NOT NULL,
  `FizetettE_havi` tinyint(1) NOT NULL,
  `LakasSzovNev` text NOT NULL,
  `Varos` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `aspnetusers`
--

INSERT INTO `aspnetusers` (`Id`, `FullName`, `Age`, `DateOfBirth`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`, `Fizetesi_elmaradas`, `FizetettE_havi`, `LakasSzovNev`, `Varos`) VALUES
('48288b35-9820-4015-affc-387f80e4ee7c', 'Gannon Mattedi', 0, '2025-03-07 08:32:36', 'gmattedi0', 'GMATTEDI0', 'gmattedi0@wsj.com', 'GMATTEDI0@WSJ.COM', 0, 'AQAAAAIAAYagAAAAELd5QWNdJJttcvolWoeKT7YI+lc3y01j7lMXjbvQK4E7Ctj39XyJc7a2eTdEzKsTZw==', 'XYWUE74EOBK7GPX7PTKWVAOBMFYSLJT6', 'e93a5ae2-34a6-40ec-978b-381188b61616', 'string', 0, 0, NULL, 1, 0, 0, 0, 'string', NULL),
('595e6ead-64d5-49c9-b611-642b633c8b78', 'string', 0, '2000-01-01 00:00:00', 'fasz', 'FASZ', 'string', 'STRING', 0, 'AQAAAAIAAYagAAAAENupt3jQLVyexN575Au5KNyHotcxKpH61owL1j85H7DG7d9TyN8e4VoTmoUal9qt5A==', 'TYUMI67FG4STTH7HKOYDROBQERVEE43Z', '671aa49f-d0a8-4ea0-97c8-7ad81f8ae99c', NULL, 0, 0, NULL, 1, 0, 0, 0, '', NULL),
('7ed9e9e2-2e6b-4fa3-a4f1-7f1614be77f4', 'string', 0, '2000-01-01 00:00:00', 'tokenproba', 'TOKENPROBA', 'string', 'STRING', 0, 'AQAAAAIAAYagAAAAEMCdJinmIb2gLmgKU3cidYID7yIdIv8d70El1t5Zz3uX/WKB6bTkzswJapOK99fn6A==', 'SHVH6CIMLRV3XYWP6DNANLJXTBQ2PP6U', '0bf0f6a6-f9c3-4c00-8e46-00aa06b23102', NULL, 0, 0, NULL, 1, 0, 0, 0, '', NULL),
('a3ca0ace-f40c-4f3e-adb8-75becec9cb4a', 'string', 0, '2000-01-01 00:00:00', 'ujproba', 'UJPROBA', 'string', 'STRING', 0, 'AQAAAAIAAYagAAAAEJddYwGH2T+LM8AdDBamntKAI9XXaiQsZKGGgO1E22VWSxfgLtBnS6MsgIvKgmDmmg==', 'DQZ66SQD7KE3JN3A25OZGRIJVXVLIMQ2', '362305f8-6862-4b94-9d43-c9e5bfe99d9b', NULL, 0, 0, NULL, 1, 0, 0, 0, '', NULL),
('e0c37b9c-543c-428f-bd6e-d582e7f590d6', 'Próba János', 0, '1987-03-31 00:00:00', 'PJanos86', 'PJANOS86', 'Pjanos1986@gmail.com', 'PJANOS1986@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEDLuGhUZpuiO7Rr2v1w0rEzhcCf3HbD/z7DKkk32NpnUNg50ddoL4v6yRJIMUfvVUQ==', 'JXF5N4VEDVCEO3HDD5Q7KXAWOHJVLJ4N', 'bfe69a23-11c4-48d5-9147-5c3aedf29e8a', '0620bekapod', 0, 0, NULL, 1, 0, 0, 0, 'NKF', 'Miskolc'),
('e15197b7-d32b-4090-8c88-fcaece125f20', 'string', 0, '2025-03-11 00:00:00', 'ujregister', 'UJREGISTER', 'string', 'STRING', 0, 'AQAAAAIAAYagAAAAEOyUYgxd3uz9hLAdKWD7nOD9Mh7utNvc1p/dGeOyZNYFDLwL5JAhSEcr1kzb9fJwyA==', 'RQIFLGD3IT4KAXHLPI25PWYNEY2NJIF6', 'e880e025-d694-484e-b762-42516947de20', 'string', 0, 0, NULL, 1, 0, 0, 0, 'string', NULL),
('ed417ced-15da-48ae-9742-27ce6f40c226', 'string', 0, '2000-01-01 00:00:00', 'loging', 'LOGING', 'string', 'STRING', 0, 'AQAAAAIAAYagAAAAENbrj83vke6NspbVFEUUGQ5VfOxfXTsggNxEtPbmCVOf0/z3MoyqLEArhtQLt4+Thw==', 'SGWN7OU672Q53OSZSS66ZHKJNZCFFUFR', '07777201-77ce-4dbe-9311-17ce3eac76b5', NULL, 0, 0, NULL, 1, 0, 0, 0, '', NULL),
('edc6db86-4d67-432b-b6df-954815898c99', 'string', 0, '2000-01-01 00:00:00', 'tokenproba2', 'TOKENPROBA2', 'string', 'STRING', 0, 'AQAAAAIAAYagAAAAELN4oyY6l8TxGvkbkv0vtTTxmHOp0VaYnTFAiQNlxcpNF0jBDDBlyGQC36SODjmXGA==', 'LFMDJYZSHNEPREGBTSIY6GILDEYPV7BJ', '25403966-406f-4b30-809d-522f48f22eb4', NULL, 0, 0, NULL, 1, 0, 0, 0, '', NULL),
('f3bd0b04-1135-483e-a51e-073bef00ca51', 'gecisvan', 0, '2000-01-01 00:00:00', 'gec', 'GEC', 'string', 'STRING', 0, 'AQAAAAIAAYagAAAAEEQ4czKuSaO/ICUhWFaLU+NmiTjWW/2m20bEi9QtiyLKCCuwJwGtbLJyK/f5r6SD8Q==', 'ACOD7FL26KW7NPB7SS7SENJM4RLFI7PY', '906c919f-3046-460d-90de-53641d0dc008', NULL, 0, 0, NULL, 1, 0, 0, 0, '', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusertokens`
--

CREATE TABLE `aspnetusertokens` (
  `UserId` varchar(255) NOT NULL,
  `LoginProvider` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `polls`
--

CREATE TABLE `polls` (
  `Id` varchar(255) NOT NULL,
  `Title` varchar(175) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Poster_id` varchar(255) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Ending_at` datetime NOT NULL DEFAULT current_timestamp(),
  `No` int(11) NOT NULL,
  `Yes` int(11) NOT NULL,
  `Is_voted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `polls`
--

INSERT INTO `polls` (`Id`, `Title`, `Description`, `Poster_id`, `Created_at`, `Ending_at`, `No`, `Yes`, `Is_voted`) VALUES
('1de6e770-ec19-4145-96ba-2f9f5576a9bf', 'EIFS', 'congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque', 'f5119e59-fa98-4cd2-9f42-35498204df5d', '2022-03-02 14:49:49', '2025-03-20 08:18:06', 62, 43, 0),
('34061f10-a860-4b29-9979-b5aed0e0437a', 'Overhead Doors', 'consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc', '301d906b-3903-4f68-9d00-82cd0f1112cf', '2022-11-01 11:55:58', '2025-03-20 08:18:06', 42, 21, 1),
('a3398e47-23f4-4068-902d-6b25cd7706f7', 'Marlite Panels (FED)', 'dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et', '688f1e12-82bb-4e62-9cc6-7adff7e1fb15', '2024-03-03 18:57:42', '2025-03-20 08:18:06', 12, 28, 0),
('a535bd2a-f371-4b3f-a4dd-c500d1724901', 'Fire Protection', 'mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum', 'abd52ce3-2fe5-456b-aed5-586718681f54', '2024-07-19 02:45:43', '2025-03-20 08:18:06', 50, 36, 1),
('e5e5729c-68c0-401c-bf52-e852bcb8d673', 'Kerekesszék rámpa', 'A ... lakáshoz kéne csináltatni rámpát', 'e0c37b9c-543c-428f-bd6e-d582e7f590d6', '2025-02-19 16:39:26', '2025-03-20 08:18:06', 0, 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `posts`
--

CREATE TABLE `posts` (
  `Id` varchar(255) NOT NULL,
  `Title` varchar(175) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Poster_id` varchar(255) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` datetime NOT NULL,
  `Is_accepted` tinyint(1) NOT NULL,
  `Acceptor_id` varchar(255) NOT NULL DEFAULT 'null',
  `Location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `posts`
--

INSERT INTO `posts` (`Id`, `Title`, `Description`, `Poster_id`, `Created_at`, `Updated_at`, `Is_accepted`, `Acceptor_id`, `Location`) VALUES
('191dba57-7225-41f0-b79c-4cfb8faf98a1', 'fasz', 'string', 'f3bd0b04-1135-483e-a51e-073bef00ca51', '2025-03-20 09:25:42', '2025-03-20 09:44:13', 1, '48288b35-9820-4015-affc-387f80e4ee7c', 'string'),
('5323b8f7-f4b3-427d-aaa3-900589640fd3', 'string', 'string', 'e0c37b9c-543c-428f-bd6e-d582e7f590d6', '2025-03-20 08:42:30', '0001-01-01 00:00:00', 0, 'null', 'string'),
('8950dfdb-bda4-4708-9864-32ee39d1cb04', 'string', 'string', 'f3bd0b04-1135-483e-a51e-073bef00ca51', '2025-03-20 08:14:55', '0001-01-01 00:00:00', 0, 'null', 'string'),
('94fe7dfd-2fc2-4c39-8362-85830a5eb36d', 'string', 'string', '48288b35-9820-4015-affc-387f80e4ee7c', '2025-03-20 07:55:22', '0001-01-01 00:00:00', 0, 'null', 'string'),
('cfdc2cdf-7f45-4d15-b0f4-f5838ca63589', 'string', 'string', 'f3bd0b04-1135-483e-a51e-073bef00ca51', '2025-03-20 08:25:11', '0001-01-01 00:00:00', 0, 'null', 'string'),
('f72cc02e-633f-4649-920d-f23b9cbf8a4f', 'asd', 'string', '48288b35-9820-4015-affc-387f80e4ee7c', '2025-03-20 08:45:16', '2025-03-20 09:46:21', 1, 'f3bd0b04-1135-483e-a51e-073bef00ca51', 'string');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20250113073601_CreateAuthDb', '8.0.11'),
('20250216110956_CreateE-panelDb', '8.0.11');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`);

--
-- A tábla indexei `aspnetroles`
--
ALTER TABLE `aspnetroles`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `RoleNameIndex` (`NormalizedName`);

--
-- A tábla indexei `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetUserClaims_UserId` (`UserId`);

--
-- A tábla indexei `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  ADD KEY `IX_AspNetUserLogins_UserId` (`UserId`);

--
-- A tábla indexei `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD PRIMARY KEY (`UserId`,`RoleId`),
  ADD KEY `IX_AspNetUserRoles_RoleId` (`RoleId`);

--
-- A tábla indexei `aspnetusers`
--
ALTER TABLE `aspnetusers`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  ADD KEY `EmailIndex` (`NormalizedEmail`);

--
-- A tábla indexei `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD PRIMARY KEY (`UserId`,`LoginProvider`,`Name`);

--
-- A tábla indexei `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Poster_id` (`Poster_id`);

--
-- A tábla indexei `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Poster_id` (`Poster_id`),
  ADD KEY `Acceptor_id` (`Acceptor_id`);

--
-- A tábla indexei `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
