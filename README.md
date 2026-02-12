# Gmail Cleanup Script (Google Apps Script)

A Google Apps Script utility that batch-deletes old Gmail threads using a customizable Gmail search query.

This script processes Gmail in safe batches, respects execution time limits, and logs progress during deletion.

---

## Features

- Deletes up to 100 threads per batch
- Uses standard Gmail search syntax
- Automatic time-based exit to avoid execution limits
- Logs:
  - First mail date (batch order)
  - Last mail date (batch order)
  - Total threads deleted per run
- Moves emails to **Trash** (not permanent delete)

---

## Default Query


This deletes threads:
- Older than January 1, 2021
- Not starred
- Not marked as important

You can modify the query string inside the script.

---

## How It Works

1. Searches Gmail using the defined query.
2. Retrieves up to 100 threads per batch.
3. Moves those threads to Trash.
4. Repeats until:
   - No threads match, or
   - Execution time reaches the safety limit.

The script respects Google Apps Script’s execution time limit (~6 minutes per run).

---

## Setup Instructions

### 1. Create a Google Apps Script Project

- Go to https://script.google.com
- Create a new project
- Paste the script into `Code.js`

### 2. Run Once to Authorize

- Select `trashOldMail`
- Click **Run**
- Grant Gmail permissions

### 3. (Optional) Add Time Trigger

To automate cleanup:

1. Click the ⏰ Triggers icon
2. Add Trigger
3. Choose:
   - Function: `trashOldMail`
   - Event Source: Time-driven
   - Interval: Every 5–15 minutes

This allows gradual cleanup without exceeding daily Gmail quotas.

---

## Safety Notes

- This script moves emails to **Trash**, not permanent deletion.
- You must manually empty Trash to permanently remove emails.
- Gmail enforces daily quotas. If you see:


---

## Limitations

- Google Apps Script execution limit (~6 minutes per run)
- Gmail daily service quotas apply
- Operates on Gmail threads (not individual messages)

---

## Disclaimer

Use with caution. Always verify your search query before running large deletions.
