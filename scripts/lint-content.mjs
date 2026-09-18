#!/usr/bin/env node
/**
 * 内容 lint：仓库写作约定，不是 `astro check`（那是 TypeScript）。
 *
 * Astro 允许任意 glob 目录、也允许年/月嵌套。这里额外收紧：
 * 对外文章只住在 content/posts/YYYY-MM-DD-slug.md（草稿在 drafts/）。
 *
 *   npm run lint
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const postsDir = join(root, 'content/posts');
const DATE_FILE = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;
const DATE_VALUE = /^\d{4}-\d{2}-\d{2}$/;
const YEAR_DIR = /^\d{4}$/;
const ALLOWED_POST_DIRS = new Set(['drafts', 'images']);
const PUNCT_IN_SLUG = /[“”"‘’'«»《》[\]（）()【】]/g;

const errors = [];
const warnings = [];
const categoriesFiles = [];
const punctFiles = [];

function error(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    if (name.name === '.DS_Store' || name.name.startsWith('.')) continue;
    const full = join(dir, name.name);
    if (name.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function rel(path) {
  return relative(root, path).replaceAll('\\', '/');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return null;
  const yaml = match[1];
  const data = {};
  const lines = yaml.split(/\r?\n/);
  let currentList = null;

  for (const line of lines) {
    if (/^\s*#/.test(line) || line.trim() === '') continue;
    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && currentList) {
      data[currentList].push(unquote(listItem[1].trim()));
      continue;
    }
    currentList = null;
    const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    const value = kv[2].trim();
    if (value === '' || value === '[]') {
      if (value === '[]') data[key] = [];
      else {
        data[key] = [];
        currentList = key;
      }
      continue;
    }
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => unquote(item.trim()))
        .filter(Boolean);
      continue;
    }
    if (value === 'true' || value === 'false') {
      data[key] = value === 'true';
      continue;
    }
    data[key] = unquote(value);
  }

  return data;
}

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function fileSlug(filename) {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '');
}

function urlSlug(slug) {
  return slug.replace(PUNCT_IN_SLUG, '').replace(/\s+/g, '-');
}

function isRealDate(value) {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return false;
  const date = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return (
    date.getUTCFullYear() === Number(m[1]) &&
    date.getUTCMonth() + 1 === Number(m[2]) &&
    date.getUTCDate() === Number(m[3])
  );
}

function read(path) {
  return readFileSync(path, 'utf8');
}

function checkAstroWiring() {
  const configPath = join(root, 'src/content.config.ts');
  const astroConfigPath = join(root, 'astro.config.mjs');
  const postsLib = join(root, 'src/lib/posts.ts');
  const postPage = join(root, 'src/pages/posts/[...id].astro');

  if (!existsSync(astroConfigPath)) {
    error('缺少 astro.config.mjs');
  } else {
    const astroConfig = read(astroConfigPath);
    if (!/^\s*site:\s*['"]https?:\/\//m.test(astroConfig)) {
      error('astro.config.mjs 需要 site（RSS / sitemap / canonical 依赖它）');
    }
  }

  if (!existsSync(configPath)) {
    error('缺少 src/content.config.ts（Astro Content Layer 入口）');
    return;
  }

  const config = read(configPath);
  if (!config.includes('defineCollection')) {
    error('src/content.config.ts 应使用 defineCollection');
  }
  if (!/from ['"]astro\/loaders['"]/.test(config) || !config.includes('glob(')) {
    error('src/content.config.ts 应使用 glob loader（Astro Content Layer）');
  }
  if (!/base:\s*['"]\.\/content\/posts['"]/.test(config)) {
    error('集合 base 必须是 ./content/posts（Writing-Studio 不得进构建）');
  }
  if (!/pattern:\s*['"]\*\*\/\*\.md['"]/.test(config)) {
    error("glob pattern 应为 '**/*.md'");
  }
  if (!/export const collections/.test(config)) {
    error('src/content.config.ts 必须 export const collections');
  }
  if (!/title:\s*z\.string\(\)/.test(config) || !/date:\s*z\.coerce\.date\(\)/.test(config)) {
    error('collection schema 至少要有 title、date');
  }

  if (!existsSync(postsLib)) {
    error('缺少 src/lib/posts.ts');
  } else {
    const lib = read(postsLib);
    if (!lib.includes('getCollection')) {
      error('src/lib/posts.ts 应从 content collection 读文，不要自己扫文件系统');
    }
  }

  if (!existsSync(postPage)) {
    error('缺少 src/pages/posts/[...id].astro');
  } else {
    const page = read(postPage);
    if (!page.includes('getStaticPaths') || !page.includes('render(')) {
      error('文章页应按集合渲染：getStaticPaths + astro:content render');
    }
  }

  const pages = walk(join(root, 'src/pages')).filter((p) => p.endsWith('.md') || p.endsWith('.mdx'));
  for (const page of pages) {
    warn(`${rel(page)}：文章不要放进 src/pages，应进 content/posts 集合`);
  }
}

function checkLayout() {
  if (!existsSync(postsDir)) {
    error('缺少 content/posts/');
    return [];
  }

  const leftover = join(root, 'posts');
  if (existsSync(leftover) && walk(leftover).some((p) => p.endsWith('.md'))) {
    error('仓库根还有 posts/*.md；写作库是 content/posts/');
  }

  if (existsSync(join(root, '.obsidian')) && existsSync(join(root, 'content/.obsidian'))) {
    warn('仓库根和 content/ 都有 .obsidian。请打开 content/ 当 vault，避免扫到 node_modules');
  }

  const entries = readdirSync(postsDir, { withFileTypes: true });
  const markdown = [];

  for (const entry of entries) {
    const full = join(postsDir, entry.name);
    if (entry.isDirectory()) {
      if (YEAR_DIR.test(entry.name)) {
        error(`${rel(full)}/ 是 Hugo 年目录，应压成 content/posts/YYYY-MM-DD-slug.md`);
        continue;
      }
      if (!ALLOWED_POST_DIRS.has(entry.name)) {
        error(`${rel(full)}/ 不是约定目录（只允许 drafts/、images/）`);
      }
      continue;
    }
    if (entry.name.endsWith('.md')) markdown.push(full);
  }

  const draftsDir = join(postsDir, 'drafts');
  if (existsSync(draftsDir)) {
    for (const entry of readdirSync(draftsDir, { withFileTypes: true })) {
      const full = join(draftsDir, entry.name);
      if (entry.isDirectory()) {
        error(`${rel(full)}/：drafts 不要再套一层`);
      } else if (entry.name.endsWith('.md')) {
        markdown.push(full);
      }
    }
  }

  return markdown;
}

function checkPost(path) {
  const name = path.split('/').pop();
  const fromDrafts = path.includes('/drafts/');
  const where = rel(path);
  const match = name.match(DATE_FILE);

  if (!match) {
    error(`${where}：文件名必须是 YYYY-MM-DD-slug.md`);
    return null;
  }
  if (!isRealDate(match[1])) {
    error(`${where}：文件名日期 ${match[1]} 不是合法日期`);
  }
  if (PUNCT_IN_SLUG.test(match[2])) punctFiles.push(where);

  const raw = read(path);
  const data = parseFrontmatter(raw);
  if (!data) {
    error(`${where}：缺少 YAML frontmatter（文件开头应为 ---）`);
    return null;
  }
  if (!data.title || String(data.title).trim() === '') {
    error(`${where}：frontmatter 缺 title`);
  }
  if (!data.date) {
    error(`${where}：frontmatter 缺 date`);
  } else {
    const date = String(data.date).slice(0, 10);
    if (!DATE_VALUE.test(date) || !isRealDate(date)) {
      error(`${where}：date 应为 YYYY-MM-DD，现在是 ${data.date}`);
    } else if (date !== match[1]) {
      error(`${where}：文件名日期 ${match[1]} 与 frontmatter date ${date} 不一致`);
    }
  }
  if (!fromDrafts && data.draft === true) {
    warn(`${where}：已在 posts 根目录却标了 draft: true；更清楚的做法是放到 drafts/`);
  }
  if (Array.isArray(data.categories) && data.categories.length > 0) {
    categoriesFiles.push(where);
  }

  const imageRe = /!\[[^\]]*]\(([^)]+)\)/g;
  let image;
  while ((image = imageRe.exec(raw))) {
    const src = image[1].trim().split(/\s+/)[0];
    if (/^https?:\/\//.test(src) || src.startsWith('data:')) continue;
    const target = join(dirname(path), src);
    if (!existsSync(target)) {
      error(`${where}：本地图片不存在 ${src}`);
    }
  }

  const slug = data.slug ? String(data.slug) : fileSlug(name.replace(/\.md$/, ''));
  return {
    where,
    fromDrafts,
    slug,
    url: urlSlug(slug),
    title: data.title,
  };
}

function checkImages() {
  const imagesDir = join(postsDir, 'images');
  if (!existsSync(imagesDir) || !statSync(imagesDir).isDirectory()) return;

  const used = new Set();
  for (const file of walk(postsDir).filter((p) => p.endsWith('.md'))) {
    const raw = read(file);
    const imageRe = /!\[[^\]]*]\(([^)]+)\)/g;
    let image;
    while ((image = imageRe.exec(raw))) {
      const src = image[1].trim().split(/\s+/)[0];
      if (src.startsWith('images/')) used.add(src.slice('images/'.length));
    }
  }

  for (const file of walk(imagesDir)) {
    const name = relative(imagesDir, file).replaceAll('\\', '/');
    if (!used.has(name)) warn(`content/posts/images/${name} 没有被任何文章引用`);
  }
}

function checkCollisions(posts) {
  const bySlug = new Map();
  const byUrl = new Map();
  const byTitle = new Map();

  for (const post of posts) {
    if (!post) continue;
    const slugKey = post.slug.toLowerCase();
    if (!bySlug.has(slugKey)) bySlug.set(slugKey, []);
    bySlug.get(slugKey).push(post.where);

    const urlKey = post.url.toLowerCase();
    if (!byUrl.has(urlKey)) byUrl.set(urlKey, []);
    byUrl.get(urlKey).push(post.where);

    if (post.title) {
      const titleKey = String(post.title).trim();
      if (!byTitle.has(titleKey)) byTitle.set(titleKey, []);
      byTitle.get(titleKey).push(post.where);
    }
  }

  for (const [slug, files] of bySlug) {
    if (files.length > 1) error(`slug 重复（${slug}）：${files.join(' , ')}`);
  }
  for (const [url, files] of byUrl) {
    const unique = [...new Set(files)];
    if (unique.length < 2) continue;
    const already = [...bySlug.values()].some(
      (group) => group.length > 1 && group.every((f) => unique.includes(f)),
    );
    if (!already) error(`URL 会撞车（/posts/${url}/）：${unique.join(' , ')}`);
  }
  for (const [title, files] of byTitle) {
    if (files.length > 1) warn(`同标题 ${title}：${files.join(' , ')}`);
  }
}

function summarizeDebt() {
  if (punctFiles.length) {
    warn(
      `${punctFiles.length} 个文件名含书名号/引号/括号（URL 会剥掉这些字符）：\n         ${punctFiles.join('\n         ')}`,
    );
  }
  if (categoriesFiles.length) {
    warn(
      `${categoriesFiles.length} 篇仍有 Hugo 的 categories（会并进 tags，可只留 tags）`,
    );
  }
}

checkAstroWiring();
const markdown = checkLayout();
const posts = markdown.map(checkPost).filter(Boolean);
checkImages();
checkCollisions(posts);
summarizeDebt();

const published = posts.filter((p) => !p.fromDrafts).length;
const drafts = posts.filter((p) => p.fromDrafts).length;

console.log(`检查 content/posts：${published} 篇已发布，${drafts} 篇草稿\n`);

for (const msg of errors) console.log(`error  ${msg}`);
for (const msg of warnings) console.log(`warn   ${msg}`);

if (errors.length === 0 && warnings.length === 0) {
  console.log('ok     符合 Astro 集合接入，以及扁平 YYYY-MM-DD-slug.md 约定');
}

if (errors.length) {
  console.log(`\n未通过：${errors.length} 个错误${warnings.length ? `，${warnings.length} 条提醒` : ''}`);
  process.exit(1);
}

console.log(`\n通过${warnings.length ? `，${warnings.length} 条提醒` : ''}`);
