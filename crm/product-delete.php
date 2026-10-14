<?php
require_once __DIR__ . '/config.php';
check_auth();

$id = $_GET['id'] ?? '';
if ($id) {
    $products = get_products();
    $foundName = '';
    $filtered = array_filter($products, function($p) use ($id, &$foundName) {
        if (($p['id'] ?? '') === $id) {
            $foundName = $p['name'] ?? 'Product';
            return false;
        }
        return true;
    });

    save_products(array_values($filtered));
    set_flash("Product \"{$foundName}\" was successfully removed from catalog.");
}

header('Location: products.php');
exit;
