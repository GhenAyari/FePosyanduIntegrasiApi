const fs = require('fs');
const html = fs.readFileSync('C:/Users/USER/.gemini/antigravity/brain/f1fde4b8-8045-4da7-88f0-cb88b35c8f64/.user_uploaded/media_1785836468278.html', 'utf-8');

const extractBidang = (id) => {
  const startIndex = html.indexOf(`id="${id}"`);
  if (startIndex === -1) return '';
  const divStart = html.lastIndexOf('<div', startIndex);
  let depth = 1;
  let curr = startIndex + 1;
  let endIndex = -1;
  
  while (depth > 0 && curr < html.length) {
    const nextOpen = html.indexOf('<div', curr);
    const nextClose = html.indexOf('</div', curr);
    
    if (nextClose === -1) break;
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      curr = nextOpen + 4;
    } else {
      depth--;
      curr = nextClose + 5;
      if (depth === 0) endIndex = curr + 1;
    }
  }
  
  return html.substring(divStart, endIndex);
};

const result = extractBidang('bidang-1') + '\n\n' + extractBidang('bidang-2') + '\n\n' + extractBidang('bidang-3') + '\n\n' + extractBidang('bidang-4');
fs.writeFileSync('C:/Users/USER/Downloads/web-posyandu-updated (3)/project/extracted.html', result);
