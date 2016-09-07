CREATE TABLE `accesstoken` (
  `accessToken` varchar(50) DEFAULT NULL,
  `appID` varchar(20) DEFAULT NULL,
  `userID` varchar(20) DEFAULT NULL,
  `permissions` varchar(100) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `discussao` (
  `user` int(11) DEFAULT NULL,
  `titulo` varchar(30) DEFAULT NULL,
  `descricao` varchar(250) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `discussao_ativa` tinyint(1) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `discussao_resposta` (
  `user` int(11) DEFAULT NULL,
  `discussao` int(11) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `resposta` varchar(250) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `fluencia` (
  `linguagem` varchar(5) DEFAULT NULL,
  `nivel` int(11) DEFAULT NULL,
  `descricao` varchar(30) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `idioma` (
  `linguagem` varchar(5) DEFAULT NULL,
  `cod_idioma` int(11) DEFAULT NULL,
  `descricao` varchar(30) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `mensagens` (
  `user` int(11) DEFAULT NULL,
  `destinatario` int(11) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `lida` tinyint(1) DEFAULT NULL,
  `mensagem` varchar(250) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  `facebook_id` varchar(30) DEFAULT NULL,
  `data_ultimo_acesso` datetime DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `idioma` int(11) DEFAULT NULL,
  `fluencia` int(11) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `conta_ativa` tinyint(1) DEFAULT NULL,
  `setou_configuracoes` tinyint(1) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `facebook_id` (`facebook_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tratamento para o banco aceitar emoticons, porém, é preciso tratar também na aplicação.
SET NAMES utf8mb4;
ALTER DATABASE nodejssails CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

ALTER TABLE user CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE user CHANGE STATUS STATUS VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL;
REPAIR TABLE user;
OPTIMIZE TABLE user;

ALTER TABLE discussao CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE discussao CHANGE titulo titulo VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL;
REPAIR TABLE discussao;
OPTIMIZE TABLE discussao;

ALTER TABLE discussao CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE discussao CHANGE descricao descricao VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL;
REPAIR TABLE discussao;
OPTIMIZE TABLE discussao;

ALTER TABLE discussao_resposta CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE discussao_resposta CHANGE resposta resposta VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL;
REPAIR TABLE discussao_resposta;
OPTIMIZE TABLE discussao_resposta;