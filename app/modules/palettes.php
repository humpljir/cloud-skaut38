<!--

************************************
palettes.php
************************************

	- Project:  cloud.skaut38
	- Author:   J. Humpl   
-->

<script>var palettes = [<?php
                            $palette_sql = "SELECT * FROM palette";
                            $palette_result = $mysqli->query($palette_sql);
                            while ($palette = $palette_result->fetch_assoc()) {
                            ?> {
                        colors: [
                            "#<?= $palette['color0'] ?>",
                            "#<?= $palette['color1'] ?>",
                            "#<?= $palette['color2'] ?>",
                            "#<?= $palette['color3'] ?>",
                            "#<?= $palette['color4'] ?>",
                            "#<?= $palette['color5'] ?>",
                            "#<?= $palette['color6'] ?>",
                            "#<?= $palette['color7'] ?>",
                            "#<?= $palette['color8'] ?>",
                            "#<?= $palette['color9'] ?>",
                            "#<?= $palette['color10'] ?>",
                            "#<?= $palette['color11'] ?>",
                        ],
                        colorComplementary: [
                            "#<?= $palette['colorComplementary0'] ?>",
                            "#<?= $palette['colorComplementary1'] ?>",
                            "#<?= $palette['colorComplementary2'] ?>",
                            "#<?= $palette['colorComplementary3'] ?>",
                            "#<?= $palette['colorComplementary4'] ?>",
                            "#<?= $palette['colorComplementary5'] ?>",
                            "#<?= $palette['colorComplementary6'] ?>",
                            "#<?= $palette['colorComplementary7'] ?>",
                            "#<?= $palette['colorComplementary8'] ?>",
                            "#<?= $palette['colorComplementary9'] ?>",
                            "#<?= $palette['colorComplementary10'] ?>",
                            "#<?= $palette['colorComplementary11'] ?>",
                        ],
                    },
                <?php } ?>];</script>