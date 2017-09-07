CREATE TABLE `assuntos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `assuntos_itens` (
  `linguagem` int(11) DEFAULT NULL,
  `assunto` int(11) DEFAULT NULL,
  `item` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `assuntos_subcategorias` (
  `assunto` int(11) DEFAULT NULL,
  `subcategoria` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `assuntos_titulos` (
  `linguagem` int(11) DEFAULT NULL,
  `assunto` int(11) DEFAULT NULL,
  `titulo` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `contato` (
  `usuario` int(11) DEFAULT NULL,
  `contato` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `conversa` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `conversa_mensagem` (
  `conversa` int(11) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `lida` tinyint(1) DEFAULT 0,
  `mensagem` varchar(3500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `conversa_usuario` (
  `conversa` int(11) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `discussao` (
  `usuario` int(11) DEFAULT NULL,
  `titulo` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descricao` varchar(3500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `discussao_ativa` tinyint(1) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `discussao_resposta` (
  `usuario` int(11) DEFAULT NULL,
  `discussao` int(11) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `resposta` varchar(3500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `facebook` (
  `accessToken` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `appID` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userID` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permissions` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `fluencia` (
  `linguagem_id` int(11) DEFAULT NULL,
  `nivel` int(11) DEFAULT NULL,
  `descricao` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `idioma` (
  `linguagem_id` int(11) DEFAULT NULL,
  `cod_idioma` int(11) DEFAULT NULL,
  `disponivel` tinyint(1) DEFAULT NULL,
  `descricao` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `linguagem` (
  `chave` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT NULL,
  `disponivel` tinyint(1) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `chave` (`chave`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sistema` (
  `min_versao` varchar(20) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `usuario` (
  `nome` varchar(200) DEFAULT NULL,
  `primeiro_nome` varchar(200) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `facebook_id` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_token` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_ultimo_acesso` datetime DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `idioma` int(11) DEFAULT NULL,
  `fluencia` int(11) DEFAULT NULL,
  `status` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `conta_ativa` tinyint(1) DEFAULT NULL,
  `setou_configuracoes` tinyint(1) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `facebook_id` (`facebook_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tratamento para o banco aceitar emoticons, porém, é preciso tratar também na aplicação.

SET NAMES utf8mb4;
ALTER DATABASE `wiser` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
