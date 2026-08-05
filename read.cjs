const fs = require('fs');
const html = fs.readFileSync('C:/Users/USER/.gemini/antigravity/brain/f1fde4b8-8045-4da7-88f0-cb88b35c8f64/.user_uploaded/media_1785836468278.html', 'utf-8');
const start = html.indexOf('class="article-card');
console.log(html.substring(start, start + 2000));
