<?php
/**
 * Artisan Scent CRM & Commerce Hub - Configuration & Data Layer
 * Author: Artisan Scent Atelier
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Admin Credentials
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'artisan2026'); // Standard admin password

// Data Directory
define('DATA_DIR', __DIR__ . '/data');
define('UPLOADS_DIR', __DIR__ . '/uploads');

// Ensure directories exist
if (!file_exists(DATA_DIR)) {
    mkdir(DATA_DIR, 0777, true);
}
if (!file_exists(UPLOADS_DIR)) {
    mkdir(UPLOADS_DIR, 0777, true);
}

// Authentication Check
function check_auth() {
    if (empty($_SESSION['artisanscent_admin_logged'])) {
        header('Location: index.php?msg=auth_required');
        exit;
    }
}

// Product Storage Helpers
function get_products() {
    $file = DATA_DIR . '/products.json';
    if (!file_exists($file)) {
        return [];
    }
    $json = file_get_contents($file);
    return json_decode($json, true) ?: [];
}

function save_products($products) {
    $file = DATA_DIR . '/products.json';
    return file_put_contents($file, json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

// Orders Storage Helpers
function get_orders() {
    $file = DATA_DIR . '/orders.json';
    if (!file_exists($file)) {
        return [];
    }
    $json = file_get_contents($file);
    return json_decode($json, true) ?: [];
}

function save_orders($orders) {
    $file = DATA_DIR . '/orders.json';
    return file_put_contents($file, json_encode($orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

// Customers Storage Helpers
function get_customers() {
    $file = DATA_DIR . '/customers.json';
    if (!file_exists($file)) {
        return [];
    }
    $json = file_get_contents($file);
    return json_decode($json, true) ?: [];
}

function save_customers($customers) {
    $file = DATA_DIR . '/customers.json';
    return file_put_contents($file, json_encode($customers, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

// Currency Formatter
function format_inr($amount) {
    return '₹' . number_format((float)$amount, 0, '.', ',');
}

// Flash Message Helper
function set_flash($message, $type = 'success') {
    $_SESSION['flash_message'] = [
        'text' => $message,
        'type' => $type
    ];
}

function get_flash() {
    if (!empty($_SESSION['flash_message'])) {
        $msg = $_SESSION['flash_message'];
        unset($_SESSION['flash_message']);
        return $msg;
    }
    return null;
}
