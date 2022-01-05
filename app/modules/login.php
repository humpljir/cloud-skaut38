<?php
        // Define variables and initialize with empty values
        $username = $password = $authorized = "";
        $username_err = $password_err = $global_err = "";

            $sql = "SELECT id, username, password, authorized FROM users WHERE username = ?";

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
                                    $global_err .= 'pushCustomNotifications("The password you entered was not valid.", "var(--notifications-error-color)");';
                                }
                            } else {
                                $global_err .= 'pushCustomNotifications("Your account needs to be manually verified to start using this cloud. Please, contact your scoutmaster.", "var(--notifications-error-color)");';
                            }
                        }
                    } else {
                        $global_err .= 'pushCustomNotifications("No account found with that username.", "var(--notifications-error-color)");';
                    }
                } else {
                    $global_err .= 'pushCustomNotifications("Oops! Something went wrong. Please try again later.", "var(--notifications-error-color)");';
                }

                $stmt->close();
            }
