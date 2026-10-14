<?php
require_once __DIR__ . '/config.php';
check_auth();

$type = $_GET['type'] ?? 'products';
$date = date('Y-m-d');

if ($type === 'products') {
    $products = get_products();
    $filename = "artisanscent_products_catalog_{$date}.csv";

    header('Content-Type: text/csv; charset=utf-8');
    header("Content-Disposition: attachment; filename=\"{$filename}\"");

    $output = fopen('php://output', 'w');
    // UTF-8 BOM for Excel compatibility
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));

    // Headers specifically including categories, prices, images, description, rating, name as requested
    fputcsv($output, [
        'Product ID',
        'Name',
        'Category',
        'Price (INR)',
        'Sale Price (INR)',
        'Rating',
        'Image URL',
        'Fragrance Notes',
        'Olfactory Family',
        'Size',
        'Stock Quantity',
        'Badge',
        'Botanical Specimen',
        'Description'
    ]);

    foreach ($products as $p) {
        fputcsv($output, [
            $p['id'] ?? '',
            $p['name'] ?? '',
            $p['category'] ?? '',
            $p['price'] ?? 0,
            $p['salePrice'] ?? '',
            $p['rating'] ?? 4.9,
            $p['image'] ?? '',
            $p['notes'] ?? '',
            $p['family'] ?? '',
            $p['size'] ?? '',
            $p['stock'] ?? 25,
            $p['badge'] ?? '',
            $p['botanicalName'] ?? '',
            $p['description'] ?? ''
        ]);
    }

    fclose($output);
    exit;
} elseif ($type === 'orders') {
    $orders = get_orders();
    $filename = "artisanscent_orders_history_{$date}.csv";

    header('Content-Type: text/csv; charset=utf-8');
    header("Content-Disposition: attachment; filename=\"{$filename}\"");

    $output = fopen('php://output', 'w');
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));

    fputcsv($output, ['Order ID', 'Customer Name', 'Email', 'Phone', 'Items', 'Total (INR)', 'Fulfillment Status', 'Date']);

    foreach ($orders as $o) {
        fputcsv($output, [
            $o['id'] ?? '',
            $o['customer'] ?? '',
            $o['email'] ?? '',
            $o['phone'] ?? '',
            $o['items'] ?? '',
            $o['total'] ?? 0,
            $o['status'] ?? 'Pending',
            $o['date'] ?? ''
        ]);
    }

    fclose($output);
    exit;
} elseif ($type === 'customers') {
    $customers = get_customers();
    $filename = "artisanscent_crm_customers_{$date}.csv";

    header('Content-Type: text/csv; charset=utf-8');
    header("Content-Disposition: attachment; filename=\"{$filename}\"");

    $output = fopen('php://output', 'w');
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));

    fputcsv($output, ['Customer ID', 'Name', 'Email', 'Phone', 'CRM Segment', 'Orders Count', 'Total Spend (INR)', 'Last Order Date']);

    foreach ($customers as $c) {
        fputcsv($output, [
            $c['id'] ?? '',
            $c['name'] ?? '',
            $c['email'] ?? '',
            $c['phone'] ?? '',
            $c['segment'] ?? 'General',
            $c['ordersCount'] ?? 0,
            $c['totalSpend'] ?? 0,
            $c['lastOrder'] ?? ''
        ]);
    }

    fclose($output);
    exit;
} else {
    header('Location: dashboard.php');
    exit;
}
