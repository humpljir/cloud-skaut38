CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `fullname` text NOT NULL,
  `email` text NOT NULL,
  `img` tinytext NOT NULL,
  `darktheme` tinyint NOT NULL,
  `activePalette` int NOT NULL,
  `colorHighlight` text NOT NULL,
  `toolbarReorder` text NOT NULL,
  `toolbarDisplayIcon` text NOT NULL,
  `toolbarColors` text NOT NULL,
  `toolbarColorsComplementary` tinytext NOT NULL,
  `topbarAutoHeight` int NOT NULL,
  `toolbarAutoHeight` int NOT NULL,
  `toolbarVisible` int NOT NULL,
  `toolbarCustom` int NOT NULL,
  `notifications` int NOT NULL,
  `customNotificationsTimeout` int NOT NULL
);

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `email`, `img`, `darktheme`, `activePalette`, `colorHighlight`, `toolbarOrder`, `toolbarDisplay`, `toolbarColors`, `toolbarColorsComplementary`, `topbarAutoHeight`, `toolbarAutoHeight`, `toolbarVisible`, `toolbarCustom`, `notifications`, `customNotificationsTimeout`)
VALUES ('0', 'humpljir', '$2y$10$Nxmi1w3OW6A.aALplYhc/.bWrvj3qTnVXekkamD4k5cSInaNCm.VO', 'Jiří Humpl', 'jirihumpl@gmail.com', 'humpljir.jpg', '1', '1', '3', '[0, 1, 2, 3]', '[true, true, true, true]', '[\"var(--theme-color-1)\", \"var(--theme-color-3)\", \"var(--theme-color-4)\", \"var(--theme-color-5)\"]', '[\"var(--theme-color-1-complementary)\", \"var(--theme-color-3-complementary)\", \"var(--theme-color-4-complementary)\", \"var(--theme-color-5-complementary)\"]', '1', '1', '1', '1', '0', '3000');

CREATE TABLE `palette` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `color0` char(6) NOT NULL,
  `color1` char(6) NOT NULL,
  `color2` char(6) NOT NULL,
  `color3` char(6) NOT NULL,
  `color4` char(6) NOT NULL,
  `color5` char(6) NOT NULL,
  `color6` char(6) NOT NULL,
  `color7` char(6) NOT NULL,
  `color8` char(6) NOT NULL,
  `color9` char(6) NOT NULL,
  `color10` char(6) NOT NULL,
  `color11` char(6) NOT NULL,
  `colorComplementary0` char(6) NOT NULL,
  `colorComplementary1` char(6) NOT NULL,
  `colorComplementary2` char(6) NOT NULL,
  `colorComplementary3` char(6) NOT NULL,
  `colorComplementary4` char(6) NOT NULL,
  `colorComplementary5` char(6) NOT NULL,
  `colorComplementary6` char(6) NOT NULL,
  `colorComplementary7` char(6) NOT NULL,
  `colorComplementary8` char(6) NOT NULL,
  `colorComplementary9` char(6) NOT NULL,
  `colorComplementary10` char(6) NOT NULL,
  `colorComplementary11` char(6) NOT NULL
);

INSERT INTO `palette` (`id`, `color0`, `color1`, `color2`, `color3`, `color4`, `color5`, `color6`, `color7`, `color8`, `color9`, `color10`, `color11`, `colorComplementary0`, `colorComplementary1`, `colorComplementary2`, `colorComplementary3`, `colorComplementary4`, `colorComplementary5`, `colorComplementary6`, `colorComplementary7`, `colorComplementary8`, `colorComplementary9`, `colorComplementary10`, `colorComplementary11`)
VALUES ('0', '78412C', 'AB5530', 'D46025', 'F17F29', '8C9496', 'A4778B', '6D4E62', '40433F', '537E49', '8A9860', '7B7B42', '1E1800', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF');

INSERT INTO `palette` (`id`, `color0`, `color1`, `color2`, `color3`, `color4`, `color5`, `color6`, `color7`, `color8`, `color9`, `color10`, `color11`, `colorComplementary0`, `colorComplementary1`, `colorComplementary2`, `colorComplementary3`, `colorComplementary4`, `colorComplementary5`, `colorComplementary6`, `colorComplementary7`, `colorComplementary8`, `colorComplementary9`, `colorComplementary10`, `colorComplementary11`)
VALUES ('0', '8B2C33', 'E63946', '1D3557', '457B9D', 'A8DADC', 'F1FAEE', 'A1E887', '41D3BD', '80B192', 'FFE066', 'FBCAEF', 'FF9AE6', 'F1FAEE', 'F1FAEE', 'A8DADC', 'A8DADC', '1D3557', '8B2C33', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF');
