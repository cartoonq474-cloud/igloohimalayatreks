const fs = require('fs');

let css = fs.readFileSync('index.css', 'utf8');
const target = /\.logo-brand\s*\{[\s\S]*?\.logo-brand img\s*\{[\s\S]*?object-fit:\s*contain;\s*\}/;
const replacement = `.logo-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.4rem;
  color: var(--color-primary-navy);
  text-decoration: none;
}

.logo-brand img {
  height: 70px;
  width: auto;
  max-height: 100%;
  object-fit: contain;
  display: block;
  transition: transform var(--transition-fast, 0.2s ease), opacity var(--transition-fast, 0.2s ease);
}

.logo-brand:hover img {
  transform: scale(1.02);
  opacity: 0.95;
}

@media (max-width: 768px) {
  .logo-brand img {
    height: 56px !important;
  }
}`;

if (target.test(css)) {
  css = css.replace(target, replacement);
  fs.writeFileSync('index.css', css, 'utf8');
  console.log('Successfully updated index.css');
} else {
  console.error('Target not matched in index.css');
}
