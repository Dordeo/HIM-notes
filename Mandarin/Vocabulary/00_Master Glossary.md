---
Category:
---
All Vocabulary in your hands
```dataviewjs
const currentFolder = dv.current().file.path.split("/").slice(0, -1).join("/");
const folderQuery = `"${currentFolder}"`;
const targetSubject = dv.current().Category; 

const normalizeSubject = s => {
	if (Array.isArray(s)) return s;
	if (typeof s === "string") 
		return s.split(",").map(x => x.trim()); 
	return []; }; 

// Only filter by subject if Category is defined and not empty 
let pages = dv.pages(folderQuery) .where(p => p.file.name !== dv.current().file.name); 

if (targetSubject) {
	 pages = pages.where(p => normalizeSubject(p.subject).includes(targetSubject)); 
}

// pages.forEach(p => dv.span(p.file.name)); // Example output
// Step 1: Scan all fields used
const fields = ["Characters", "Pinyin", "Meaning", "Usage", "Example", "Pinyin (Example)", "Translation"];
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