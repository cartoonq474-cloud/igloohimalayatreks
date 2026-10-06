/**
 * Blog Articles Build Runner
 * Renders all 112 blog articles using the single canonical BlogArticleTemplate.
 */

const fs = require('fs');
const path = require('path');
const { renderBlogArticle } = require('../components/blog/BlogArticleTemplate');
const { articles } = require('../data/blog/articles');

const ROOT = path.resolve(__dirname, '..');

console.log(`🚀 Rendering ${articles.length} blog articles via canonical BlogArticleTemplate...`);

let count = 0;
for (let i = 0; i < articles.length; i++) {
  const article = articles[i];
  const prevArticle = articles[(i - 1 + articles.length) % articles.length];
  const nextArticle = articles[(i + 1) % articles.length];

  const slug = article.slug.replace(/^\//, '').replace(/\/+$/, '');
  const dirPath = path.join(ROOT, slug);
  const filePath = path.join(dirPath, 'index.html');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const html = renderBlogArticle(article, '../', prevArticle, nextArticle);
  fs.writeFileSync(filePath, html, 'utf8');
  count++;
}

console.log(`✔ Successfully rendered all ${count} blog articles to their canonical routes!`);
