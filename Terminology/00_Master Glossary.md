---
subject: Principles of Accounting
---

All terminologies based on the subject put in the subject field


```dataviewjs
const currentFolder = dv.current().file.path.split("/").slice(0, -1).join("/");
const folderQuery = `"${currentFolder}"`;
const targetSubject = dv.current().subject;

const pages = dv.pages(folderQuery)
  .where(p => p.file.name != dv.current().file.name)
  .where(p => Array.isArray(p.subject) ? p.subject.includes(targetSubject) : p.subject === targetSubject);

// Step 1: Scan all fields used
const fields = ["term", "definition", "use", "formula", "source_note"];
const activeFields = fields.filter(field =>
  pages.some(p => p[field] !== undefined && p[field] !== null && p[field] !== "")
);

// Step 2: Build headers (no Note column)
const headers = activeFields.map(f => f.charAt(0).toUpperCase() + f.slice(1));

// Step 3: Build rows
const rows = pages.map(p => {
  return activeFields.map(field => p[field] ?? "");
});

// Step 4: Render table
dv.table(headers, rows);
```
