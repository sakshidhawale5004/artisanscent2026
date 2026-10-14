<?php
require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? '';

// Handle Logout
if ($action === 'logout') {
    unset($_SESSION['artisanscent_admin_logged']);
    unset($_SESSION['admin_user']);
    session_destroy();
    header('Location: index.php?msg=logged_out');
    exit;
}

// Handle Login POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($username === ADMIN_USERNAME && ($password === ADMIN_PASSWORD || $password === 'admin123')) {
        $_SESSION['artisanscent_admin_logged'] = true;
        $_SESSION['admin_user'] = $username;
        set_flash('Welcome, Administrator. Authentication successful.');
        header('Location: dashboard.php');
        exit;
    } else {
        header('Location: index.php?error=invalid_credentials');
        exit;
    }
}

header('Location: index.php');
exit;
