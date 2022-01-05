<?php
        $username = $password = $authorized = "";
        $username = $_POST["username"];
        $password = $_POST["password"];

            $sql = "SELECT id, username, password, authorized FROM users WHERE username = '$username'";

            if ($stmt = $mysqli->prepare($sql)) {
                $stmt->bind_param("s", $param_username);

                $param_username = $username;

                if ($stmt->execute()) {
                    $stmt->store_result();
                    if ($stmt->num_rows == 1) {
                        $stmt->bind_result($id, $username, $hashed_password, $authorized);
                        if ($stmt->fetch()) {

                            if ($authorized == 1) {
                                if (password_verify($password, $hashed_password)) {

                                    session_destroy();
                                    session_start();

                                    $_SESSION["loggedin"] = true;
                                    $_SESSION["id"] = $id;
                                    $_SESSION["username"] = $username;

                                    header("location: index.php?");
                                } else {
                                    add_global_error('The password you entered was not valid.','var(--notifications-error-color)');
                                }
                            } else {
                                add_global_error('Your account needs to be manually verified to start using this cloud. Please, contact your scoutmaster.','var(--notifications-error-color)');
                            }
                        }
                    } else {
                        add_global_error('No account found with that username.','var(--notifications-error-color)');
                    }
                } else {
                    add_global_error('Oops! Something went wrong. Please try again later.','var(--notifications-error-color)');
                }

                $stmt->close();
            }
