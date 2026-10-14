<?php
require_once __DIR__ . '/header.php';

$inquiries = get_inquiries();

// Handle status update or delete
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $inquiryId = $_POST['id'] ?? '';

    if ($action === 'update_status' && $inquiryId) {
        $newStatus = $_POST['status'] ?? 'New';
        foreach ($inquiries as &$inq) {
            if ($inq['id'] === $inquiryId) {
                $inq['status'] = $newStatus;
                break;
            }
        }
        save_inquiries($inquiries);
        set_flash("Inquiry $inquiryId status updated to $newStatus.");
        header('Location: inquiries.php');
        exit;
    }

    if ($action === 'delete' && $inquiryId) {
        $inquiries = array_values(array_filter($inquiries, fn($inq) => $inq['id'] !== $inquiryId));
        save_inquiries($inquiries);
        set_flash("Inquiry $inquiryId removed.");
        header('Location: inquiries.php');
        exit;
    }
}

$search = trim($_GET['search'] ?? '');
$filtered = array_filter($inquiries, function($inq) use ($search) {
    if ($search !== '') {
        $q = strtolower($search);
        return strpos(strtolower($inq['name'] ?? ''), $q) !== false ||
               strpos(strtolower($inq['email'] ?? ''), $q) !== false ||
               strpos(strtolower($inq['phone'] ?? ''), $q) !== false ||
               strpos(strtolower($inq['interest'] ?? ''), $q) !== false ||
               strpos(strtolower($inq['message'] ?? ''), $q) !== false;
    }
    return true;
});
?>

<div class="space-y-6 animate-in fade-in duration-200">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="font-display text-3xl text-[#111111] font-normal">Contact Inquiries &amp; Leads</h1>
      <p class="text-xs text-[#666666] mt-0.5 font-light">
        Submissions received from the storefront Contact &amp; Concierge form.
      </p>
    </div>

    <div class="flex items-center gap-3">
      <a
        href="export.php?type=inquiries"
        class="inline-flex items-center gap-1.5 rounded-full border border-[#dcd6cb] bg-white hover:bg-[#f2efe9] text-[#222222] h-9 px-4 text-xs font-medium transition-all"
      >
        <span>↓ Export Inquiries CSV</span>
      </a>
      <div class="text-xs text-[#777777]">
        Total: <span class="font-semibold text-[#1b5e3f]"><?php echo count($filtered); ?></span> inquiries
      </div>
    </div>
  </div>

  <!-- Search Bar -->
  <div class="p-4 rounded-2xl bg-white border border-[#e4ded5] shadow-xs flex items-center justify-between gap-3">
    <form method="GET" action="inquiries.php" class="relative flex-1 max-w-sm">
      <input
        type="text"
        name="search"
        value="<?php echo htmlspecialchars($search); ?>"
        placeholder="Search inquiries by name, email, interest..."
        class="w-full pl-3 pr-8 py-1.5 bg-[#fbfaf8] border border-[#dcd6cb] rounded-lg text-xs focus:outline-none focus:border-[#1b5e3f]"
      />
      <?php if ($search): ?>
        <a href="inquiries.php" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111] text-xs">✕</a>
      <?php endif; ?>
    </form>
    <div class="text-xs text-[#777777]">
      <?php echo count($inquiries); ?> Total Records
    </div>
  </div>

  <!-- Inquiries Table -->
  <div class="rounded-2xl bg-white border border-[#e4ded5] shadow-xs overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-[#fcfbf9] border-b border-[#eeebe5] text-[#777777] uppercase tracking-wider text-[10px]">
          <tr>
            <th class="py-3 px-4">Inquiry Ref</th>
            <th class="py-3 px-4">Contact Details</th>
            <th class="py-3 px-4">Interest Area</th>
            <th class="py-3 px-4">Message</th>
            <th class="py-3 px-4">Received Date</th>
            <th class="py-3 px-4">Status</th>
            <th class="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#f2efe9]">
          <?php if (empty($filtered)): ?>
            <tr>
              <td colspan="7" class="py-12 text-center text-[#777777]">
                No contact inquiries recorded yet. When a visitor submits the contact form, it will appear here instantly.
              </td>
            </tr>
          <?php else: ?>
            <?php foreach ($filtered as $inq): ?>
              <tr class="hover:bg-[#faf9f7] transition-colors">
                <td class="py-3.5 px-4 font-mono font-medium text-[#111111]">
                  <?php echo htmlspecialchars($inq['id'] ?? 'INQ-NEW'); ?>
                </td>
                <td class="py-3.5 px-4">
                  <div class="font-semibold text-[#111111]"><?php echo htmlspecialchars($inq['name'] ?? ''); ?></div>
                  <div class="text-[#555555]"><?php echo htmlspecialchars($inq['email'] ?? ''); ?></div>
                  <?php if (!empty($inq['phone'])): ?>
                    <div class="text-[10px] text-[#777777]"><?php echo htmlspecialchars($inq['phone']); ?></div>
                  <?php endif; ?>
                </td>
                <td class="py-3.5 px-4">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <?php echo htmlspecialchars($inq['interest'] ?? 'General Inquiry'); ?>
                  </span>
                </td>
                <td class="py-3.5 px-4 max-w-xs text-[#444444] font-light leading-relaxed">
                  <?php echo nl2br(htmlspecialchars($inq['message'] ?? '')); ?>
                </td>
                <td class="py-3.5 px-4 text-[#777777] font-mono text-[11px]">
                  <?php echo htmlspecialchars($inq['date'] ?? ''); ?>
                </td>
                <td class="py-3.5 px-4">
                  <form method="POST" action="inquiries.php" class="inline">
                    <input type="hidden" name="action" value="update_status" />
                    <input type="hidden" name="id" value="<?php echo htmlspecialchars($inq['id']); ?>" />
                    <select
                      name="status"
                      onchange="this.form.submit()"
                      class="px-2 py-1 rounded-md text-[11px] font-medium border <?php
                        echo ($inq['status'] ?? 'New') === 'New' ? 'bg-amber-50 text-amber-900 border-amber-300' :
                            (($inq['status'] ?? '') === 'Contacted' ? 'bg-blue-50 text-blue-900 border-blue-300' :
                            'bg-emerald-50 text-emerald-900 border-emerald-300');
                      ?>"
                    >
                      <option value="New" <?php echo ($inq['status'] ?? 'New') === 'New' ? 'selected' : ''; ?>>New</option>
                      <option value="Contacted" <?php echo ($inq['status'] ?? '') === 'Contacted' ? 'selected' : ''; ?>>Contacted</option>
                      <option value="Resolved" <?php echo ($inq['status'] ?? '') === 'Resolved' ? 'selected' : ''; ?>>Resolved</option>
                    </select>
                  </form>
                </td>
                <td class="py-3.5 px-4 text-right space-x-2">
                  <a
                    href="mailto:<?php echo urlencode($inq['email'] ?? ''); ?>?subject=Re:%20Artisan%20Scent%20Inquiry%20(<?php echo urlencode($inq['id'] ?? ''); ?>)"
                    class="text-xs text-[#1b5e3f] hover:underline font-medium"
                  >
                    Reply Email →
                  </a>
                  <form method="POST" action="inquiries.php" class="inline" onsubmit="return confirm('Delete this inquiry?');">
                    <input type="hidden" name="action" value="delete" />
                    <input type="hidden" name="id" value="<?php echo htmlspecialchars($inq['id']); ?>" />
                    <button type="submit" class="text-xs text-red-600 hover:text-red-800 ml-2">Delete</button>
                  </form>
                </td>
              </tr>
            <?php endforeach; ?>
          <?php endif; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
