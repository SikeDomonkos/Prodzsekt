-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 08. 20:38
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroles`
--

CREATE TABLE `aspnetroles` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `aspnetroles`
--

INSERT INTO `aspnetroles` (`Id`, `Name`, `NormalizedName`, `ConcurrencyStamp`) VALUES
('04e5c61b-9e25-499e-932f-94cea7e84223', 'admin', 'ADMIN', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserclaims`
--

CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserlogins`
--

CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(255) NOT NULL,
  `ProviderKey` varchar(255) NOT NULL,
  `ProviderDisplayName` longtext DEFAULT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserroles`
--

CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(255) NOT NULL,
  `RoleId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `aspnetuserroles`
--

INSERT INTO `aspnetuserroles` (`UserId`, `RoleId`) VALUES
('08808a7a-47d2-4b89-92e9-454d1de2d51e', '04e5c61b-9e25-499e-932f-94cea7e84223');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `aspnetusers`
--

INSERT INTO `aspnetusers` (`Id`, `FullName`, `Age`, `DateOfBirth`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`, `Fizetesi_elmaradas`, `FizetettE_havi`, `LakasSzovNev`, `Varos`) VALUES
('08808a7a-47d2-4b89-92e9-454d1de2d51e', 'admin admin', 0, '2000-01-14 00:00:00', 'admin', 'ADMIN', 'admin@admin.com', 'ADMIN@ADMIN.COM', 0, 'AQAAAAIAAYagAAAAED0WXpzZ5kKUO8/YYKNVM/iSCUzDJ3vIiVoqD7y+dEcjmVl7Z4vlBjI8Lsm1Pquolw==', 'PI3PWYHCD4CCV2BHN3SBLVILWO5ELFYU', '8ac1b698-ca62-46f2-b7f4-a903ed30a857', '+36702893555', 0, 0, NULL, 1, 0, 0, 0, 'Kurucz út', 'Miskolc'),
('48288b35-9820-4015-affc-387f80e4ee7c', 'Gannon Mattedi', 0, '2025-03-31 00:00:00', 'gmattedi0', 'GMATTEDI0', 'gmattedi0@wsj.com', 'GMATTEDI0@WSJ.COM', 0, 'AQAAAAIAAYagAAAAELd5QWNdJJttcvolWoeKT7YI+lc3y01j7lMXjbvQK4E7Ctj39XyJc7a2eTdEzKsTZw==', 'XYWUE74EOBK7GPX7PTKWVAOBMFYSLJT6', 'e93a5ae2-34a6-40ec-978b-381188b61616', '02536895455', 0, 0, NULL, 1, 0, 0, 0, 'NKS', 'Budapest'),
('82c02e68-be59-496b-98f5-de1132359ba5', 'Zelenák Zalán Noel', 0, '1993-06-16 00:00:00', 'Zuz123', 'ZUZ123', 'zuzu@gmail.com', 'ZUZU@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAELtdu+uKPPjstdJJKt/odD0+EgKA9JH9RUlTPcUPHNNxfG2R8gScGQ/5CY+2NROTeA==', 'JSOX735MNESO2BUINB25BFX6OXCBHVZQ', '22e8d43e-7e5a-4341-b041-82e68c67bde8', '+364056857599', 0, 0, NULL, 1, 0, 0, 0, 'Jónás Út', 'Miskolc'),
('9445eb65-966c-45b7-9794-9bb54f4c2409', 'Jánosi Marcell', 0, '2000-01-01 00:00:00', 'Marci05', 'MARCI05', 'Janosim@kkszki.hu', 'JANOSIM@KKSZKI.HU', 0, 'AQAAAAIAAYagAAAAEFO1mt3aR5VRm+aPgElv36zQ3VdRcfnGFYVw+2szR19OR+/PSwc9QqCzz99IBxOmqw==', 'RI6XJ5BOBUNFHAAWNQA2QZ227GWAVT3A', 'a43f66d2-18d8-47df-87f8-85372869a4be', NULL, 0, 0, NULL, 1, 0, 0, 0, '', NULL),
('97d86f95-8c91-466f-b43b-b3d62d5f107c', 'Kovács Szabolcs', 0, '1999-06-10 00:00:00', 'Szabi123', 'SZABI123', 'Szabolcs@gmail.com', 'SZABOLCS@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEDLc5HmgcZqs9AhjAF5v31G/nDXdgyvkivW3cKTJL1oYic28D//y0cLlplu7R/o7AA==', 'EBO336Z5LN3LC5KYLWL5AHERXPUYQFP4', '11443520-9b55-47cf-a28a-6efa9bf2dbc4', '+36705068784', 0, 0, NULL, 1, 0, 0, 0, 'Kurucz út', 'Miskolc'),
('b6910ded-40f4-4bd0-97b5-332cf7d04cc9', 'Sike Domonkos', 0, '1995-06-14 00:00:00', 'Domi05', 'DOMI05', 'Siked@kkszki.hu', 'SIKED@KKSZKI.HU', 0, 'AQAAAAIAAYagAAAAEHUDvNTuIY4hXL9NqOi+afEIIKBrgl3vOXE75+FdpzMBT5op2af7y9OdDehmAd6u2g==', 'GNXDXU4EFNBHFWBKXS22VMAIBL2R4ES2', '5d58bdbb-bd7a-4afa-aef1-1596f35c3cb3', '+36304856725', 0, 0, NULL, 1, 0, 0, 0, 'János utca', 'Miskolc'),
('d63690f0-6591-44b2-bc76-00db0df0f2d4', 'Nyenyestyán Bence', 0, '1998-06-11 00:00:00', 'Bence14', 'BENCE14', 'Nyenye@gmail.com', 'NYENYE@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAECbYxYT4ExUHjK6V2VD9M8wd8tVChbO/23/j0SirrPU0HMNN5fWRgvpeJInq320mkQ==', 'KUUUGG4GQBPRZH6JTXOOQS4CQXRDQ3NJ', '3cec0e0a-6c9b-4367-a3af-cdfb43b4004c', '+36702893555', 0, 0, NULL, 1, 0, 0, 0, 'Bocskai utca ', 'Miskolc'),
('e0c37b9c-543c-428f-bd6e-d582e7f590d6', 'Próba János', 0, '1987-03-31 00:00:00', 'PJanos86', 'PJANOS86', 'Pjanos1986@gmail.com', 'PJANOS1986@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEDLuGhUZpuiO7Rr2v1w0rEzhcCf3HbD/z7DKkk32NpnUNg50ddoL4v6yRJIMUfvVUQ==', 'JXF5N4VEDVCEO3HDD5Q7KXAWOHJVLJ4N', 'bfe69a23-11c4-48d5-9147-5c3aedf29e8a', '06204589785', 0, 0, NULL, 1, 0, 0, 0, 'NKF', 'Miskolc');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusertokens`
--

CREATE TABLE `aspnetusertokens` (
  `UserId` varchar(255) NOT NULL,
  `LoginProvider` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `polls`
--

INSERT INTO `polls` (`Id`, `Title`, `Description`, `Poster_id`, `Created_at`, `Ending_at`, `No`, `Yes`, `Is_voted`) VALUES
('0b08bf0b-ed44-4722-84ef-8d3c5a1ad431', 'Jobb lift', 'Gyorsabb, erősebb lift kellene', '48288b35-9820-4015-affc-387f80e4ee7c', '2025-03-31 06:20:56', '2025-04-07 06:16:18', 0, 0, 0),
('15d8526e-b142-4fee-a31a-0cf613819180', 'Vezetékcsere', 'Vezetékek kicseréltetése az egész lakásban', 'e0c37b9c-543c-428f-bd6e-d582e7f590d6', '2025-03-31 06:25:34', '2025-04-21 06:24:18', 1, 0, 0),
('2c0024c1-0056-4c6b-ab2c-419e89b5e6fc', 'Takarító csere', 'Úgy veszem észre hogy a mostani takarító nem végzi a munkáját normálisan, le cseréljük-e?', '82c02e68-be59-496b-98f5-de1132359ba5', '2025-04-08 18:17:10', '2025-11-07 22:18:00', 0, 1, 0),
('734aef63-a01d-4f6f-9d27-e3b0ae5dbd6b', 'Papírgyűjtés', 'Eléggé felhalmozottak az újságok a bejáratnál, szervezhetnénk egy papírgyűjtést!', 'b6910ded-40f4-4bd0-97b5-332cf7d04cc9', '2025-04-08 17:59:46', '2026-07-24 22:59:00', 0, 1, 0),
('c491681c-5062-422c-984c-73b806fc8f61', 'Lomtalanítás', 'Sok már a lom, szervezhetnénk egy lomtalanítást!', '97d86f95-8c91-466f-b43b-b3d62d5f107c', '2025-04-08 18:33:43', '2025-07-28 00:37:00', 1, 0, 0),
('d0c275c0-c5ad-4aef-a71e-5462f403d590', 'Új nyílászáró', 'Érezni hogy áthűl az épület, az egyik ablak miatt lehet és ki kéne cserélni közös költségből!', 'd63690f0-6591-44b2-bc76-00db0df0f2d4', '2025-04-08 18:06:26', '2027-06-11 23:08:00', 0, 1, 0),
('dd68fa08-ba80-4b49-9b31-0fe2f0fb7c4f', 'Kód az ajtóhoz ', 'Ne tudjanak bejönni nem kívánatos emberek az épületbe, közös költségből lehetne fedezni', '82c02e68-be59-496b-98f5-de1132359ba5', '2025-04-08 18:20:32', '2026-02-08 04:50:00', 1, 0, 0),
('eec7fe85-d552-4ff7-b384-843ba9e253e9', 'Új bejárati ajtó', 'Valaki felfeszítette a bejárati ajtót, ki lehetne cserélni közösköltségből.', 'b6910ded-40f4-4bd0-97b5-332cf7d04cc9', '2025-04-08 17:57:04', '2026-02-08 22:56:00', 1, 0, 0),
('fa3f9ce6-d545-4c08-9ac2-a54b9809f8bd', 'Festés', 'régi kopott festést lefesteni újra, közös költségből lehetne a munkát megcsinálni!', 'd63690f0-6591-44b2-bc76-00db0df0f2d4', '2025-04-08 18:08:01', '2025-06-08 23:10:00', 1, 0, 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `posts`
--

INSERT INTO `posts` (`Id`, `Title`, `Description`, `Poster_id`, `Created_at`, `Updated_at`, `Is_accepted`, `Acceptor_id`, `Location`) VALUES
('01142e77-d4b3-415b-bfb4-672614435524', 'Konyha', 'Vettem új konyhabútort és segíteni kéne összeszerelni.', 'b6910ded-40f4-4bd0-97b5-332cf7d04cc9', '2025-04-08 17:49:32', '0001-01-01 00:00:00', 0, 'null', 'János utca 17'),
('10ec012f-d09b-4133-915c-bd4e8c2d685b', 'Szüretelés', 'Telken kellene segíteni a zöldségeket és gyümölcsöket leszüretelni.', '48288b35-9820-4015-affc-387f80e4ee7c', '2025-03-31 08:52:44', '2025-03-31 08:57:14', 1, '08808a7a-47d2-4b89-92e9-454d1de2d51e', 'Almás u. 14.'),
('271b9fef-e1ef-48a2-b8aa-b9207f9fe0e3', 'Kerítés festés', 'Kerítés lefestéséhez kellene egy kis segítség.(kopogtatni nem szabad csak csengetni).', 'e0c37b9c-543c-428f-bd6e-d582e7f590d6', '2025-03-31 06:27:59', '0001-01-01 00:00:00', 0, 'null', 'Sírköves u. 2.'),
('3d41dc1d-322a-4f24-ba48-f1553b2e785a', 'Autó szerelés', 'Valamiért nem indul az autóm valaki aki ért hozzá nézze már meg!', '82c02e68-be59-496b-98f5-de1132359ba5', '2025-04-08 18:14:09', '0001-01-01 00:00:00', 0, 'null', 'Jónás út 41'),
('4638c40e-483b-4928-9d5e-91e5c7124af5', 'Rámpa', 'Bejárati ajtóba egy rámpát a mozgássérülteknek kéne építeni!', 'd63690f0-6591-44b2-bc76-00db0df0f2d4', '2025-04-08 18:04:08', '0001-01-01 00:00:00', 0, 'null', 'Bocskai utca 85'),
('60a20f22-9f80-4bf1-876d-d523009b4697', 'Ágy', 'Háromfele tört az ágyam, valahogy össze kéne rakni', '97d86f95-8c91-466f-b43b-b3d62d5f107c', '2025-04-08 18:24:26', '0001-01-01 00:00:00', 0, 'null', 'Kurucz utca 124'),
('bf04b0fd-0dc6-4ce2-ac6b-5dc1755c29da', 'Járókeret', 'Megsérültem egy járókeret elkészítésében kéne segíteni', 'd63690f0-6591-44b2-bc76-00db0df0f2d4', '2025-04-08 18:02:36', '0001-01-01 00:00:00', 0, 'null', 'Bocskai utca 85'),
('db0c3270-c79b-41bd-9da1-45853288b0df', 'Kert', 'Elválasztó kerítést kéne csinálni, el szeretném választani a kert két részét', 'b6910ded-40f4-4bd0-97b5-332cf7d04cc9', '2025-04-08 17:50:40', '0001-01-01 00:00:00', 0, 'null', 'János utca 17'),
('e9de9a6f-7365-477b-8a01-1d0da8a9669c', 'Gép szerelés', 'Vettem egy számítógépet és nem tudom összerakni valaki segítsen!', '82c02e68-be59-496b-98f5-de1132359ba5', '2025-04-08 18:13:36', '0001-01-01 00:00:00', 0, 'null', 'Jónás út 41');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

--
-- Megkötések a táblához `polls`
--
ALTER TABLE `polls`
  ADD CONSTRAINT `polls_ibfk_1` FOREIGN KEY (`Poster_id`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`Poster_id`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
