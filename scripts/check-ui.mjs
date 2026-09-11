import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const documentAt = async (path) => new JSDOM(await readFile(`dist/${path}`, 'utf8')).window.document;
const home = await documentAt('index.html');
const linux = await documentAt('lessons/linux/index.html');
const qiime2 = await documentAt('lessons/qiime2/index.html');
const search = home.querySelector('[data-search-open]');
assert.equal(search.textContent.trim(), '', 'Search trigger should be icon-only');
assert.equal(search.getAttribute('aria-label'), '教材内を検索');
assert.ok(search.querySelector('svg'));
assert.equal(home.querySelectorAll('.course-list > li').length, 8);
assert.ok(home.querySelector('.course-list > li:first-child a[href$="/lessons/ssh/"]'));
assert.ok(home.querySelector('.course-list > li:last-child a[href$="/lessons/sra-download/"]'));
const homeHero = home.querySelector('.home-hero img');
assert.ok(homeHero, 'Home should include the microbiome hero image');
assert.ok(homeHero.getAttribute('src').includes('microbiome-hero'));
assert.equal(home.querySelector('.home-hero__eyebrow').textContent.trim(), '令和８年度 第１回');
assert.equal(home.querySelector('.home-hero__title-main').textContent.trim(), '〜腸内細菌叢解析〜');
assert.ok(home.querySelector('.home-hero').compareDocumentPosition(home.querySelector('#flow-title')) & 4);
assert.equal(home.querySelectorAll('.course-list [data-slot="card"], .course-list [data-slot="badge"]').length, 0);
assert.ok(home.querySelector('.course-list a[href$="/lessons/linux/"]'));
assert.equal(linux.querySelector('.chapter-nav__label'), null);
assert.equal(linux.querySelector('.lesson-description'), null);
assert.equal(linux.querySelector('.lesson-objectives [data-slot="card"]'), null);
assert.ok(linux.querySelector('.lesson-objectives li'));
assert.ok(linux.querySelector('[data-copy-button]'));
assert.equal(linux.querySelector('.command-block--command .command-block__kind').textContent.trim(), '実行');
assert.ok([...linux.querySelectorAll('.command-block__context')].every((element) => element.textContent.trim().startsWith('@')));
assert.ok(!linux.body.textContent.includes('入力先:'));
assert.ok(linux.querySelector('[rel="prev"][href$="/lessons/ssh/"]'));
assert.ok(linux.querySelector('[rel="next"]'));
assert.ok(!linux.body.textContent.includes('チャレンジ：バッチ処理の準備'));
assert.equal(linux.querySelector('[id^="linux-batch-"]'), null);
assert.ok(linux.querySelector('#linux-qiime-simulation'));
assert.ok(linux.querySelector('#linux-hidden-cat'));
const spacingWarning = [...linux.querySelectorAll('.callout--warning')].find((callout) =>
  callout.textContent.includes('コマンドと引数の間は半角スペースで区切り、全角スペースは使いません。'),
);
assert.ok(spacingWarning, 'The half-width space rule should be a warning callout');
assert.ok(spacingWarning.querySelector('.callout__icon svg[aria-hidden="true"]'), 'Warning callouts should use an icon');
const infoCallout = qiime2.querySelector('.callout--note');
assert.ok(infoCallout?.querySelector('.callout__icon svg[aria-hidden="true"]'), 'Info callouts should use an icon');
const practice = linux.querySelector('.lesson-content > :last-child');
assert.equal(practice.querySelector('iframe'), null);
assert.ok(practice.matches('a.webterm-practice[href="https://webterm.app/ja/tutorials"][target="_blank"][rel~="noopener"]'));
for (const document of [home, linux]) {
  assert.equal(document.querySelector('a[href$="/lessons/vscode/"]'), null);
  const brandLogo = document.querySelector('.site-brand img.site-brand__logo');
  assert.ok(brandLogo, 'The site brand should include its logo');
  assert.equal(brandLogo.getAttribute('alt'), '');
}
await assert.rejects(access('dist/lessons/vscode/index.html'));
const ssh = await documentAt('lessons/ssh/index.html');
assert.equal(ssh.querySelector('[rel="prev"]'), null);
assert.ok(ssh.querySelector('[rel="next"][href$="/lessons/linux/"]'));
assert.ok(ssh.querySelector('img[alt="Windows PCからSSHで実習用Linuxへ接続する流れ"]'));
for (const text of ['PowerShell', 'IPアドレス', '接続先', 'exit']) {
  assert.ok(ssh.body.textContent.includes(text), `SSH lesson should explain ${text}`);
}
for (const text of [
  'つながらないとき',
  '実習用Linuxの電源を切る操作ではありません',
  '保存したファイルは接続先に残ります',
  '新しいタブを開いただけではSSH接続されません',
  '鍵方式の場合',
  '鍵の指紋',
]) {
  assert.ok(!ssh.body.textContent.includes(text), `SSH lesson should omit: ${text}`);
}
const sra = await documentAt('lessons/sra-download/index.html');
assert.ok(sra.querySelector('[rel="prev"][href$="/lessons/python-practice/"]'));
assert.equal(sra.querySelector('[rel="next"]'), null);
assert.ok(sra.querySelector('img[alt*="BioProject PRJNA1062343"]'));
assert.ok(sra.querySelector('img[alt*="SRX23409400"]'));
assert.equal(sra.querySelector('#sra-fasterq-dump .copy-source').value.trim(), 'fasterq-dump -p --split-files SRR27743880');
for (const link of home.querySelectorAll('.course-list a')) {
  const slug = link.getAttribute('href').split('/').filter(Boolean).at(-1);
  const lesson = await documentAt(`lessons/${slug}/index.html`);
  const objectives = lesson.querySelector('.lesson-objectives');
  const objectiveItems = [...objectives.querySelectorAll('li')];
  assert.ok(objectives.classList.contains('lesson-objectives--checklist'), `${slug} should show learning objectives in a checklist box`);
  assert.ok(objectiveItems.length > 0, `${slug} should include learning objectives`);
  assert.ok(
    objectiveItems.every((item) => item.querySelector('.lesson-objectives__check[aria-hidden="true"]')?.textContent.trim() === '✓'),
    `${slug} should show a check mark for every learning objective`,
  );
  assert.ok(!lesson.body.textContent.includes('VS Code for Web'));
  assert.ok(!lesson.body.textContent.includes('\u8b1b\u5e2b'));
}
assert.ok(!home.body.textContent.includes('\u8b1b\u5e2b'));
console.log('Compact UI and SSH-first eight-page navigation verified.');
