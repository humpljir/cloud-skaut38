<?php
// Include necessary file
require_once('modules/config.php');

// Check if user is already logged in
if ($user->is_logged_in()) {
    // Redirect logged in user to their home page
    $user->redirect('index.php');
}

// Check if log-in form is submitted
if (isset($_POST['log_in'])) {
    // Retrieve form input
    $user_name = trim($_POST['user_name_email']);
    $user_email = trim($_POST['user_name_email']);
    $user_password = trim($_POST['user_password']);

    // Check for empty and invalid inputs
    if (empty($user_name) || empty($user_email)) {
        array_push($errors, "Please enter a valid username or e-mail address");
    } elseif (empty($user_password)) {
        array_push($errors, "Please enter a valid password.");
    } else {
        // Check if the user may be logged in
        if ($user->login($user_name, $user_email, $user_password)) {
            // Redirect if logged in successfully
            $user->redirect('home.php');
        } else {
            array_push($errors, "Incorrect log-in credentials.");
        }
    }
}

// Check if register form is submitted
if (isset($_POST['register'])) {
    // Retrieve form input
    $user_name = trim($_POST['user_name']);
    $user_email = trim($_POST['user_email']);
    $user_password = trim($_POST['user_password']);

    // Check for empty and invalid inputs
    if (empty($user_name)) {
        array_push($errors, "Please enter a valid username.");
    } elseif (empty($user_email)) {
        array_push($errors, "Please enter a valid e-mail address.");
    } elseif (empty($user_password)) {
        array_push($errors, "Please enter a valid password.");
    } elseif (!filter_var($user_email, FILTER_VALIDATE_EMAIL)) {
        array_push($errors, "Please enter a valid e-mail address.");
    } else {
        try {
            // Define query to select matching values
            $sql = "SELECT user_name, user_email FROM users WHERE user_name=:user_name OR user_email=:user_email";

            // Prepare the statement
            $query = $db_conn->prepare($sql);

            // Bind parameters
            $query->bindParam(':user_name', $user_name);
            $query->bindParam(':user_email', $user_email);

            // Execute the query
            $query->execute();

            // Return clashes row as an array indexed by both column name
            $returned_clashes_row = $query->fetch(PDO::FETCH_ASSOC);

            // Check for usernames or e-mail addresses that have already been used
            if ($returned_clashes_row['user_name'] == $user_name) {
                array_push($errors, "That username is taken. Please choose something different.");
            } elseif ($returned_clashes_row['user_email'] == $user_email) {
                array_push($errors, "That e-mail address is taken. Please choose something different.");
            } else {
                // Check if the user may be registered
                if ($user->register($user_name, $user_email, $user_password)) {
                    echo "Registered";
                }
            }
        } catch (PDOException $e) {
            array_push($errors, $e->getMessage());
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>OOP PHP - Home</title>
</head>
<body>
    <h1>Home</h1>

    <?php if (count($errors > 0)): ?>
    <p>Error(s):</p>
    <ul>
        <?php foreach ($errors as $error): ?>
            <li><?= $error ?></li>
        <?php endforeach ?>
    </ul>
    <?php endif ?>

    <p>Welcome, <?= $returned_row['user_name']; ?>. <a href="?logout=true">Log out</a></p>
</body>
</html>
./index.php

<?php
// Include necessary file
require_once('./includes/db.inc.php');

// Check if user is already logged in
if ($user->is_logged_in()) {
    // Redirect logged in user to their home page
    $user->redirect('home.php');
}

// Check if log-in form is submitted
if (isset($_POST['log_in'])) {
    // Retrieve form input
    $user_name = trim($_POST['user_name_email']);
    $user_email = trim($_POST['user_name_email']);
    $user_password = trim($_POST['user_password']);

    // Check for empty and invalid inputs
    if (empty($user_name) || empty($user_email)) {
        array_push($errors, "Please enter a valid username or e-mail address");
    } elseif (empty($user_password)) {
        array_push($errors, "Please enter a valid password.");
    } else {
        // Check if the user may be logged in
        if ($user->login($user_name, $user_email, $user_password)) {
            // Redirect if logged in successfully
            $user->redirect('home.php');
        } else {
            array_push($errors, "Incorrect log-in credentials.");
        }
    }
}

// Check if register form is submitted
if (isset($_POST['register'])) {
    // Retrieve form input
    $user_name = trim($_POST['user_name']);
    $user_email = trim($_POST['user_email']);
    $user_password = trim($_POST['user_password']);

    // Check for empty and invalid inputs
    if (empty($user_name)) {
        array_push($errors, "Please enter a valid username.");
    } elseif (empty($user_email)) {
        array_push($errors, "Please enter a valid e-mail address.");
    } elseif (empty($user_password)) {
        array_push($errors, "Please enter a valid password.");
    } elseif (!filter_var($user_email, FILTER_VALIDATE_EMAIL)) {
        array_push($errors, "Please enter a valid e-mail address.");
    } else {
        try {
            // Define query to select matching values
            $sql = "SELECT user_name, user_email FROM users WHERE user_name=:user_name OR user_email=:user_email";

            // Prepare the statement
            $query = $db_conn->prepare($sql);

            // Bind parameters
            $query->bindParam(':user_name', $user_name);
            $query->bindParam(':user_email', $user_email);

            // Execute the query
            $query->execute();

            // Return clashes row as an array indexed by both column name
            $returned_clashes_row = $query->fetch(PDO::FETCH_ASSOC);

            // Check for usernames or e-mail addresses that have already been used
            if ($returned_clashes_row['user_name'] == $user_name) {
                array_push($errors, "That username is taken. Please choose something different.");
            } elseif ($returned_clashes_row['user_email'] == $user_email) {
                array_push($errors, "That e-mail address is taken. Please choose something different.");
            } else {
                // Check if the user may be registered
                if ($user->register($user_name, $user_email, $user_password)) {
                    echo "Registered";
                }
            }
        } catch (PDOException $e) {
            array_push($errors, $e->getMessage());
        }
    }
}
?>
<!DOCTYPE html>
<html lang="cs">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <meta name="theme-color" content="#fff">
    <title>Login | cloud.skaut38</title>
    <link rel="stylesheet" href="styles/basic.css">
    <link rel="stylesheet" href="styles/animations.css">
    <link rel="stylesheet" href="styles/loading.css">
    <link rel="stylesheet" href="styles/customNotifications.css">
    <link rel="stylesheet" href="styles/login.css">
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="styles/responsive.css">
    <link rel="stylesheet" href="styles/hover.css">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="manifest" href="data/site.webmanifest">
    <link rel="mask-icon" href="safari-pinned-tab.svg" color="#457b9d">
    <meta name="apple-mobile-web-app-title" content="cloud.skaut38">
    <meta name="application-name" content="cloud.skaut38">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#1d3557">
    <link href="data/splashscreens/iphone5_splash.png"
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image" />
    <link href="data/splashscreens/iphone6_splash.png"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image" />
    <link href="data/splashscreens/iphoneplus_splash.png"
        media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image" />
    <link href="data/splashscreens/iphonex_splash.png"
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image" />
    <link href="data/splashscreens/iphonexr_splash.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image" />
    <link href="data/splashscreens/iphonexsmax_splash.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image" />
    <link href="data/splashscreens/ipad_splash.png"
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image" />
    <link href="data/splashscreens/ipadpro1_splash.png"
        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image" />
    <link href="data/splashscreens/ipadpro3_splash.png"
        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image" />
    <link href="data/splashscreens/ipadpro2_splash.png"
        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image" />

    <script>
        function onloadFromPHP() {

        }
    </script>
</head>

<body onload="initialize()">
    <div class="main-wrapper loading" id="main-wrapper-div">
        <div class="window" id="window-div" onclick="closeMenu()">
            <div class="window-scroll-login" id="window-scroll-div">
                <div class="box-guide-line line-0"></div>
                <div class="box-guide-line line-1"></div>
                <div class="box-guide-line line-2"></div>
                <div class="box-guide-line line-3"></div>
                <div class="box-guide-line line-4"></div>
                <div class="box-guide-line line-5"></div>
                <div class="box-guide-line line-6"></div>
                <div class="box-guide-line line-7"></div>
                <div class="box-guide-line line-8"></div>
                <div class="box-guide-line line-9"></div>
                <div class="box-guide-line line-10"></div>
                <div class="box-guide-line line-11"></div>
                <div class="box-particle-wrapper particle-0">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-particle-wrapper particle-1">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-particle-wrapper particle-2">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-particle-wrapper particle-3">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-particle-wrapper particle-4">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-particle-wrapper particle-5">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-particle-wrapper particle-6">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-particle-wrapper particle-7">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-particle-wrapper particle-8">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-particle-wrapper particle-9">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-particle-wrapper particle-10">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-particle-wrapper particle-11">
                    <div class="translaterY">
                        <div class="rotaterZ">
                            <div class="rotaterY">
                                <div class="rotaterX">
                                    <div class="box-particle">
                                        <div class="box-side side-0"></div>
                                        <div class="box-side side-1"></div>
                                        <div class="box-side side-2"></div>
                                        <div class="box-side side-3"></div>
                                        <div class="box-side side-4"></div>
                                        <div class="box-side side-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="login-box fluent-bg">
                <h1>Secure storage for your content!</h1>
                <p>Store, share, and collaborate on files and folders from any mobile device, tablet, or computer.
                    Securely on our custom platform.</p>
                <button onclick="openSide()">Discover Possibilities<div class="arrow-icon arrow-icon-generate"></div>
                </button>
            </div>
            <div id="window-side-div" class="window-side">
                <button class="side-return" onclick="closeSide()">
                    <div class="arrow-icon arrow-icon-generate rotated-return-icon"></div>return
                </button>
                <div class="side-title">About Us</div>
                <div class="side-box">
                    Lorem Ipsum, We're the best! Bla, bla, bla.
                </div>
            </div>
            <div class="top-bar top-bar-login fluent-bg" id="top-bar-div">
                <div class="top-bar-line"><a class="top-bar-title" href=""><svg width="100%" height="100%"
                            viewBox="0 0 72.431946 8.3819732" version="1.1">
                            <g id="layer1" transform="translate(38.365964,-164.94903)">
                                <path id="path840"
                                    style="font-style:normal;font-variant:normal;font-weight:900;font-stretch:normal;font-size:10.5833px;line-height:1.25;font-family:Diavlo;-inkscape-font-specification:'Diavlo Heavy';fill:var(--main-fg-color);fill-opacity:1;stroke:none;stroke-width:0.999999"
                                    d="M 21.160156 0 L 21.160156 24.560547 C 21.160156 28.160547 22.879701 31.320312 26.679688 31.320312 C 27.839685 31.320312 29.280319 31.119529 30.320312 29.439453 C 27.92032 29.239516 27.878906 25.479284 27.878906 23.279297 L 27.878906 3.0800781 C 27.878906 0.040090723 21.600154 0 21.160156 0 z M 136.47852 0 L 136.47852 28.240234 C 136.47852 31.320209 143.19922 31.320312 143.19922 31.320312 L 143.19922 22.199219 C 150.0392 23.959194 146.87916 31.320312 153.11914 31.320312 C 154.07914 31.320312 157.03906 30.640625 157.03906 30.640625 C 153.99907 24.92065 154.07944 21.879441 148.43945 19.439453 C 152.27944 17.399453 152.95962 13.759297 155.59961 10.279297 C 154.35961 9.8793095 152.91851 9.6796875 151.47852 9.6796875 C 150.59852 9.6796875 148.39929 9.7208972 147.2793 11.880859 C 145.7193 14.800847 144.59921 16.519141 143.19922 17.119141 L 143.19922 3.0800781 C 143.19922 0.00010332185 136.47852 0 136.47852 0 z M 93.279297 0.080078125 L 93.279297 8.640625 C 93.279297 9.4406376 93.558594 10.720703 93.558594 10.720703 C 93.558594 10.720703 91.600228 9.4804688 89.240234 9.4804688 C 84.520251 9.4804688 80.439453 12.280872 80.439453 16.880859 L 80.439453 24.080078 C 80.439453 28.840091 84.040252 31.519531 90.240234 31.519531 C 91.680227 31.519531 93.959459 30.839844 96.439453 30.839844 C 97.799448 30.839844 98.840003 30.879582 100 31.519531 L 100 3.5605469 C 100 0.12057207 93.959294 0.080078125 93.279297 0.080078125 z M 234.75781 1.4804688 C 224.99784 1.4804688 221.55814 6.920247 227.07812 12.240234 C 227.07812 7.3602218 231.51782 6.5605469 234.75781 6.5605469 C 237.8378 6.5605469 239.11914 7.8390751 239.11914 10.039062 C 239.11914 12.719088 238.07811 13.519531 235.07812 13.519531 L 233.03906 13.519531 L 233.03906 14.080078 C 233.03906 18.04004 235.03906 18.359441 236.03906 18.439453 C 239.75905 18.759579 239.51953 21.000481 239.51953 22.480469 C 239.51953 24.760469 238.1178 26.480469 234.75781 26.480469 C 231.19783 26.480469 226.87953 25.640665 226.51953 20.720703 C 221.75955 25.800653 224.31785 31.519531 234.75781 31.519531 C 241.71779 31.519531 246.39844 28.200053 246.39844 23.080078 L 246.39844 21.880859 C 246.39844 19.520885 244.8396 16.558984 242.59961 15.958984 C 244.4796 15.358984 245.99805 12.719453 245.99805 10.439453 L 245.99805 9.4394531 C 245.99805 4.3994531 241.31779 1.4804688 234.75781 1.4804688 z M 262.19922 1.4804688 C 255.63924 1.4804688 250.95898 4.280819 250.95898 9.8007812 L 250.95898 10.439453 C 250.95898 12.759441 252.75852 15.679297 254.47852 16.279297 C 252.03852 16.879297 250.55859 19.6003 250.55859 22.320312 L 250.55859 23.199219 C 250.55859 28.759206 255.23924 31.519531 262.19922 31.519531 C 269.0792 31.519531 273.75781 28.640066 273.75781 23.080078 L 273.75781 22.320312 C 273.75781 19.6003 272.2789 16.879297 269.87891 16.279297 C 271.6389 15.679297 273.35938 12.759441 273.35938 10.439453 L 273.35938 9.8007812 C 273.35938 4.280819 268.6792 1.4804688 262.19922 1.4804688 z M 262.19922 6.359375 C 265.07921 6.359375 266.47852 7.2791658 266.47852 10.119141 C 266.47852 12.919128 265.43952 13.839844 262.51953 13.839844 L 261.87891 13.839844 C 258.87891 13.839844 257.83789 12.919128 257.83789 10.119141 C 257.83789 7.2791658 259.23923 6.359375 262.19922 6.359375 z M 206.60938 6.7460938 C 205.97938 6.7317168 205.55859 6.7597656 205.55859 6.7597656 L 205.55859 24 C 205.55859 28.719987 208.71877 31.519531 214.71875 31.519531 C 220.75873 31.519531 222.31836 28.759544 222.31836 26.519531 C 222.31836 24.959569 221.4782 23.759556 220.1582 22.519531 C 220.1582 26.079544 217.71976 26.679688 215.75977 26.679688 C 212.83977 26.679688 212.2793 25.360872 212.2793 22.880859 L 212.2793 16.039062 L 216.51953 16.039062 C 220.19952 16.039062 220.23828 11.160156 220.23828 11.160156 L 212.2793 11.160156 L 212.2793 9.8808594 C 212.2793 7.2108783 208.49937 6.7892247 206.60938 6.7460938 z M 9.640625 9.4804688 C 3.4406464 9.4804688 0 12.32 0 17 L 0 24 C 0 28.719987 3.8790827 31.519531 10.039062 31.519531 C 15.159045 31.519531 18.199219 29.200247 18.199219 26.240234 C 18.199219 25.20026 17.600702 23.919675 16.720703 22.679688 C 16.680716 24.679662 14.359908 26.640625 10.919922 26.640625 C 8.0799282 26.640625 6.7207031 25.560509 6.7207031 22.560547 L 6.7207031 18.320312 C 6.7207031 14.560325 8.9200857 14.240234 11.080078 14.240234 C 13.320072 14.240234 15.880859 15.639244 15.880859 19.199219 C 17.200856 17.279219 17.759766 15.640312 17.759766 14.320312 C 17.759766 10.240313 12.320616 9.4804688 9.640625 9.4804688 z M 42.519531 9.4804688 C 35.399555 9.4804688 32.080078 12.32 32.080078 17 L 32.080078 24 C 32.080078 28.719987 35.399555 31.519531 42.519531 31.519531 C 49.55951 31.519531 52.878906 28.719987 52.878906 24 L 52.878906 17 C 52.878906 12.32 49.55951 9.4804688 42.519531 9.4804688 z M 123.32031 9.4804688 C 117.12033 9.4804688 113.67969 11.679478 113.67969 16.439453 C 113.67969 25.279428 126.67969 21.080585 126.67969 24.560547 C 126.67969 26.560559 124.60031 26.759766 123.32031 26.759766 C 121.16032 26.759766 116.79867 26.520612 116.63867 22.640625 C 114.91868 24.200625 114.11914 25.639909 114.11914 26.919922 C 114.11914 29.639897 117.56033 31.519531 123.32031 31.519531 C 129.96029 31.519531 133.2793 28.999753 133.2793 24.759766 C 133.2793 15.039803 120.2793 19.159987 120.2793 16 C 120.2793 14.8 121.92001 14.320312 124 14.320312 C 126.75999 14.320312 130.16016 15.279622 130.16016 17.599609 C 131.44015 16.119622 132.03906 14.760612 132.03906 13.640625 C 132.03906 11.000625 128.76029 9.4804688 123.32031 9.4804688 z M 167.43945 9.4804688 C 164.67946 9.4804688 159 10.2803 159 14.320312 C 159 15.5603 159.35985 16.998997 160.83984 18.958984 C 160.83984 15.15901 164.27939 14.240234 167.35938 14.240234 C 169.95937 14.240234 170.67969 15.360313 170.67969 16.320312 C 168.83969 19.0003 158.43945 17.638984 158.43945 24.958984 C 158.43945 29.998947 162.7583 31.519531 167.23828 31.519531 C 169.59827 31.519531 171.83899 30.800781 173.95898 30.800781 C 175.07898 30.800781 176.27844 30.919342 177.39844 31.519531 L 177.39844 16.640625 C 177.39844 12.00065 173.95943 9.4804688 167.43945 9.4804688 z M 56.878906 9.6796875 L 56.878906 24.439453 C 56.878906 29.999441 61.680169 31.519531 66.160156 31.519531 C 68.200149 31.519531 70.079148 30.679688 72.119141 30.679688 C 74.639133 30.679688 76.439453 31.679688 76.439453 31.679688 L 76.439453 12.759766 C 76.439453 9.679753 69.71875 9.6796875 69.71875 9.6796875 L 69.71875 26.359375 C 69.71875 26.359375 68.078745 26.759766 66.71875 26.759766 C 64.398759 26.759766 63.599609 25.719856 63.599609 23.839844 L 63.599609 12.759766 C 63.599609 9.8397782 56.878906 9.6796875 56.878906 9.6796875 z M 181.59961 9.6796875 L 181.59961 24.439453 C 181.59961 29.999441 186.39892 31.519531 190.87891 31.519531 C 192.9189 31.519531 194.79985 30.679688 196.83984 30.679688 C 199.35984 30.679688 201.1582 31.679688 201.1582 31.679688 L 201.1582 12.759766 C 201.1582 9.679753 194.43945 9.6796875 194.43945 9.6796875 L 194.43945 26.359375 C 194.43945 26.359375 192.79945 26.759766 191.43945 26.759766 C 189.11946 26.759766 188.31836 25.719856 188.31836 23.839844 L 188.31836 12.759766 C 188.31836 9.8397782 181.59961 9.6796875 181.59961 9.6796875 z M 42.519531 14.199219 C 45.519524 14.199219 46.160156 15.399622 46.160156 17.599609 L 46.160156 23.400391 C 46.160156 25.600378 45.519524 26.839844 42.519531 26.839844 C 39.439541 26.839844 38.798828 25.600378 38.798828 23.400391 L 38.798828 17.599609 C 38.798828 15.399622 39.439541 14.199219 42.519531 14.199219 z M 89.759766 14.199219 C 91.559758 14.199219 93.279297 15.360053 93.279297 17.080078 L 93.279297 26.720703 C 93.279297 26.720703 91.838749 26.958984 90.71875 26.958984 C 87.99876 26.958984 87.160156 25.720481 87.160156 23.480469 L 87.160156 17.480469 C 87.160156 15.200469 88.239772 14.199219 89.759766 14.199219 z M 262.19922 18.720703 C 265.47921 18.720703 266.87891 19.840703 266.87891 22.720703 C 266.87891 25.640691 265.47921 26.679688 262.19922 26.679688 C 258.83923 26.679688 257.43945 25.639831 257.43945 22.839844 C 257.43945 19.839844 258.83923 18.720703 262.19922 18.720703 z M 170.79883 21.119141 L 170.79883 26.560547 C 170.79883 26.560547 169.3189 27 167.87891 27 C 166.51891 27 165.1582 26.600678 165.1582 24.720703 C 165.1582 22.160678 169.71883 22.799141 170.79883 21.119141 z M 104.47852 24.958984 L 104.47852 29.439453 C 104.47852 30.319478 105.51977 31.039062 106.75977 31.039062 L 110.40039 31.039062 L 110.40039 26.560547 C 110.40039 25.800522 109.39921 24.958984 108.19922 24.958984 L 104.47852 24.958984 z "
                                    transform="matrix(0.26458333,0,0,0.26458333,-38.365964,164.94903)" />
                            </g>
                        </svg></a>
                </div>
                <div class="top-bar-line">
                </div>
            </div>
        </div>
        <div class="menu-wrapper" id="menu-wrapper-div">
            <div class="menu-formbox fluent-bg" id="menu-formbox-div">
                <form method="post" class="form-visible" id="form-0" data-submit-label="LOGIN">
                    <input type="text" id="login-username" name="username" placeholder="username" required>
                    <input type="password" id="login-password" name="password" placeholder="password" required>
                    <a onclick="openMenu('form-2',event)">Create New Account</a>
                    <a onclick="openMenu('form-1',event)">Forgot Password</a>
                </form>
                <form method="post" class="form-visible" id="form-1" data-submit-label="SEND MAIL">
                    <input type="text" id="forgot-username" name="forgot-username" placeholder="username or mail" required>
                    <label class="form-text">Check your mailbox to reset your password.</label>
                    <a onclick="openMenu('form-0',event)">Return To Login</a>
                    <a href="mailto:jirihumpl@gmail.com">Haven't received mail?</a>
                </form>
                <form method="post" class="form-visible" id="form-2" data-submit-label="REGISTER">
                    <input type="text" id="register-username" data-validate="username" name="username" placeholder="username" required>
                    <input type="text" id="register-fullname" data-validate="label" name="fullname" placeholder="full name" required>
                    <input type="email" id="register-email" data-validate="email" name="email" placeholder="email" required>
                    <input type="password" id="register-password" data-validate="password" name="password" placeholder="password" required>
                    <input type="password" id="register-password-confirm" data-validate="match" data-validate-match-id="register-password" name="password_confirm" placeholder="password again" required>
                    <label class="form-text">This is internal cloud storage, every registration has to be confirmed by contacting your scoutmaster.</label>
                    <a onclick="openMenu('form-0',event)">Already have an account?</a>
                </form>
            </div>
            <div class="menu-spacer"></div>
            <div class="menu-button-wrapper">
                <button type="button" class="menu-button fluent-bg" onclick="closeMenu()">CANCEL</button>
                <div class="menu-spacer"></div>
                <button type="submit" class="menu-button menu-button-submit" id="menu-submit-button">SUBMIT</button>
            </div>
        </div>
        <div class="toolbar-wrapper toolbar-wrapper-login">
            <div class="menu-button-wrapper">
                <button type="button" class="menu-button menu-button-submit" onclick="openMenu('form-0',event)">LOGIN</button>
            </div>
        </div>
    </div>
    <div class="loading-wrapper" id="loading-wrapper-div">
        <div class="loading-logo">
            <div class="box-particle-wrapper particle-logo">
                <div class="translaterY">
                    <div class="rotaterZ">
                        <div class="rotaterY">
                            <div class="rotaterX">
                                <div class="box-particle">
                                    <div class="box-side side-0"></div>
                                    <div class="box-side side-1"></div>
                                    <div class="box-side side-2"></div>
                                    <div class="box-side side-3"></div>
                                    <div class="box-side side-4"></div>
                                    <div class="box-side side-5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <svg width="100%" height="100%" viewBox="0 0 72.431946 8.3819732" version="1.1">
                <g id="layer1" transform="translate(38.365964,-164.94903)">
                    <path id="path840"
                        style="font-style:normal;font-variant:normal;font-weight:900;font-stretch:normal;font-size:10.5833px;line-height:1.25;font-family:Diavlo;-inkscape-font-specification:'Diavlo Heavy';fill:var(--main-fg-color);fill-opacity:1;stroke:none;stroke-width:0.999999"
                        d="M 21.160156 0 L 21.160156 24.560547 C 21.160156 28.160547 22.879701 31.320312 26.679688 31.320312 C 27.839685 31.320312 29.280319 31.119529 30.320312 29.439453 C 27.92032 29.239516 27.878906 25.479284 27.878906 23.279297 L 27.878906 3.0800781 C 27.878906 0.040090723 21.600154 0 21.160156 0 z M 136.47852 0 L 136.47852 28.240234 C 136.47852 31.320209 143.19922 31.320312 143.19922 31.320312 L 143.19922 22.199219 C 150.0392 23.959194 146.87916 31.320312 153.11914 31.320312 C 154.07914 31.320312 157.03906 30.640625 157.03906 30.640625 C 153.99907 24.92065 154.07944 21.879441 148.43945 19.439453 C 152.27944 17.399453 152.95962 13.759297 155.59961 10.279297 C 154.35961 9.8793095 152.91851 9.6796875 151.47852 9.6796875 C 150.59852 9.6796875 148.39929 9.7208972 147.2793 11.880859 C 145.7193 14.800847 144.59921 16.519141 143.19922 17.119141 L 143.19922 3.0800781 C 143.19922 0.00010332185 136.47852 0 136.47852 0 z M 93.279297 0.080078125 L 93.279297 8.640625 C 93.279297 9.4406376 93.558594 10.720703 93.558594 10.720703 C 93.558594 10.720703 91.600228 9.4804688 89.240234 9.4804688 C 84.520251 9.4804688 80.439453 12.280872 80.439453 16.880859 L 80.439453 24.080078 C 80.439453 28.840091 84.040252 31.519531 90.240234 31.519531 C 91.680227 31.519531 93.959459 30.839844 96.439453 30.839844 C 97.799448 30.839844 98.840003 30.879582 100 31.519531 L 100 3.5605469 C 100 0.12057207 93.959294 0.080078125 93.279297 0.080078125 z M 234.75781 1.4804688 C 224.99784 1.4804688 221.55814 6.920247 227.07812 12.240234 C 227.07812 7.3602218 231.51782 6.5605469 234.75781 6.5605469 C 237.8378 6.5605469 239.11914 7.8390751 239.11914 10.039062 C 239.11914 12.719088 238.07811 13.519531 235.07812 13.519531 L 233.03906 13.519531 L 233.03906 14.080078 C 233.03906 18.04004 235.03906 18.359441 236.03906 18.439453 C 239.75905 18.759579 239.51953 21.000481 239.51953 22.480469 C 239.51953 24.760469 238.1178 26.480469 234.75781 26.480469 C 231.19783 26.480469 226.87953 25.640665 226.51953 20.720703 C 221.75955 25.800653 224.31785 31.519531 234.75781 31.519531 C 241.71779 31.519531 246.39844 28.200053 246.39844 23.080078 L 246.39844 21.880859 C 246.39844 19.520885 244.8396 16.558984 242.59961 15.958984 C 244.4796 15.358984 245.99805 12.719453 245.99805 10.439453 L 245.99805 9.4394531 C 245.99805 4.3994531 241.31779 1.4804688 234.75781 1.4804688 z M 262.19922 1.4804688 C 255.63924 1.4804688 250.95898 4.280819 250.95898 9.8007812 L 250.95898 10.439453 C 250.95898 12.759441 252.75852 15.679297 254.47852 16.279297 C 252.03852 16.879297 250.55859 19.6003 250.55859 22.320312 L 250.55859 23.199219 C 250.55859 28.759206 255.23924 31.519531 262.19922 31.519531 C 269.0792 31.519531 273.75781 28.640066 273.75781 23.080078 L 273.75781 22.320312 C 273.75781 19.6003 272.2789 16.879297 269.87891 16.279297 C 271.6389 15.679297 273.35938 12.759441 273.35938 10.439453 L 273.35938 9.8007812 C 273.35938 4.280819 268.6792 1.4804688 262.19922 1.4804688 z M 262.19922 6.359375 C 265.07921 6.359375 266.47852 7.2791658 266.47852 10.119141 C 266.47852 12.919128 265.43952 13.839844 262.51953 13.839844 L 261.87891 13.839844 C 258.87891 13.839844 257.83789 12.919128 257.83789 10.119141 C 257.83789 7.2791658 259.23923 6.359375 262.19922 6.359375 z M 206.60938 6.7460938 C 205.97938 6.7317168 205.55859 6.7597656 205.55859 6.7597656 L 205.55859 24 C 205.55859 28.719987 208.71877 31.519531 214.71875 31.519531 C 220.75873 31.519531 222.31836 28.759544 222.31836 26.519531 C 222.31836 24.959569 221.4782 23.759556 220.1582 22.519531 C 220.1582 26.079544 217.71976 26.679688 215.75977 26.679688 C 212.83977 26.679688 212.2793 25.360872 212.2793 22.880859 L 212.2793 16.039062 L 216.51953 16.039062 C 220.19952 16.039062 220.23828 11.160156 220.23828 11.160156 L 212.2793 11.160156 L 212.2793 9.8808594 C 212.2793 7.2108783 208.49937 6.7892247 206.60938 6.7460938 z M 9.640625 9.4804688 C 3.4406464 9.4804688 0 12.32 0 17 L 0 24 C 0 28.719987 3.8790827 31.519531 10.039062 31.519531 C 15.159045 31.519531 18.199219 29.200247 18.199219 26.240234 C 18.199219 25.20026 17.600702 23.919675 16.720703 22.679688 C 16.680716 24.679662 14.359908 26.640625 10.919922 26.640625 C 8.0799282 26.640625 6.7207031 25.560509 6.7207031 22.560547 L 6.7207031 18.320312 C 6.7207031 14.560325 8.9200857 14.240234 11.080078 14.240234 C 13.320072 14.240234 15.880859 15.639244 15.880859 19.199219 C 17.200856 17.279219 17.759766 15.640312 17.759766 14.320312 C 17.759766 10.240313 12.320616 9.4804688 9.640625 9.4804688 z M 42.519531 9.4804688 C 35.399555 9.4804688 32.080078 12.32 32.080078 17 L 32.080078 24 C 32.080078 28.719987 35.399555 31.519531 42.519531 31.519531 C 49.55951 31.519531 52.878906 28.719987 52.878906 24 L 52.878906 17 C 52.878906 12.32 49.55951 9.4804688 42.519531 9.4804688 z M 123.32031 9.4804688 C 117.12033 9.4804688 113.67969 11.679478 113.67969 16.439453 C 113.67969 25.279428 126.67969 21.080585 126.67969 24.560547 C 126.67969 26.560559 124.60031 26.759766 123.32031 26.759766 C 121.16032 26.759766 116.79867 26.520612 116.63867 22.640625 C 114.91868 24.200625 114.11914 25.639909 114.11914 26.919922 C 114.11914 29.639897 117.56033 31.519531 123.32031 31.519531 C 129.96029 31.519531 133.2793 28.999753 133.2793 24.759766 C 133.2793 15.039803 120.2793 19.159987 120.2793 16 C 120.2793 14.8 121.92001 14.320312 124 14.320312 C 126.75999 14.320312 130.16016 15.279622 130.16016 17.599609 C 131.44015 16.119622 132.03906 14.760612 132.03906 13.640625 C 132.03906 11.000625 128.76029 9.4804688 123.32031 9.4804688 z M 167.43945 9.4804688 C 164.67946 9.4804688 159 10.2803 159 14.320312 C 159 15.5603 159.35985 16.998997 160.83984 18.958984 C 160.83984 15.15901 164.27939 14.240234 167.35938 14.240234 C 169.95937 14.240234 170.67969 15.360313 170.67969 16.320312 C 168.83969 19.0003 158.43945 17.638984 158.43945 24.958984 C 158.43945 29.998947 162.7583 31.519531 167.23828 31.519531 C 169.59827 31.519531 171.83899 30.800781 173.95898 30.800781 C 175.07898 30.800781 176.27844 30.919342 177.39844 31.519531 L 177.39844 16.640625 C 177.39844 12.00065 173.95943 9.4804688 167.43945 9.4804688 z M 56.878906 9.6796875 L 56.878906 24.439453 C 56.878906 29.999441 61.680169 31.519531 66.160156 31.519531 C 68.200149 31.519531 70.079148 30.679688 72.119141 30.679688 C 74.639133 30.679688 76.439453 31.679688 76.439453 31.679688 L 76.439453 12.759766 C 76.439453 9.679753 69.71875 9.6796875 69.71875 9.6796875 L 69.71875 26.359375 C 69.71875 26.359375 68.078745 26.759766 66.71875 26.759766 C 64.398759 26.759766 63.599609 25.719856 63.599609 23.839844 L 63.599609 12.759766 C 63.599609 9.8397782 56.878906 9.6796875 56.878906 9.6796875 z M 181.59961 9.6796875 L 181.59961 24.439453 C 181.59961 29.999441 186.39892 31.519531 190.87891 31.519531 C 192.9189 31.519531 194.79985 30.679688 196.83984 30.679688 C 199.35984 30.679688 201.1582 31.679688 201.1582 31.679688 L 201.1582 12.759766 C 201.1582 9.679753 194.43945 9.6796875 194.43945 9.6796875 L 194.43945 26.359375 C 194.43945 26.359375 192.79945 26.759766 191.43945 26.759766 C 189.11946 26.759766 188.31836 25.719856 188.31836 23.839844 L 188.31836 12.759766 C 188.31836 9.8397782 181.59961 9.6796875 181.59961 9.6796875 z M 42.519531 14.199219 C 45.519524 14.199219 46.160156 15.399622 46.160156 17.599609 L 46.160156 23.400391 C 46.160156 25.600378 45.519524 26.839844 42.519531 26.839844 C 39.439541 26.839844 38.798828 25.600378 38.798828 23.400391 L 38.798828 17.599609 C 38.798828 15.399622 39.439541 14.199219 42.519531 14.199219 z M 89.759766 14.199219 C 91.559758 14.199219 93.279297 15.360053 93.279297 17.080078 L 93.279297 26.720703 C 93.279297 26.720703 91.838749 26.958984 90.71875 26.958984 C 87.99876 26.958984 87.160156 25.720481 87.160156 23.480469 L 87.160156 17.480469 C 87.160156 15.200469 88.239772 14.199219 89.759766 14.199219 z M 262.19922 18.720703 C 265.47921 18.720703 266.87891 19.840703 266.87891 22.720703 C 266.87891 25.640691 265.47921 26.679688 262.19922 26.679688 C 258.83923 26.679688 257.43945 25.639831 257.43945 22.839844 C 257.43945 19.839844 258.83923 18.720703 262.19922 18.720703 z M 170.79883 21.119141 L 170.79883 26.560547 C 170.79883 26.560547 169.3189 27 167.87891 27 C 166.51891 27 165.1582 26.600678 165.1582 24.720703 C 165.1582 22.160678 169.71883 22.799141 170.79883 21.119141 z M 104.47852 24.958984 L 104.47852 29.439453 C 104.47852 30.319478 105.51977 31.039062 106.75977 31.039062 L 110.40039 31.039062 L 110.40039 26.560547 C 110.40039 25.800522 109.39921 24.958984 108.19922 24.958984 L 104.47852 24.958984 z "
                        transform="matrix(0.26458333,0,0,0.26458333,-38.365964,164.94903)" />
                </g>
            </svg>
        </div>
    </div>

    <div class="screen-size-error">
        <div class="screen-size-error-box">
            <img class="screen-size-error-icon" src="img/aspect-ratio.svg">
            <div class="screen-size-error-text">
                This aspect ration or screen size is not allowed. Please, resize window or open app on other device.
            </div>
        </div>
    </div>

    <script type="text/javascript" src="scripts/data.js">
    </script>
    <script type="text/javascript" src="scripts/customNotifications.js">
    </script>
    <script type="text/javascript" src="scripts/init.js">
    </script>
    <script type="text/javascript" src="scripts/app.js">
    </script>
    <script type="text/javascript" src="scripts/script.js">
    </script>
</body>

</html>