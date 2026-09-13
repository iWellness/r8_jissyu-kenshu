import { access, readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('migrated command regressions', () => {
  it('uses the requested home-page and header copy', async () => {
    const [home, layout] = await Promise.all([
      readFile('src/pages/index.astro', 'utf8'),
      readFile('src/layouts/BaseLayout.astro', 'utf8'),
    ]);

    expect(home).not.toContain('教材で指定したバージョンを使用してください。');
    expect(layout).toContain('<span>令和８年度 実践研修コース</span>');
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

  it('offers an optional mathematics folder hierarchy exercise', async () => {
    const lesson = await readFile('src/content/lessons/01-linux.mdx', 'utf8');
    const exerciseHeading = '## 時間が余った人向け：階層構造を作る練習問題';

    expect(lesson).toContain(exerciseHeading);
    expect(lesson).toContain('suugaku/');
    expect(lesson).toContain('bibun/');
    expect(lesson).toContain('sekibun/');
    expect(lesson).toContain('<summary>解答例を見る</summary>');
    expect(lesson.indexOf('id="linux-tree-practice"')).toBeLessThan(lesson.indexOf(exerciseHeading));
    expect(lesson.indexOf(exerciseHeading)).toBeLessThan(lesson.indexOf('## パスの指定方法'));
    await expect(access('src/snippets/01-linux/28-extra-hierarchy-answer.txt')).resolves.toBeUndefined();
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
      'src/content/lessons/03-qiime2-install.mdx',
      'src/content/lessons/04-jupyterlab.mdx',
      'src/content/lessons/05-qiime2.mdx',
      'src/snippets/03-qiime2-install/01-create-environment.txt',
      'src/snippets/03-qiime2-install/04-activate-qiime.txt',
      'src/snippets/03-qiime2-install/06-conda-env-output.txt',
      'src/snippets/05-qiime2/02-activate-qiime.txt',
    ].map((path) => readFile(path, 'utf8')));
    expect(versionedFiles.join('\n')).not.toMatch(/2024\.10|2025\.4|2026\.01|2026\.7/);
    expect(versionedFiles.join('\n')).not.toContain('rachis-qiime2-2026.1');
    expect(versionedFiles[0]).toContain('title: QIIME 2のインストール');
    expect(versionedFiles[0]).not.toContain('Qiime2 2');

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

  it('explains conda virtual environments at the end of the QIIME 2 install lesson', async () => {
    const lesson = await readFile('src/content/lessons/03-qiime2-install.mdx', 'utf8');

    expect(lesson).toContain('## 仮想環境とは');
    expect(lesson).toContain('別の仮想環境には影響しません');
    expect(lesson).toContain('OSごと分離する仮想マシンとは異なります');
    expect(lesson).toContain('conda-environments-geohackweek.jpeg');
    expect(lesson).toContain('https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/environments.html');
    expect(lesson).toContain('https://geohackweek.github.io/datasharing/01-conda-tutorial');
    expect(lesson.indexOf('## 仮想環境とは')).toBeGreaterThan(
      lesson.indexOf('id="qiime2-install-seqfu"'),
    );
  });

  it('uses the r8user home path throughout the authored articles', async () => {
    const articles = await Promise.all([
      'docs/migration-log.md',
      'docs/site-design.md',
      'src/content/lessons/01-linux.mdx',
    ].map((path) => readFile(path, 'utf8')));
    expect(articles.join('\n')).not.toContain('/home/coder');
  });

  it('initializes conda for future SSH sessions during Miniforge installation', async () => {
    const lesson = await readFile('src/content/lessons/02-conda.mdx', 'utf8');
    expect(lesson).toContain('You can undo this by running conda init --reverse $SHELL? [yes|no]` と聞かれたら、`yes`');
    expect(lesson).toContain('次回のSSH接続から`conda`をそのまま使えるようになります');
    expect(lesson).not.toContain('You can undo this by running conda init --reverse $SHELL? [yes|no]` と聞かれたら、`no`');
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

  it('compares chat AI with an AI agent using an everyday example', async () => {
    const [lesson, comparison] = await Promise.all([
      readFile('src/content/lessons/06-python-practice.mdx', 'utf8'),
      readFile('src/components/AgentComparison.astro', 'utf8'),
    ]);

    expect(lesson).toContain("import AgentComparison from '../../components/AgentComparison.astro'");
    expect(lesson).toContain('<AgentComparison />');
    expect(comparison).toContain('明日の天気は？');
    expect(comparison).toContain('Chat');
    expect(comparison).toContain('AI Agent');
    expect(comparison).toContain('明日は10時に面会');
    expect(comparison).toContain('リマインダーを設定しました');
    expect(comparison).not.toContain('与えられた権限と接続されたツール');
  });

  it('marks lesson bullet lists with a visible Japanese middle dot', async () => {
    const styles = await readFile('src/styles/global.css', 'utf8');

    expect(styles).toContain('.lesson-content ul:not([class]) > li::before');
    expect(styles).toContain("content: '・'");
  });

  it('keeps the DADA2 thread option in the denoise command', async () => {
    const [lesson, snippet] = await Promise.all([
      readFile('src/content/lessons/05-qiime2.mdx', 'utf8'),
      readFile('src/snippets/05-qiime2/07-denoise.txt', 'utf8'),
    ]);
    expect(snippet).toContain('--o-base-transition-stats ./03_denoise/base-transition-stats.qza \\\n    --p-n-threads 3');
    expect(lesson).toContain('10〜20分程度かかる場合があります');
  });

  it('uses the supported cutadapt outputs for QIIME 2 2026.1', async () => {
    const [lesson, snippet] = await Promise.all([
      readFile('src/content/lessons/05-qiime2.mdx', 'utf8'),
      readFile('src/snippets/05-qiime2/04-adapter-trim.txt', 'utf8'),
    ]);

    expect(snippet).not.toContain('--o-stats');
    expect(lesson).toContain('QIIME 2 2026.1では`--o-stats`を使用できません');
    expect(lesson).not.toContain('`02_adapter/stats.qza`');
    expect(lesson).not.toContain('├── stats.qza');
  });

  it('downloads qzv files from Jupyter before opening QIIME 2 View', async () => {
    const lesson = await readFile('src/content/lessons/05-qiime2.mdx', 'utf8');

    expect(lesson).toContain('Jupyter上でファイルを探して、右クリック→Download をクリックして、ダウンロードしてください');
    expect(lesson).not.toContain('機密性のあるデータをアップロードしてよいか、実習のルールに従ってください');
    expect(lesson).toContain('[QIIME 2 View](https://view.qiime2.org/)');
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

  it('tries the JupyterLab URL before introducing port forwarding', async () => {
    const lesson = await readFile('src/content/lessons/04-jupyterlab.mdx', 'utf8');
    const startHeading = '## 3. JupyterLabを起動して接続を確認';
    const forwardHeading = '## 4. 接続できない場合はWindowsからポート転送';

    expect(lesson).toContain(startHeading);
    expect(lesson).toContain(forwardHeading);
    expect(lesson).toContain('ブラウザーにJupyterLabが表示されない場合');
    expect(lesson.indexOf(startHeading)).toBeLessThan(lesson.indexOf(forwardHeading));
    expect(lesson.indexOf('id="jupyterlab-start"')).toBeLessThan(
      lesson.indexOf('id="jupyterlab-port-forward"'),
    );
  });

  it('keeps QIIME 2 analysis in the terminal instead of a Notebook kernel', async () => {
    const lesson = await readFile('src/content/lessons/04-jupyterlab.mdx', 'utf8');

    expect(lesson).not.toContain('QIIME 2環境をNotebookから使う場合');
    expect(lesson).not.toContain('registerQiimeKernel');
    expect(lesson).toContain('id="jupyterlab-notebook-check"');
    await expect(access('src/snippets/04-jupyterlab/06-register-qiime-kernel.txt')).rejects.toThrow();
  });

  it('downloads the complete NextSeq exercise dataset from R2', async () => {
    const [lesson, download] = await Promise.all([
      readFile('src/content/lessons/05-qiime2.mdx', 'utf8'),
      readFile('src/snippets/05-qiime2/00-download-raw-data.txt', 'utf8'),
    ]);
    const filenames = [
      '1_S1_R1_001.fastq.gz',
      '1_S1_R2_001.fastq.gz',
      '2_S2_R1_001.fastq.gz',
      '2_S2_R2_001.fastq.gz',
      '3_S3_R1_001.fastq.gz',
      '3_S3_R2_001.fastq.gz',
      '11_S5_R1_001.fastq.gz',
      '11_S5_R2_001.fastq.gz',
    ];

    expect(download).toContain('mkdir raw-data');
    for (const filename of filenames) {
      expect(download).toContain(`https://pub-3323395ea28d4d81afab5d75dd0b6484.r2.dev/nextseq/raw-data/${filename}`);
    }
    expect(lesson).toContain('id="qiime2-download-raw-data"');
    expect(lesson).not.toContain('JupyterLabからアップロード');
    expect(lesson.indexOf('id="qiime2-download-raw-data"')).toBeLessThan(
      lesson.indexOf('id="qiime2-activate"'),
    );
  });

  it('documents the public SRA download workflow with verified accessions', async () => {
    const [lesson, command] = await Promise.all([
      readFile('src/content/lessons/07-sra-download.mdx', 'utf8'),
      readFile('src/snippets/07-sra-download/02-fasterq-dump.txt', 'utf8'),
    ]);

    expect(lesson).toContain('https://www.nature.com/articles/s42003-025-09089-2');
    expect(lesson).toContain('PRJNA1062343');
    expect(lesson).not.toContain('PRJNA106234390');
    expect(lesson).toContain('https://www.ncbi.nlm.nih.gov/sra');
    expect(lesson).toContain('SRX23409400');
    expect(lesson).toContain('SRR27743880');
    expect(lesson).toContain('sra-paper-bioproject.png');
    expect(lesson).toContain('sra-search-results.png');
    expect(command.trim()).toBe('fasterq-dump -p --split-files SRR27743880');
  });
});
