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