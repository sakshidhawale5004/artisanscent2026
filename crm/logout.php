<?php
require_once __DIR__ . '/config.php';

unset($_SESSION['artisanscent_admin_logged']);
unset($_SESSION['admin_user']);
session_destroy();

header('Location: index.php?msg=logged_out');
exit;
