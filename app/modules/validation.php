<?php
/*

************************************
validation.php
************************************

	- Project:  cloud.skaut38
	- Author:   J. Humpl   
*/


use function PHPSTORM_META\type;

function validate($value, $type)
{
    // validate string - same rules as in js client side

    if ($type == 'username') {
        if (!(preg_match(
            '/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/',
            $value
        ) && strlen($value) > 5 && strlen($value) < 201)) {
            add_global_error("ERROR: You have entered invalid value.", "var(--notifications-error-color)");
            return false;
        } else {
            return true;
        }
    } else if ($type == 'label') {
        if (!(preg_match(
            '/^[a-zA-Zá-žÁ-Ž0-9\s!?.\$%\^\&*\)\(+=._-]+$/',
            $value
        ) && strlen($value) > 0 && strlen($value) < 201)) {
            add_global_error("ERROR: You have entered invalid value.", "var(--notifications-error-color)");
            return false;
        } else {
            return true;
        }
    } else if ($type == 'email') {
        if (!(preg_match(
            '/.+\@.+\..+/',
            $value
        ))) {
            add_global_error("ERROR: You have entered invalid value.", "var(--notifications-error-color)");
            return false;
        } else {
            return true;
        }
    } else if ($type == 'password') {
        if (!(preg_match(
            '/^(?=.*[A-Z])(?=.*[a-z])([^\xyz]){0,}$/',
            $value
        ) && preg_match(
            '/^(?=.*\d)([^\xyz]){0,}$/',
            $value
        ) && strlen($value) > 7 && strlen($value) < 201)) {
            add_global_error("ERROR: You have entered invalid value.", "var(--notifications-error-color)");
            return false;
        } else {
            return true;
        }
    } else if ($type == 'numeric') {
        if (is_numeric($value)) {
            return true;
        } else {
            return false;
            add_global_error("ERROR: You have entered invalid value.", "var(--notifications-error-color)");
        }
    } else {
        return false;
        add_global_error("ERROR: You have entered invalid value.", "var(--notifications-error-color)");
    }
}
