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

  // Canonical blog route: /blog/slug/
  const blogDirPath = path.join(ROOT, 'blog', slug);
  const blogFilePath = path.join(blogDirPath, 'index.html');
  if (!fs.existsSync(blogDirPath)) {
    fs.mkdirSync(blogDirPath, { recursive: true });
  }
  const htmlBlog = renderBlogArticle(article, '../../', prevArticle, nextArticle);
  fs.writeFileSync(blogFilePath, htmlBlog, 'utf8');

  // Ensure no duplicate root directory exists for this slug
  const legacyRootDir = path.join(ROOT, slug);
  if (fs.existsSync(legacyRootDir)) {
    fs.rmSync(legacyRootDir, { recursive: true, force: true });
  }

  count++;
}

console.log(`✔ Successfully rendered all ${count} blog articles to their canonical routes!`);
