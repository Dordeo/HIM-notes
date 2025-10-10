---
tags:
  - Master_Note
---


```dataviewjs
const isTemplate = dv.current().tags && dv.current().tags.includes("Template");

if (!isTemplate) {
	const currentFolder = dv.current().file.path.split("/").slice(0, -1).join("/");
	const folderQuery = `"${currentFolder}"`
	
	dv.table(
	["Note", "Week", "Subject"],
	dv.pages(folderQuery).
	where(p => p.file.name != dv.current().file.name).
	map(p => [p.file.link, p.week, p.subject]))
}
```