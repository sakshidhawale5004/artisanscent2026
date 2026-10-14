<?php
require_once __DIR__ . '/header.php';

$id = $_GET['id'] ?? '';
$products = get_products();
$product = null;
$productIndex = -1;

foreach ($products as $idx => $p) {
    if (($p['id'] ?? '') === $id) {
        $product = $p;
        $productIndex = $idx;
        break;
    }
}

if (!$product) {
    set_flash('Product not found.', 'error');
    header('Location: products.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $category = trim($_POST['category'] ?? 'perfumes');
    $price = (float)($_POST['price'] ?? 0);
    $salePrice = !empty($_POST['salePrice']) ? (float)$_POST['salePrice'] : null;
    $rating = !empty($_POST['rating']) ? (float)$_POST['rating'] : 4.9;
    $notes = trim($_POST['notes'] ?? '');
    $family = trim($_POST['family'] ?? 'Luxury');
    $size = trim($_POST['size'] ?? '50 ml');
    $badge = trim($_POST['badge'] ?? 'Artisanal');
    $stock = (int)($_POST['stock'] ?? 30);
    $botanicalName = trim($_POST['botanicalName'] ?? '');
    $description = trim($_POST['description'] ?? '');

    $image = trim($_POST['imageUrl'] ?? $product['image']);

    if (!empty($_FILES['imageFile']['name'])) {
        $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9_\.-]/', '', $_FILES['imageFile']['name']);
        $targetPath = UPLOADS_DIR . '/' . $fileName;
        if (move_uploaded_file($_FILES['imageFile']['tmp_name'], $targetPath)) {
            $image = 'uploads/' . $fileName;
        }
    }

    if ($name && $price > 0) {
        $products[$productIndex] = array_merge($product, [
            'name' => $name,
            'category' => $category,
            'price' => $price,
            'salePrice' => $salePrice,
            'rating' => $rating,
            'image' => $image,
            'notes' => $notes,
            'family' => $family,
            'size' => $size,
            'badge' => $badge,
            'stock' => $stock,
            'botanicalName' => $botanicalName,
            'description' => $description
        ]);

        save_products($products);
        set_flash("Product \"{$name}\" updated successfully.");
        header('Location: products.php');
        exit;
    } else {
        $error = 'Please provide product name and valid price.';
    }
}
?>

<div class="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
  <div class="flex items-center justify-between">
    <div>
      <div class="text-[10px] uppercase tracking-[0.25em] text-[#1b5e3f] font-semibold">
        CATALOG SPECIFICATION EDITOR
      </div>
      <h1 class="font-display text-3xl text-[#111111] font-normal mt-0.5">Edit Product</h1>
      <p class="text-xs text-[#666666] font-light">Updating formulation details for "<?php echo htmlspecialchars($product['name']); ?>".</p>
    </div>
    <a href="products.php" class="text-xs text-[#1b5e3f] hover:underline font-medium">← Back to Catalog</a>
  </div>

  <?php if ($error): ?>
    <div class="p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs">
      <?php echo htmlspecialchars($error); ?>
    </div>
  <?php endif; ?>

  <div class="bg-white rounded-3xl border border-[#dcd6cb] p-6 sm:p-8 shadow-xs">
    <form action="product-edit.php?id=<?php echo urlencode($id); ?>" method="POST" enctype="multipart/form-data" class="space-y-5">
      <!-- Name -->
      <div>
        <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
          Product Name *
        </label>
        <input
          type="text"
          name="name"
          required
          value="<?php echo htmlspecialchars($product['name']); ?>"
          class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
        />
      </div>

      <!-- Category & Olfactory Family -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
            Category *
          </label>
          <select
            name="category"
            required
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f] cursor-pointer"
          >
            <?php
            $cats = [
                'perfumes' => 'Luxury Perfumes',
                'essence-oils' => 'Pure Essence Oils',
                'car-perfumes' => 'Car Diffusers',
                'agarbatti' => 'Sacred Agarbatti',
                'soaps' => 'Handcrafted Soaps'
            ];
            foreach ($cats as $cKey => $cLabel):
            ?>
              <option value="<?php echo $cKey; ?>" <?php echo ($product['category'] === $cKey) ? 'selected' : ''; ?>>
                <?php echo $cLabel; ?>
              </option>
            <?php endforeach; ?>
          </select>
        </div>

        <div>
          <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
            Olfactory Family *
          </label>
          <input
            type="text"
            name="family"
            required
            value="<?php echo htmlspecialchars($product['family'] ?? 'Luxury'); ?>"
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
          />
        </div>
      </div>

      <!-- Price & Stock -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
            Regular Price (₹) *
          </label>
          <input
            type="number"
            name="price"
            required
            min="1"
            value="<?php echo htmlspecialchars($product['price']); ?>"
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] font-mono focus:outline-none focus:border-[#1b5e3f]"
          />
        </div>

        <div>
          <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
            Sale Price (₹ Optional)
          </label>
          <input
            type="number"
            name="salePrice"
            min="1"
            value="<?php echo htmlspecialchars($product['salePrice'] ?? ''); ?>"
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] font-mono focus:outline-none focus:border-[#1b5e3f]"
          />
        </div>

        <div>
          <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
            Stock Units *
          </label>
          <input
            type="number"
            name="stock"
            required
            min="0"
            value="<?php echo htmlspecialchars($product['stock'] ?? 30); ?>"
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] font-mono focus:outline-none focus:border-[#1b5e3f]"
          />
        </div>
      </div>

      <!-- Image -->
      <div>
        <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
          Product Image (File Upload or Image URL)
        </label>
        <div class="flex items-center gap-3 mb-2">
          <img
            src="<?php echo htmlspecialchars($product['image']); ?>"
            alt=""
            class="w-12 h-12 rounded-lg border border-[#dcd6cb] object-contain p-1 bg-white"
            onerror="this.src='../assets/perfumes/Faceted Gold Perfume Bottle.png'"
          />
          <div class="flex-1 space-y-2">
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3 py-2 text-xs text-[#555555] file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-[#1b5e3f] file:text-white"
            />
            <input
              type="text"
              name="imageUrl"
              value="<?php echo htmlspecialchars($product['image']); ?>"
              class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
            />
          </div>
        </div>
      </div>

      <!-- Notes, Rating & Size -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="sm:col-span-2">
          <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
            Fragrance Notes Breakdown *
          </label>
          <input
            type="text"
            name="notes"
            required
            value="<?php echo htmlspecialchars($product['notes']); ?>"
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
          />
        </div>

        <div>
          <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
            Rating (1.0 to 5.0) *
          </label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            name="rating"
            value="<?php echo htmlspecialchars($product['rating'] ?? 4.9); ?>"
            required
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] font-mono focus:outline-none focus:border-[#1b5e3f]"
          />
        </div>
      </div>

      <!-- Size, Badge, Botanical Specimen -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
            Size / Volume *
          </label>
          <input
            type="text"
            name="size"
            value="<?php echo htmlspecialchars($product['size'] ?? '50 ml'); ?>"
            required
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
          />
        </div>

        <div>
          <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
            Badge Tag
          </label>
          <input
            type="text"
            name="badge"
            value="<?php echo htmlspecialchars($product['badge'] ?? 'Artisanal'); ?>"
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
          />
        </div>

        <div>
          <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
            Botanical Specimen
          </label>
          <input
            type="text"
            name="botanicalName"
            value="<?php echo htmlspecialchars($product['botanicalName'] ?? ''); ?>"
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
          />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
          Artisanal Narrative &amp; Description *
        </label>
        <textarea
          name="description"
          required
          rows="4"
          class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f] resize-none"
        ><?php echo htmlspecialchars($product['description']); ?></textarea>
      </div>

      <!-- Submit Buttons -->
      <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#eeebe5]">
        <a
          href="products.php"
          class="px-5 py-2.5 rounded-full border border-[#dcd6cb] text-xs text-[#555555] hover:bg-[#f2efe9] transition-all"
        >
          Cancel
        </a>
        <button
          type="submit"
          class="px-7 py-2.5 rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          Save &amp; Update Product →
        </button>
      </div>
    </form>
  </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
