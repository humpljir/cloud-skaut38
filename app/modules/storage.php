<script>
    var storage = [<?php
                    $dir_sql = "SELECT * FROM directories";
                    $dir_result = $mysqli->query($dir_sql);
                    while ($dir = $dir_result->fetch_assoc()) {

                        $dir_author_sql = "SELECT * FROM users WHERE id='$dir[author]' LIMIT 1";
                        $dir_author_result = $mysqli->query($dir_author_sql);
                        $dir_author = $dir_author_result->fetch_assoc();
                    ?> {
                id: <?= $dir['id'] ?>,
                author: "<?= $dir_author['username'] ?>",
                authorImg: "<?= $dir_author['img'] ?>",
                name: "<?= $dir['name'] ?>",
                date: <?= strtotime($dir['date']) ?>,
                size: <?= $dir['size'] ?>,
                color: "var(--theme-color-<?= $dir['color'] ?>)",
                colorComplementary: "var(--theme-color-<?= $dir['color'] ?>-complementary)",
                content: [<?php
                            $fil_sql = "SELECT * FROM files WHERE dirid='$dir[id]'";
                            $fil_result = $mysqli->query($fil_sql);
                            while ($fil = $fil_result->fetch_assoc()) {

                                $fil_author_sql = "SELECT * FROM users WHERE id='$fil[author]' LIMIT 1";
                                $fil_author_result = $mysqli->query($fil_author_sql);
                                $fil_author = $fil_author_result->fetch_assoc();
                            ?> {
                        id: <?= $fil['id'] ?>,
                        author: "<?= $fil_author['username'] ?>",
                        authorImg: "<?= $fil_author['img'] ?>",
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