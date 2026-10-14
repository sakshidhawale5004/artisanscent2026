<?php
require_once __DIR__ . '/config.php';

// If already authenticated, redirect to dashboard
if (!empty($_SESSION['artisanscent_admin_logged'])) {
    header('Location: dashboard.php');
    exit;
}

$error = $_GET['error'] ?? '';
$msg = $_GET['msg'] ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Staff Admin Login | Artisan Scent CRM</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Manrope', sans-serif; }
    .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
  </style>
</head>
<body class="bg-[#05170e] text-[#e0e7e3] min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
  
  <!-- Subtle Ambient Glows -->
  <div class="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#1b5e3f]/25 blur-[120px] rounded-full pointer-events-none"></div>
  <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#d4af37]/15 blur-[100px] rounded-full pointer-events-none"></div>

  <div class="w-full max-w-md bg-[#0a2316]/95 border border-[#2d8659]/50 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl relative z-10">
    <div class="text-center mb-8">
      <div class="w-16 h-16 rounded-full bg-[#1b5e3f] border-2 border-[#d4af37] flex items-center justify-center mx-auto mb-4 shadow-lg text-2xl text-[#86efac]">
        🔒
      </div>
      <div class="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-1">
        ARTISAN SCENT HAUTE PARFUMERIE
      </div>
      <h1 class="font-display text-2xl sm:text-3xl text-white font-normal">
        Commerce &amp; CRM Admin Panel
      </h1>
      <p class="text-xs text-[#a3b8ac] font-light mt-2 leading-relaxed">
        Staff portal for catalog administration, inventory control, and customer export operations.
      </p>
    </div>

    <?php if ($error === 'invalid_credentials'): ?>
      <div class="mb-5 p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
        <span>⚠ Invalid username or password. Please verify credentials.</span>
      </div>
    <?php elseif ($msg === 'logged_out'): ?>
      <div class="mb-5 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
        <span>✓ Successfully logged out from session.</span>
      </div>
    <?php elseif ($msg === 'auth_required'): ?>
      <div class="mb-5 p-3 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2">
        <span>ℹ Administrator authentication required to access this portal.</span>
      </div>
    <?php endif; ?>

    <form action="auth.php" method="POST" class="space-y-4">
      <div>
        <label class="block text-[11px] uppercase tracking-wider text-[#9fb3a6] font-semibold mb-1.5">
          Admin Username
        </label>
        <input
          type="text"
          name="username"
          required
          placeholder="Enter admin username"
          class="w-full bg-[#05170e] border border-[#2d8659]/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-[#557060] focus:outline-none focus:border-[#d4af37] transition-colors"
        />
      </div>

      <div>
        <label class="block text-[11px] uppercase tracking-wider text-[#9fb3a6] font-semibold mb-1.5">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          placeholder="••••••••••••"
          class="w-full bg-[#05170e] border border-[#2d8659]/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-[#557060] focus:outline-none focus:border-[#d4af37] transition-colors"
        />
      </div>

      <button
        type="submit"
        class="w-full h-11 rounded-full bg-[#1b5e3f] hover:bg-[#237750] text-white border border-[#2d8659] font-medium tracking-wide shadow-lg text-xs mt-2 transition-all cursor-pointer"
      >
        Authenticate &amp; Open Dashboard →
      </button>
    </form>

    <div class="mt-6 text-center">
      <a href="../" class="text-xs text-[#86efac] hover:underline">
        ← Return to Main Storefront
      </a>
    </div>
  </div>

</body>
</html>
