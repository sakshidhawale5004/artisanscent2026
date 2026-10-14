<?php
require_once __DIR__ . '/header.php';

$orders = get_orders();

// Status update request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['order_id'], $_POST['status'])) {
    $orderId = $_POST['order_id'];
    $newStatus = $_POST['status'];

    foreach ($orders as &$o) {
        if (($o['id'] ?? '') === $orderId) {
            $o['status'] = $newStatus;
            break;
        }
    }
    save_orders($orders);
    set_flash("Order {$orderId} status changed to {$newStatus}.");
    header('Location: orders.php');
    exit;
}

$statusFilter = $_GET['status'] ?? 'all';
$filteredOrders = array_filter($orders, function($o) use ($statusFilter) {
    if ($statusFilter !== 'all' && ($o['status'] ?? '') !== $statusFilter) {
        return false;
    }
    return true;
});
?>

<div class="space-y-6 animate-in fade-in duration-200">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="font-display text-3xl text-[#111111] font-normal">Orders &amp; Dispatch</h1>
      <p class="text-xs text-[#666666] mt-0.5 font-light">
        Live fulfillment tracking, order status updates, and logistics telemetry.
      </p>
    </div>

    <a
      href="export.php?type=orders"
      class="inline-flex items-center gap-1.5 rounded-full border border-[#dcd6cb] bg-white hover:bg-[#f2efe9] text-[#222222] h-9 px-4 text-xs font-medium transition-all self-start sm:self-auto"
    >
      <span>↓ Export Orders CSV</span>
    </a>
  </div>

  <!-- Status Filters -->
  <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
    <span class="text-[11px] text-[#777777] uppercase tracking-wider font-semibold mr-1">Filter Status:</span>
    <?php
    $statuses = ['all' => 'All Orders', 'Pending' => 'Pending', 'Processing' => 'Processing', 'Shipped' => 'Shipped', 'Completed' => 'Completed'];
    foreach ($statuses as $sKey => $sLabel):
        $active = ($statusFilter === $sKey);
    ?>
      <a
        href="orders.php?status=<?php echo urlencode($sKey); ?>"
        class="px-3 py-1 rounded-full text-xs font-medium transition-all <?php echo $active ? 'bg-[#1b5e3f] text-white' : 'bg-white border border-[#dcd6cb] text-[#555555] hover:bg-[#f2efe9]'; ?>"
      >
        <?php echo $sLabel; ?>
      </a>
    <?php endforeach; ?>
  </div>

  <!-- Orders Table -->
  <div class="rounded-2xl bg-white border border-[#e4ded5] shadow-xs overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-[#fcfbf9] border-b border-[#eeebe5] text-[#777777] uppercase tracking-wider text-[10px]">
          <tr>
            <th class="py-3 px-4">Order ID</th>
            <th class="py-3 px-4">Customer Details</th>
            <th class="py-3 px-4">Formulations Ordered</th>
            <th class="py-3 px-4">Subtotal</th>
            <th class="py-3 px-4">Fulfillment Status</th>
            <th class="py-3 px-4">Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#f2efe9]">
          <?php if (empty($filteredOrders)): ?>
            <tr>
              <td colspan="6" class="py-12 text-center text-[#777777]">
                No orders found under this filter.
              </td>
            </tr>
          <?php else: ?>
            <?php foreach ($filteredOrders as $o): ?>
              <tr class="hover:bg-[#faf9f7] transition-colors">
                <td class="py-3.5 px-4 font-mono font-bold text-[#111111]"><?php echo htmlspecialchars($o['id']); ?></td>
                <td class="py-3.5 px-4">
                  <div class="font-medium text-[#111111]"><?php echo htmlspecialchars($o['customer']); ?></div>
                  <div class="text-[11px] text-[#777777]"><?php echo htmlspecialchars($o['email']); ?></div>
                </td>
                <td class="py-3.5 px-4 text-[#444444] max-w-sm"><?php echo htmlspecialchars($o['items']); ?></td>
                <td class="py-3.5 px-4 font-mono font-semibold text-[#111111]">
                  <?php echo format_inr($o['total']); ?>
                </td>
                <td class="py-3.5 px-4">
                  <form action="orders.php" method="POST" class="inline">
                    <input type="hidden" name="order_id" value="<?php echo htmlspecialchars($o['id']); ?>" />
                    <select
                      name="status"
                      onchange="this.form.submit()"
                      class="bg-[#f5f4f0] border border-[#dcd6cb] rounded-lg px-2.5 py-1 text-xs cursor-pointer focus:outline-none focus:border-[#1b5e3f]"
                    >
                      <option value="Pending" <?php echo ($o['status'] === 'Pending') ? 'selected' : ''; ?>>Pending</option>
                      <option value="Processing" <?php echo ($o['status'] === 'Processing') ? 'selected' : ''; ?>>Processing</option>
                      <option value="Shipped" <?php echo ($o['status'] === 'Shipped') ? 'selected' : ''; ?>>Shipped</option>
                      <option value="Completed" <?php echo ($o['status'] === 'Completed') ? 'selected' : ''; ?>>Completed</option>
                    </select>
                  </form>
                </td>
                <td class="py-3.5 px-4 text-[#777777]"><?php echo htmlspecialchars($o['date']); ?></td>
              </tr>
            <?php endforeach; ?>
          <?php endif; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
