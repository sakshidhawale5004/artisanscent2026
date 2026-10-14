<?php
require_once __DIR__ . '/config.php';
check_auth();

$currentPage = basename($_SERVER['PHP_SELF'], '.php');
$flash = get_flash();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard &amp; CRM | Artisan Scent</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Manrope', sans-serif; }
    .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body class="bg-[#f7f6f3] text-[#222222] min-h-screen flex flex-col font-sans">

  <!-- Flash Notification -->
  <?php if ($flash): ?>
    <div class="fixed bottom-5 right-5 z-50 bg-[#05170e] text-[#86efac] border border-[#2d8659] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs animate-bounce">
      <span>✓ <?php echo htmlspecialchars($flash['text']); ?></span>
    </div>
  <?php endif; ?>

  <!-- Top Navigation Header -->
  <header class="bg-[#05170e] text-white border-b border-[#1b5e3f]/40 sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-md">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <a href="dashboard.php" class="flex items-center gap-3 group">
          <img
            src="../assets/logo.jpeg"
            alt="Artisan Scent"
            class="w-9 h-9 rounded-full object-cover border border-[#d4af37]/60 group-hover:scale-105 transition-transform"
            onerror="this.src='/assets/logo.jpeg'"
          />
          <div>
            <div class="font-display tracking-widest text-base sm:text-lg text-white font-semibold leading-none">
              ARTISAN <span class="text-[#d4af37]">SCENT</span>
            </div>
            <div class="text-[9px] uppercase tracking-[0.2em] text-[#86efac] font-mono mt-0.5">
              PHP COMMERCE CRM v2.0
            </div>
          </div>
        </a>
      </div>

      <!-- Desktop Nav Pills -->
      <nav class="hidden md:flex items-center gap-1 bg-[#092618] p-1 rounded-full border border-[#2d8659]/50">
        <a
          href="dashboard.php"
          class="px-4 py-1.5 rounded-full text-xs font-medium transition-all <?php echo $currentPage === 'dashboard' ? 'bg-[#1b5e3f] text-white shadow-xs' : 'text-[#a3b8ac] hover:text-white'; ?>"
        >
          Dashboard
        </a>
        <a
          href="products.php"
          class="px-4 py-1.5 rounded-full text-xs font-medium transition-all <?php echo in_array($currentPage, ['products', 'product-add', 'product-edit']) ? 'bg-[#1b5e3f] text-white shadow-xs' : 'text-[#a3b8ac] hover:text-white'; ?>"
        >
          Products Catalog
        </a>
        <a
          href="orders.php"
          class="px-4 py-1.5 rounded-full text-xs font-medium transition-all <?php echo $currentPage === 'orders' ? 'bg-[#1b5e3f] text-white shadow-xs' : 'text-[#a3b8ac] hover:text-white'; ?>"
        >
          Orders
        </a>
        <a
          href="customers.php"
          class="px-4 py-1.5 rounded-full text-xs font-medium transition-all <?php echo $currentPage === 'customers' ? 'bg-[#1b5e3f] text-white shadow-xs' : 'text-[#a3b8ac] hover:text-white'; ?>"
        >
          Customers CRM
        </a>
      </nav>

      <!-- Right Controls -->
      <div class="flex items-center gap-3">
        <a
          href="../products"
          target="_blank"
          class="text-xs text-[#86efac] hover:text-white flex items-center gap-1 hidden sm:flex"
        >
          <span>Storefront</span> ↗
        </a>
        <a
          href="auth.php?action=logout"
          class="h-8 px-3.5 rounded-full border border-[#2d8659]/60 bg-transparent text-[#e0deda] hover:bg-[#1b5e3f]/40 hover:text-white text-xs flex items-center gap-1.5 transition-all"
        >
          <span>Logout</span>
        </a>
      </div>
    </div>

    <!-- Mobile Sub-navigation -->
    <div class="flex md:hidden items-center gap-1 mt-3 pt-3 border-t border-[#1b5e3f]/40 overflow-x-auto no-scrollbar">
      <a href="dashboard.php" class="px-3 py-1 rounded-full text-[11px] whitespace-nowrap <?php echo $currentPage === 'dashboard' ? 'bg-[#1b5e3f] text-white' : 'text-[#a3b8ac]'; ?>">Dashboard</a>
      <a href="products.php" class="px-3 py-1 rounded-full text-[11px] whitespace-nowrap <?php echo in_array($currentPage, ['products', 'product-add', 'product-edit']) ? 'bg-[#1b5e3f] text-white' : 'text-[#a3b8ac]'; ?>">Products</a>
      <a href="orders.php" class="px-3 py-1 rounded-full text-[11px] whitespace-nowrap <?php echo $currentPage === 'orders' ? 'bg-[#1b5e3f] text-white' : 'text-[#a3b8ac]'; ?>">Orders</a>
      <a href="customers.php" class="px-3 py-1 rounded-full text-[11px] whitespace-nowrap <?php echo $currentPage === 'customers' ? 'bg-[#1b5e3f] text-white' : 'text-[#a3b8ac]'; ?>">Customers CRM</a>
    </div>
  </header>

  <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
