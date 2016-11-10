-- Inserts que devem ser rodados quando o Banco foi criado

INSERT INTO `facebook` VALUES 
('570854019757986|wlsnDSdcWhFs586zho4_dgJtc18', '570854019757986', '1262642377098040', 'public_profile,user_friends', 1);

INSERT INTO `linguagem` VALUES
('pt_br', 1, 1, 1),
('en', 0, 1, 2),
('es', 0, 0, 3);

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

INSERT INTO `assuntos` VALUES
(1),
(2),
(3);

INSERT INTO `assuntos_SubCategorias` VALUES
(1, 'Movie', 1),
(1, 'Fictional Character', 2),
(2, 'TV Show', 3),
(3, 'Book', 4);

INSERT INTO `assuntos_itens` VALUES 
(1, 1, 'O filme %a é um dos filmes que vocês curtem, por que não conversar em %i sobre ele?', 1),
(2, 1, 'O filme %a é um dos filmes que vocês curtem, por que não conversar em %i sobre ele?', 2),
(1, 2, 'Ambos curtem a série %a, que tal conversar, em %i, sobre ela?', 3),
(2, 2, 'Ambos curtem a série %a, que tal conversar, em %i, sobre ela?', 4),
(1, 3, 'Você sabia que %u também curte a série %a, vamos conversar sobre ela em %i?', 5),
(2, 3, 'Você sabia que %u também curte a série %a, vamos conversar sobre ela em %i?', 6);

INSERT INTO `assuntos_titulos` VALUES
(1, 1, 'Filmes', 1),
(2, 1, 'Movies', 2),
(1, 2, 'Séries', 3),
(2, 2, 'TV Shows', 4),
(1, 3, 'Livros', 5),
(2, 3, 'Books', 6);
