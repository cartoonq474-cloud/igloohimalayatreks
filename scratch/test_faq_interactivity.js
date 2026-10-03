const fs = require('fs');

const jsCode = fs.readFileSync('js/blog-article.js', 'utf8');

// Simple DOM Mock
class Element {
  constructor(tag, id = '', className = '') {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this.className = className;
    this.classList = {
      _classes: new Set(className ? className.split(' ') : []),
      contains: (c) => this.classList._classes.has(c),
      add: (c) => this.classList._classes.add(c),
      remove: (c) => this.classList._classes.delete(c),
      toggle: (c, val) => {
        if (val !== undefined) {
          if (val) this.classList.add(c); else this.classList.remove(c);
          return val;
        }
        if (this.classList.contains(c)) { this.classList.remove(c); return false; }
        else { this.classList.add(c); return true; }
      }
    };
    this.attributes = {};
    this.children = [];
    this.listeners = {};
    this.innerText = '';
    this.textContent = '';
    this.parentElement = null;
  }
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k]; }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  dispatch(event) {
    if (this.listeners[event]) this.listeners[event].forEach(fn => fn({ preventDefault: () => {} }));
  }
  closest(sel) {
    let curr = this;
    while (curr) {
      if (sel.startsWith('.') && curr.classList.contains(sel.slice(1))) return curr;
      curr = curr.parentElement;
    }
    return null;
  }
  querySelector(sel) {
    for (let c of this.children) {
      if (sel.startsWith('.') && c.classList.contains(sel.slice(1))) return c;
      const found = c.querySelector(sel);
      if (found) return found;
    }
    return null;
  }
  querySelectorAll(sel) {
    let res = [];
    for (let c of this.children) {
      if (sel.startsWith('.') && c.classList.contains(sel.slice(1))) res.push(c);
      res = res.concat(c.querySelectorAll(sel));
    }
    return res;
  }
}

// Build mock FAQ DOM
const categoryBtns = [
  new Element('button', '', 'faq-category-btn active'),
  new Element('button', '', 'faq-category-btn')
];
categoryBtns[0].setAttribute('data-category', 'general');
categoryBtns[0].innerText = 'General Comparison';
categoryBtns[1].setAttribute('data-category', 'difficulty');
categoryBtns[1].innerText = 'Difficulty & Fitness';

const categoryPanels = [
  new Element('div', 'faq-cat-general', 'faq-category-content active'),
  new Element('div', 'faq-cat-difficulty', 'faq-category-content')
];

// Add FAQ items to panels
for (let p of categoryPanels) {
  for (let i = 0; i < 2; i++) {
    const item = new Element('div', '', 'faq-item');
    const q = new Element('div', '', 'faq-item-question');
    const ans = new Element('div', '', 'faq-item-answer');
    q.parentElement = item;
    ans.parentElement = item;
    item.children.push(q, ans);
    item.parentElement = p;
    p.children.push(item);
  }
}

const currentCategoryTitle = new Element('h3', 'faq-current-category-title');
const expandAllBtn = new Element('button', 'faq-expand-all-btn');
expandAllBtn.textContent = 'Expand All';

const documentMock = {
  readyState: 'complete',
  addEventListener: () => {},
  getElementById: (id) => {
    if (id === 'faq-current-category-title') return currentCategoryTitle;
    if (id === 'faq-expand-all-btn') return expandAllBtn;
    return null;
  },
  querySelectorAll: (sel) => {
    if (sel === '.faq-category-btn') return categoryBtns;
    if (sel === '.faq-category-content') return categoryPanels;
    if (sel === '.faq-item-question') {
      const qs = [];
      categoryPanels.forEach(p => {
        p.querySelectorAll('.faq-item').forEach(it => {
          const q = it.querySelector('.faq-item-question');
          if (q) qs.push(q);
        });
      });
      return qs;
    }
    return [];
  },
  querySelector: (sel) => {
    if (sel === '.faq-category-content.active') {
      return categoryPanels.find(p => p.classList.contains('active'));
    }
    return null;
  }
};

// Run the script in sandbox
const fn = new Function('document', 'window', jsCode);
fn(documentMock, { location: { href: 'http://localhost/' }, addEventListener: () => {} });

// TEST 1: Initial state
console.log('--- TEST 1: Initial State ---');
console.log('Active Category Panel:', categoryPanels.find(p => p.classList.contains('active')).id);

// TEST 2: Click Category 2 (difficulty)
console.log('\n--- TEST 2: Click Difficulty Tab ---');
categoryBtns[1].dispatch('click');
console.log('Category Btn 0 active?', categoryBtns[0].classList.contains('active'));
console.log('Category Btn 1 active?', categoryBtns[1].classList.contains('active'));
console.log('Title text:', currentCategoryTitle.textContent);
console.log('Active Category Panel:', categoryPanels.find(p => p.classList.contains('active')).id);
console.log('PASS: Tab switching works!');

// TEST 3: Toggle FAQ Item in active panel
console.log('\n--- TEST 3: Toggle Question Item ---');
const activePanel = categoryPanels[1];
const firstQ = activePanel.querySelectorAll('.faq-item')[0].querySelector('.faq-item-question');
const firstItem = activePanel.querySelectorAll('.faq-item')[0];
console.log('Item before click active?', firstItem.classList.contains('active'));
firstQ.dispatch('click');
console.log('Item after click active?', firstItem.classList.contains('active'));
console.log('aria-expanded:', firstQ.getAttribute('aria-expanded'));
firstQ.dispatch('click');
console.log('Item after 2nd click active?', firstItem.classList.contains('active'));
console.log('aria-expanded:', firstQ.getAttribute('aria-expanded'));
console.log('PASS: Accordion item toggle works!');

// TEST 4: Expand All in active panel
console.log('\n--- TEST 4: Expand All / Collapse All ---');
expandAllBtn.dispatch('click');
console.log('Expand All Button text:', expandAllBtn.textContent);
const allActive = activePanel.querySelectorAll('.faq-item').every(it => it.classList.contains('active'));
console.log('All items active?', allActive);
expandAllBtn.dispatch('click');
console.log('Expand All Button text after 2nd click:', expandAllBtn.textContent);
const allCollapsed = activePanel.querySelectorAll('.faq-item').every(it => !it.classList.contains('active'));
console.log('All items collapsed?', allCollapsed);
console.log('PASS: Expand All / Collapse All works!');
