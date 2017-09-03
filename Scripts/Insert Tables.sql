-- Inserts que devem ser rodados quando o Banco foi criado

USE wiser

-- Limpa as Tabelas
TRUNCATE TABLE `assuntos`;
TRUNCATE TABLE `assuntos_itens`;
TRUNCATE TABLE `assuntos_subcategorias`;
TRUNCATE TABLE `assuntos_titulos`;
TRUNCATE TABLE `contato`;
TRUNCATE TABLE `conversa`;
TRUNCATE TABLE `conversa_mensagem`;
TRUNCATE TABLE `conversa_usuario`;
TRUNCATE TABLE `discussao`;
TRUNCATE TABLE `discussao_resposta`;
TRUNCATE TABLE `facebook`;
TRUNCATE TABLE `fluencia`;
TRUNCATE TABLE `idioma`;
TRUNCATE TABLE `linguagem`;
TRUNCATE TABLE `usuario`;

-- Insere os dados padrões
INSERT INTO `assuntos` VALUES
(1),
(2),
(3);

INSERT INTO `assuntos_itens` VALUES 
(1, 1, 'O filme %a é um dos filmes que vocês curtem, por que não conversar em %i sobre ele?', 1),
(2, 1, 'O filme %a é um dos filmes que vocês curtem, por que não conversar em %i sobre ele?', 2),
(1, 2, 'Ambos curtem a série %a, que tal conversar, em %i, sobre ela?', 3),
(2, 2, 'Ambos curtem a série %a, que tal conversar, em %i, sobre ela?', 4),
(1, 3, 'Você sabia que %u também curte a série %a, vamos conversar sobre ela em %i?', 5),
(2, 3, 'Você sabia que %u também curte a série %a, vamos conversar sobre ela em %i?', 6);

INSERT INTO `assuntos_subcategorias` VALUES
(1, 'Movie', 1),
(1, 'Fictional Character', 2),
(2, 'TV Show', 3),
(3, 'Book', 4);

INSERT INTO `assuntos_titulos` VALUES
(1, 1, 'Filmes', 1),
(2, 1, 'Movies', 2),
(1, 2, 'Séries', 3),
(2, 2, 'TV Shows', 4),
(1, 3, 'Livros', 5),
(2, 3, 'Books', 6);

INSERT INTO `facebook` VALUES 
('570854019757986|wlsnDSdcWhFs586zho4_dgJtc18', '570854019757986', '1262642377098040', 'public_profile,user_friends,user_likes,user_birthday', 1);

INSERT INTO `fluencia` VALUES
(1, 0, 'Todos', 1),
(2, 0, 'All', 2),
(1, 1, 'Fluente', 3),
(2, 1, 'Fluent', 4),
(1, 2, 'Avançado', 5),
(2, 2, 'Advanced', 6),
(1, 3, 'Moderado', 7),
(2, 3, 'Moderad', 8),
(1, 4, 'Iniciante', 9),
(2, 4, 'Beginner', 10);

INSERT INTO `idioma` VALUES
(1, 0, 0, 'Todos', 1),
(2, 0, 0, 'All', 2),
(1, 1, 0, 'Português', 3),
(2, 1, 0, 'Portuguese', 4),
(1, 2, 1, 'Inglês', 5),
(2, 2, 1, 'English', 6),
(1, 3, 1, 'Espanhol', 7),
(2, 3, 1, 'Spanish', 8);

INSERT INTO `linguagem` VALUES
('pt', 1, 1, 1),
('en', 0, 1, 2),
('es', 0, 0, 3);

/*
INSERT INTO `contato` VALUES
(1, 2, 1, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(2, 1, 2, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(1, 3, 3, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(3, 1, 4, '2017-02-14 00:00:00', '2017-02-14 00:00:00');

INSERT INTO `conversa` VALUES
(1, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(2, '2017-02-14 00:00:00', '2017-02-14 00:00:00');

INSERT INTO `conversa_mensagem` VALUES
(1, 1, '2017-02-14 00:00:00', 1, 'Olá Lucas, tudo bem?', 1, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(1, 2, '2017-02-14 00:01:00', 1, 'Tudo sim, Jeff, and you?', 2, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(1, 1, '2017-02-14 00:01:00', 1, 'Sure!', 3, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(1, 2, '2017-02-14 00:02:00', 1, 'It''s nice to see someone who likes english too', 4, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(1, 1, '2017-02-14 00:02:00', 1, 'Yeah! I really like it!', 5, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(1, 2, '2017-02-14 00:02:00', 1, 'Muito bem Jeff! Você está indo muito bem!', 6, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(2, 1, '2017-02-14 00:00:00', 1, 'Olá Jeovanir. Me chamo Jefferson e estudo inglês a 2 anos. Vi que você também estuda', 7, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(2, 3, '2017-02-14 00:04:00', 1, 'Olá Jeff! Estudo sim, mas não há tanto tempo quanto você. Preciso treinar muito ainda...', 8, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(2, 1, '2017-02-14 00:05:00', 1, 'Se quiser, posso te ajudar com isso!', 9, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(2, 3, '2017-02-14 00:06:00', 1, 'Seria maravilhoso! Podemos combinar de nos encontrar qualquer dia desses', 10, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(2, 1, '2017-02-14 00:07:00', 1, 'Claro', 11, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(2, 3, '2017-02-14 00:08:00', 1, ':)', 12, '2017-02-14 00:00:00', '2017-02-14 00:00:00');

INSERT INTO `conversa_usuario` VALUES
(1, 1, 1, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(1, 2, 2, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(2, 1, 3, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(2, 3, 4, '2017-02-14 00:00:00', '2017-02-14 00:00:00');

INSERT INTO `discussao` VALUES
(1, 'Qual país escolher para um melhor aprendizado?', 
'Olá pessoal! Tenho grande interesse em aprimorar meu inglês e também o francês. Juntei dinheiro para poder fazer um intercâmbio e me sinto pronto. Para onde posso viajar?',
'2017-02-14 00:00:00', 1, 1, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(2, 'Melhores locais para treinar', 
'Olá, eu gostaria de saber os melhores locais para eu treinar inglês com um amigo. Lugar calmo? Lugar agitado? Em casa? Em alguma biblioteca?', 
'2017-02-14 00:00:00', 1, 2, '2017-02-14 00:00:00', '2017-02-14 00:00:00');

INSERT INTO `discussao_resposta` VALUES
(3, 1, '2017-02-14 01:00:00',
'Olá, Jefferson. Pelo que entendi você se interessa em inglês e francês... então acho que o melhor lugar para você seria o Canadá. Lá eles possuem inglês e francês como línguas faladas! Boa sorte!', 
1, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(1, 1, '2017-02-14 02:00:00', 
'Muito Obrigado. Seguirei a sua dica!', 
2, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(1, 2, '2017-02-14 04:30:00', 
'Olá! Você mesmo deve saber o melhor local para treinar com seu amigo. Se vê que consegue se focar mais em casa, estude em casa. Se preferir em uma biblioteca, vá nela. Tudo depende de onde você se sente melhor. Procure ver com seu amigo, também, o melhor local na opinião dele e entre em um consenso para tornar tudo mais fácil. Abraços.', 
3, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
(2, 2, '2017-02-14 05:40:00', 
'Obrigado. Ótima dica!', 
4, '2017-02-14 00:00:00', '2017-02-14 00:00:00');

INSERT INTO `usuario` VALUES
('1262642377098040', null, '2017-02-14 00:00:00', -23.557, -46.8082, 2, 3, 'Atchim', 1, 0, 1, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
('884496058351706', null, '2017-02-14 00:00:00', -23.557, -46.8082, 2, 3, '', 1, 0, 2, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
('100003135842624', null, '2017-02-14 00:00:00', -23.557, -46.8082, 2, 3, '', 1, 0, 3, '2017-02-14 00:00:00', '2017-02-14 00:00:00'),
('1734825736543170', null, '2017-02-14 00:00:00', -23.5736, -46.7239, 2, 2, '', 1, 0, 4, '2017-02-14 00:00:00', '2017-02-14 00:00:00');
*/