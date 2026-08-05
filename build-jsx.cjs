const fs = require('fs');

let html = fs.readFileSync('C:/Users/USER/Downloads/web-posyandu-updated (3)/project/extracted.html', 'utf-8');

// Basic HTML to JSX conversions
html = html.replace(/class="/g, 'className="');
html = html.replace(/<input([^>]*?)>/g, (match, p1) => {
  if(p1.trim().endsWith('/')) return match;
  return `<input${p1} />`;
});
html = html.replace(/<img([^>]*?)>/g, (match, p1) => {
  if(p1.trim().endsWith('/')) return match;
  return `<img${p1} />`;
});
html = html.replace(/<hr([^>]*?)>/g, (match, p1) => {
  if(p1.trim().endsWith('/')) return match;
  return `<hr${p1} />`;
});
html = html.replace(/<br([^>]*?)>/g, (match, p1) => {
  if(p1.trim().endsWith('/')) return match;
  return `<br${p1} />`;
});
html = html.replace(/<use href="#([^"]+)"\/>/g, '<use href="#$1" />');

// Style conversions
html = html.replace(/style="margin-bottom:16px;"/g, 'style={{ marginBottom: "16px" }}');
html = html.replace(/style="margin-top:16px;"/g, 'style={{ marginTop: "16px" }}');
html = html.replace(/style="margin-top:16px;width:100%;justify-content:center;"/g, 'style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}');
html = html.replace(/style="display:none;"/g, 'style={{ display: "none" }}');
html = html.replace(/style="color:var\(--cyan-deep\);"/g, 'style={{ color: "var(--cyan-deep)" }}');
html = html.replace(/style="color:var\(--magenta-deep\);"/g, 'style={{ color: "var(--magenta-deep)" }}');
html = html.replace(/style="color:var\(--green-deep\);"/g, 'style={{ color: "var(--green-deep)" }}');
html = html.replace(/style="color:var\(--orange-deep\);"/g, 'style={{ color: "var(--orange-deep)" }}');
html = html.replace(/style="color:var\(--violet-deep\);"/g, 'style={{ color: "var(--violet-deep)" }}');
html = html.replace(/style="color:var\(--rose-deep\);"/g, 'style={{ color: "var(--rose-deep)" }}');
html = html.replace(/style="display:flex;gap:8px;flex-wrap:wrap;"/g, 'style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}');
html = html.replace(/style="margin-top:4px;"/g, 'style={{ marginTop: "4px" }}');

// Tab logic
html = html.replace(/<div id="bidang-1" style=\{\{ display: "none" \}\}>/g, '{tab === 1 && (<div id="bidang-1">');
html = html.replace(/<div id="bidang-2" style=\{\{ display: "none" \}\}>/g, '{tab === 2 && (<div id="bidang-2">');
html = html.replace(/<div id="bidang-3" style=\{\{ display: "none" \}\}>/g, '{tab === 3 && (<div id="bidang-3">');
html = html.replace(/<div id="bidang-4" style=\{\{ display: "none" \}\}>/g, '{tab === 4 && (<div id="bidang-4">');

// Add closing braces for conditional rendering
// We know that extracted.html has 4 tabs, each ends with a </div> for the bidang div.
// The structure is: <div id="bidang-X" ...> ... </div> \n\n <div id="bidang-Y" ...>
let segments = html.split(/\{tab === \d && \(/);
let finalJSX = segments[0];
for (let i = 1; i <= 4; i++) {
  // Find the last </div> before the end of the segment and replace it with </div>)}
  let seg = segments[i];
  let lastDivIndex = seg.lastIndexOf('</div>');
  if (lastDivIndex !== -1) {
    seg = seg.substring(0, lastDivIndex) + '</div>\n      )}' + seg.substring(lastDivIndex + 6);
  }
  finalJSX += `{tab === ${i} && (` + seg;
}


// Replace the placeholder in PengaduanView.jsx
let jsxFile = fs.readFileSync('C:/Users/USER/Downloads/web-posyandu-updated (3)/project/src/components/dashboard/PengaduanView.jsx', 'utf-8');

const startTarget = '{/* Adding a placeholder for other tabs to save space and time, but keeping the core structure */}';
const startIdx = jsxFile.indexOf(startTarget);
const endIdx = jsxFile.lastIndexOf('</>');

if (startIdx !== -1 && endIdx !== -1) {
  const newJsxFile = jsxFile.substring(0, startIdx) + finalJSX + '\n      ' + jsxFile.substring(endIdx);
  fs.writeFileSync('C:/Users/USER/Downloads/web-posyandu-updated (3)/project/src/components/dashboard/PengaduanView.jsx', newJsxFile);
  console.log('Successfully updated PengaduanView.jsx');
} else {
  console.error('Could not find injection point');
}
