module.exports = async (tp) => {
  // --- CONFIG ---
  const cacheNotePath = "Ω Non Existant Links/BrokenLinkCache.md";
  const reportNotePath = "Ω Non Existant Links/LinkReport.md";
  const cacheBlockStart = "%%CACHE_START%%";
  const cacheBlockEnd = "%%CACHE_END%%";
  const forceFullScan = false;

  const vault = app.vault;
  const workspace = app.workspace;

  // --- Load Cache ---
  const cacheFile = vault.getAbstractFileByPath(cacheNotePath);
  if (!cacheFile) {
    console.log(`⚠️ Cache note "${cacheNotePath}" not found.`);
    return;
  }

  let cacheRaw = await vault.read(cacheFile);
  let cacheText = cacheRaw.split(cacheBlockStart)[1]?.split(cacheBlockEnd)[0]?.trim();
  let cache = cacheText ? JSON.parse(cacheText) : {};

  // --- Prepare Scan ---
  const pages = app.plugins.plugins.dataview.api.pages();
  const now = Date.now();
  const brokenLinksMap = {};
  const updatedCache = {};
  const activeFile = workspace.getActiveFile()?.path;
  const isSelfExecuting = activeFile === cacheNotePath;

  // --- Scan Notes ---
  for (let page of pages) {
    const source = page.file.path;
    const lastModified = page.file.mtime;
    const lastChecked = cache[source]?.lastChecked || 0;

    if (!forceFullScan && lastModified <= lastChecked) {
      updatedCache[source] = { lastChecked };
      continue;
    }

    const outlinks = page.file.outlinks;
    let hasBrokenLinks = false;

    for (let link of outlinks) {
      const targetPath = link.path;
      const targetFile = vault.getAbstractFileByPath(targetPath);
      if (!targetFile) {
        hasBrokenLinks = true;
        if (!brokenLinksMap[targetPath]) brokenLinksMap[targetPath] = new Set();
        brokenLinksMap[targetPath].add(source);
      }
    }

    if (!hasBrokenLinks && source !== cacheNotePath) {
      updatedCache[source] = { lastChecked: now };
    }
  }

  // --- Build Report ---
  let output = `## 🧨 Broken Links with Source Notes\n\n`;
  for (let [missingPath, sourcesSet] of Object.entries(brokenLinksMap)) {
    const sources = Array.from(sourcesSet);
    output += `❌ [[${missingPath}]] is missing, linked from ${sources.length} note${sources.length > 1 ? "s" : ""}:\n`;
    output += sources.map(src => `- [[${src}]]`).join("\n") + "\n\n";
  }

  // --- Save Updated Cache ---
  if (!isSelfExecuting) {
    const cacheBlock = `${cacheBlockStart}\n${JSON.stringify(updatedCache, null, 2)}\n${cacheBlockEnd}`;
    let newContent;

    if (cacheRaw.includes(cacheBlockStart) && cacheRaw.includes(cacheBlockEnd)) {
      newContent = cacheRaw.replace(
        new RegExp(`${cacheBlockStart}[\\s\\S]*?${cacheBlockEnd}`),
        cacheBlock
      );
    } else {
      newContent = `${cacheRaw}\n\n${cacheBlock}`;
    }

    await vault.modify(cacheFile, newContent);
  } else {
    output += `⏸️ Skipping cache update to avoid refresh loop.\n`;
  }

  // --- Write Report to Target Note ---
  const reportFile = vault.getAbstractFileByPath(reportNotePath);
  if (!reportFile) {
    console.log(`⚠️ Report note "${reportNotePath}" not found.`);
    return;
  }

  await vault.modify(reportFile, output.trim());
};