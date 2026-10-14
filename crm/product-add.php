<?php
require_once __DIR__ . '/header.php';

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
    $badge = trim($_POST['badge'] ?? 'New Arrival');
    $stock = (int)($_POST['stock'] ?? 30);
    $botanicalName = trim($_POST['botanicalName'] ?? '');
    $description = trim($_POST['description'] ?? '');

    // Image handling: File Upload or Image URL
    $image = trim($_POST['imageUrl'] ?? '');

    if (!empty($_FILES['imageFile']['name'])) {
        $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9_\.-]/', '', $_FILES['imageFile']['name']);
        $targetPath = UPLOADS_DIR . '/' . $fileName;
        if (move_uploaded_file($_FILES['imageFile']['tmp_name'], $targetPath)) {
            $image = 'uploads/' . $fileName;
        }
    }

    if (empty($image)) {
        $image = '/assets/perfumes/Faceted Gold Perfume Bottle.png';
    }

    if ($name && $price > 0) {
        $products = get_products();
        $newId = 'prod-' . time();

        $newProduct = [
            'id' => $newId,
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
            'description' => $description,
            'sku' => 'ART-' . strtoupper(substr(md5($newId), 0, 6))
        ];

        array_unshift($products, $newProduct);
        save_products($products);

        set_flash("Product \"{$name}\" added to catalog successfully.");
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
        COMMERCE INVENTORY CONTROL
      </div>
      <h1 class="font-display text-3xl text-[#111111] font-normal mt-0.5">Add New Product</h1>
      <p class="text-xs text-[#666666] font-light">Enter all specifications. Product will immediately appear in catalog and CSV exports.</p>
    </div>
    <a href="products.php" class="text-xs text-[#1b5e3f] hover:underline font-medium">← Back to Catalog</a>
  </div>

  <?php if ($error): ?>
    <div class="p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs">
      <?php echo htmlspecialchars($error); ?>
    </div>
  <?php endif; ?>

  <div class="bg-white rounded-3xl border border-[#dcd6cb] p-6 sm:p-8 shadow-xs">
    <form action="product-add.php" method="POST" enctype="multipart/form-data" class="space-y-5">
      <!-- Name -->
      <div>
        <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
          Product Name *
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="e.g. Royal Oudh Extrait de Parfum"
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
            <option value="perfumes">Luxury Perfumes</option>
            <option value="essence-oils">Pure Essence Oils</option>
            <option value="car-perfumes">Car Diffusers</option>
            <option value="agarbatti">Sacred Agarbatti</option>
            <option value="soaps">Handcrafted Soaps</option>
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
            placeholder="e.g. Luxury, Floral, Woody, Oriental"
            value="Luxury"
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
            placeholder="4999"
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
            placeholder="Optional discount price"
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
            value="35"
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] font-mono focus:outline-none focus:border-[#1b5e3f]"
          />
        </div>
      </div>

      <!-- Image Upload or Preset URL -->
      <div>
        <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
          Product Image (File Upload or Image URL)
        </label>
        <div class="space-y-2">
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3 py-2 text-xs text-[#555555] file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-[#1b5e3f] file:text-white"
          />
          <div class="text-[10px] text-[#777777] uppercase font-semibold text-center my-1">OR ENTER IMAGE PATH / URL:</div>
          <input
            type="text"
            name="imageUrl"
            placeholder="/assets/perfumes/Faceted Gold Perfume Bottle.png or https://..."
            value="/assets/perfumes/Faceted Gold Perfume Bottle.png"
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
          />
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
            placeholder="e.g. Cardamom · Saffron · Sandalwood · Amber"
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
            value="4.9"
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
            value="50 ml"
            required
            placeholder="e.g. 50 ml Extrait, 15 ml, 200g"
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
            value="New Arrival"
            placeholder="e.g. Signature Reserve, Extrait"
            class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
          />
        </div>

        <div>
          <label class="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
            Botanical Specimen (Optional)
          </label>
          <input
            type="text"
            name="botanicalName"
            placeholder="e.g. Jasminum sambac"
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
          placeholder="Describe the aromatic narrative, extraction source with KEOMC, and sensory character..."
          class="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-4 py-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f] resize-none"
        >Handcrafted formulation distilled with rare botanicals in collaboration with KEOMC Botanical Labs.</textarea>
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
          Publish &amp; Save Product →
        </button>
      </div>
    </form>
  </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
