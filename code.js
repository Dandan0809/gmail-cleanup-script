function trashOldMail() {
  const batchSize = 100;
  const cutoffStr = '2021/01/01';
  const query = `before:${cutoffStr} -is:starred -is:important`;

  const tz = Session.getScriptTimeZone();

  const startMs = Date.now();
  const maxRunMs = 5 * 60 * 1000;

  let totalTrashed = 0;
  let batchNum = 0;

  Logger.log(`Starting cleanup.\nQuery: ${query}`);

  while (true) {
    if (Date.now() - startMs > maxRunMs) {
      Logger.log(
        `Stopping to avoid timeout.\nTotal trashed this run: ${totalTrashed}`
      );
      break;
    }

    const threads = GmailApp.search(query, 0, batchSize);

    if (threads.length === 0) {
      Logger.log(
        `Done. No more threads match.\nTotal trashed this run: ${totalTrashed}`
      );
      break;
    }

    const firstDate = threads[0].getLastMessageDate();
    const lastDate = threads[threads.length - 1].getLastMessageDate();

    GmailApp.moveThreadsToTrash(threads);

    totalTrashed += threads.length;
    batchNum++;

    const firstStr = firstDate
      ? Utilities.formatDate(firstDate, tz, 'yyyy/MM/dd HH:mm')
      : 'unknown';

    const lastStr = lastDate
      ? Utilities.formatDate(lastDate, tz, 'yyyy/MM/dd HH:mm')
      : 'unknown';

    Logger.log(
      `Batch ${batchNum}: deleted ${threads.length} threads.\n` +
      `First mail date (batch order): ${firstStr}\n` +
      `Last mail date (batch order): ${lastStr}\n` +
      `Total this run: ${totalTrashed}`
    );
  }
}
