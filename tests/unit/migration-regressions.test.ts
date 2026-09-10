import { access, readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('migrated command regressions', () => {
  it('uses the requested home-page and header copy', async () => {
    const [home, layout] = await Promise.all([
      readFile('src/pages/index.astro', 'utf8'),
      readFile('src/layouts/BaseLayout.astro', 'utf8'),
    ]);

    expect(home).not.toContain('教材で指定したバージョンを使用してください。');
    expect(layout).toContain('class="site-brand" href={import.meta.env.BASE_URL}>令和８年度 実践研修コース</a>');
  });

  it('creates workspace before teaching Tab completion', async () => {
    const [lesson, workspaceCommand] = await Promise.all([
      readFile('src/content/lessons/01-linux.mdx', 'utf8'),
      readFile('src/snippets/01-linux/04-mkdir-workspace.txt', 'utf8'),
    ]);

    expect(workspaceCommand.trim()).toBe('mkdir workspace');
    expect(lesson).toContain('`mkdir workspace`で`workspace`フォルダを作成');
    expect(lesson.indexOf('id="linux-mkdir-workspace"')).toBeLessThan(
      lesson.indexOf('## Tab補完を使う'),
    );
    expect(lesson.indexOf('## Tab補完を使う')).toBeLessThan(
      lesson.indexOf('## Step 3：フォルダを作成して移動する'),
    );
  });

  it('uses QIIME 2 2026.1 consistently', async () => {
    const expectedInstall = [
      'conda env create \\',
      '  --name qiime2-2026.1 \\',
      '  --file https://raw.githubusercontent.com/qiime2/distributions/refs/heads/dev/2026.1/amplicon/released/qiime2-amplicon-ubuntu-latest-conda.yml',
    ].join('\n');
    const install = await readFile('src/snippets/03-qiime2-install/01-create-environment.txt', 'utf8');
    expect(install.trim()).toBe(expectedInstall);

    const versionedFiles = await Promise.all([
      '03_qiime2のインストール.md',
      '04_JupyterLabのインストール.md',
      'src/content/lessons/03-qiime2-install.mdx',
      'src/content/lessons/04-jupyterlab.mdx',
      'src/content/lessons/05-qiime2.mdx',
      'src/snippets/03-qiime2-install/01-create-environment.txt',
      'src/snippets/03-qiime2-install/04-activate-qiime.txt',
      'src/snippets/03-qiime2-install/06-conda-env-output.txt',
      'src/snippets/04-jupyterlab/06-register-qiime-kernel.txt',
      'src/snippets/05-qiime2/02-activate-qiime.txt',
    ].map((path) => readFile(path, 'utf8')));
    expect(versionedFiles.join('\n')).not.toMatch(/2024\.10|2025\.4|2026\.01|2026\.7/);
    expect(versionedFiles.join('\n')).not.toContain('rachis-qiime2-2026.1');

    for (const image of [
      'src/assets/03_qiime2_install-page.png',
      'src/assets/03_qiime2_install-page_2025.png',
      'src/assets/03_qiime2_install-page-linux.png',
      'img/03_qiime2_install-page.png',
      'img/03_qiime2_install-page_2025.png',
      'img/03_qiime2_install-page-linux.png',
    ]) {
      await expect(access(image)).rejects.toThrow();
    }
  });

  it('uses the r8user home path throughout the authored articles', async () => {
    const articles = await Promise.all([
      '01_Linuxコマンド.md',
      'docs/migration-log.md',
      'docs/site-design.md',
      'src/content/lessons/01-linux.mdx',
    ].map((path) => readFile(path, 'utf8')));
    expect(articles.join('\n')).not.toContain('/home/coder');
  });

  it('documents the requested Miniforge installer answer', async () => {
    const lesson = await readFile('src/content/lessons/02-conda.mdx', 'utf8');
    expect(lesson).toContain('You can undo this by running conda init --reverse $SHELL? [yes|no]` と聞かれたら、`no`');
    expect(lesson).not.toContain('You can undo this by running conda init --reverse $SHELL? [yes|no]` と聞かれたら、`yes`');
  });

  it('introduces AI agents before the Claude Code exercise', async () => {
    const lesson = await readFile('src/content/lessons/06-python-practice.mdx', 'utf8');
    expect(lesson).toContain('AI Agentとは');
    expect(lesson).toContain('Codex');
    expect(lesson).toContain('Claude Codeを起動');
    expect(lesson).toContain('全ての操作を実行してくれるわけではない');
    expect(lesson).toContain('分からなければ、「次に人間が行う操作を、1つずつ説明してください」とClaude Codeに質問');
    expect(lesson).not.toContain('生成コードを確認してから実行');
    expect(lesson).not.toContain('課題C：結果の説明');
    expect(lesson).not.toContain('## 完成チェック');
    expect(lesson).toContain('DADA2の結果を使い、サンプルごとのリード数を棒グラフに。');
    expect(lesson).toContain('指定した分類階級（例：PhylumまたはGenus）ごとの件数を集計。');
  });

  it('keeps the DADA2 thread option in the denoise command', async () => {
    const snippet = await readFile('src/snippets/05-qiime2/07-denoise.txt', 'utf8');
    expect(snippet).toContain('--o-base-transition-stats ./03_denoise/base-transition-stats.qza \\\n    --p-n-threads 3');
  });

  it('removes the optional batch exercise while keeping the QIIME preparation', async () => {
    const lesson = await readFile('src/content/lessons/01-linux.mdx', 'utf8');
    expect(lesson).not.toContain('batchSetup');
    expect(lesson).not.toContain('チャレンジ：バッチ処理の準備');
    expect(lesson).toContain('linux-qiime-simulation');
  });

  it('uses the primer file created by the preceding lesson step', async () => {
    const created = await readFile('src/snippets/01-linux/20-save-primer.txt', 'utf8');
    const inspected = await readFile('src/snippets/01-linux/24-cat-primer.txt', 'utf8');
    expect(created).toContain('> primer.txt');
    expect(inspected.trim()).toBe('cat primer.txt');
  });

  it('orders remote analysis setup before commands that depend on it', async () => {
    const qiimeLesson = await readFile('src/content/lessons/05-qiime2.mdx', 'utf8');
    expect(qiimeLesson.indexOf('id="qiime2-activate"')).toBeLessThan(
      qiimeLesson.indexOf('id="qiime2-manifest"'),
    );

    const portForward = await readFile('src/snippets/04-jupyterlab/03-port-forward.txt', 'utf8');
    expect(portForward.trim()).toBe(
      'ssh -N -L 8888:localhost:8888 USERNAME@IP_ADDRESS',
    );

    const startJupyter = await readFile('src/snippets/04-jupyterlab/04-start-jupyterlab.txt', 'utf8');
    expect(startJupyter.trim()).toBe('jupyter lab --no-browser --port=8888');

    const seqfuInstall = await readFile('src/snippets/03-qiime2-install/07-install-seqfu.txt', 'utf8');
    expect(seqfuInstall.trim()).toBe('conda install -c bioconda seqfu');
  });
});
