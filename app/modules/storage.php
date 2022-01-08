<script>
    var storage = [<?php
                    $dir_sql = "SELECT * FROM directories";
                    $dir_result = $mysqli->query($dir_sql);
                    while ($dir = $dir_result->fetch_assoc()) {
                    ?> {
                id: <?= $dir['id'] ?>,
                name: "<?= $dir['name'] ?>",
                date: <?= strtotime($dir['date']) ?>,
                color: "var(--theme-color-<?= $dir['color'] ?>)",
                colorComplementary: "var(--theme-color-<?= $dir['color'] ?>-complementary)",
                content: [<?php
                            $fil_sql = "SELECT * FROM files WHERE dirid='$dir[id]'";
                            $fil_result = $mysqli->query($fil_sql);
                            while ($fil = $fil_result->fetch_assoc()) {
                            ?> {
                        id: <?= $fil['id'] ?>,
                        author: "<?= $fil['author'] ?>",
                        name: "<?= $fil['name'] ?>",
                        date: <?= strtotime($fil['date']) ?>,
                        extension: "<?= $fil['extension'] ?>",
                        link: "<?= $fil['link'] ?>",
                        legacyLink: "<?= $fil['legacylink'] ?>",
                        type: "<?= $fil['type'] ?>",
                        size: <?= $fil['size'] ?>,
                    }, <?php } ?>]
            },
        <?php } ?>
    ];
</script>