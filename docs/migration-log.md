# 教材移行ログ

更新日: 2026-09-09

対象: 既存教材7章
状態: 全7章のMDX移行完了（実習環境でのQIIME 2実行確認は未実施）

## UI基盤とトップページの変更（2026-09-09）

- AstroへReact integrationとTailwind CSS 4を追加し、共通UIをshadcn/ui（Base UI版）のButton、Card、Badge、Alert、Separatorへ移行した。
- トップページの紹介ヒーローと「最初の章から始める」を削除し、h1「実習の流れ」と7章のカード一覧を直接表示する構造へ変更した。
- 教材ページは右側の固定目次を廃止し、章一覧と本文の二列へ整理した。ページ内目次は本文上部の折り畳みへ統一した。
- サイト名を「BI実践研修」へ短縮した。ページタイトルの接尾辞も同じ名称へ変更した。
- コマンド原文とコピー処理のデータ属性は維持しており、教材本文・URL・コピー内容に破壊的変更はない。

## 移行方針

既存の原稿は参照資料としてリポジトリに残し、削除・改名・上書きは行わない。Web教科書で編集する正本は、次のMDXとスニペットとする。

| 旧原稿 | Web教科書 | 状態 |
| --- | --- | --- |
| `00_vscodeの画面.md` | `src/content/lessons/00-vscode.mdx` | 移行済み |
| `01_Linuxコマンド.md` | `src/content/lessons/01-linux.mdx` | 移行済み |
| `02_conda環境の設定.md` | `src/content/lessons/02-conda.mdx` | 移行済み |
| `03_qiime2のインストール.md` | `src/content/lessons/03-qiime2-install.mdx` | 移行済み |
| `04_JupyterLabのインストール.md` | `src/content/lessons/04-jupyterlab.mdx` | 移行済み |
| `05_qiime2.md` | `src/content/lessons/05-qiime2.mdx` | 移行済み |
| `06_Claude_CodeでPython演習.md` | `src/content/lessons/06-python-practice.mdx` | 移行済み |

コマンドの原文は`src/snippets/`の章別フォルダに分け、MDXから`?raw`で読み込む。表示とコピーに同じ原文を渡すことで、シンタックスハイライトのHTMLをコピー元にしない構成にした。スクリーンショットは`src/assets/`へ移し、説明付きの画像部品から表示する。

## その他5章

- VS Code章は、作業フォルダを信頼する画面とターミナルの開き方を画像付きで移行した。
- conda章は、Miniforgeの取得方法と初期化・確認を独立したコマンド単位へ分けた。
- QIIME 2インストール章は、講座指定の2026.1へ表記を揃えた。更新される公式手順を実習時に確認する注意を残した。
- JupyterLab章で使うQIIME 2環境名は、他章と同じ`rachis-qiime2-2026.1`へ統一した。
- Python演習章は作業フォルダを`06_python`として移行し、Claude Codeへの依頼文を`prompt`種別にした。Claude Code自体の導入手順は講師準備用の`pre-install.md`に残っており、受講者向け前提として扱う場合は別途レビューする。

## Linuxコマンド章

旧原稿の基本操作、Tab補完、ファイル操作、QIIME 2解析の準備、バッチ処理、トラブルシューティングを`01-linux.mdx`へ移した。旧原稿に複数あったh1は、ページタイトルをメタデータの1つのh1として扱い、本文をh2/h3へ整理した。

### 修正内容

- `20-save-primer.txt`で`FWD`と`REV`を`primer.txt`へ保存し、`forward`と`reverse`のラベルも付けた。これにより後続の表示・検索で使うファイルが実際に作成される。
- `23-wget.txt`は教材原稿を`downloaded-linux-commands.md`へ保存する形にし、`ls -lh`で保存結果を確認するようにした。ダウンロードした原稿と、検索練習に使う`primer.txt`を別のファイルとして扱う。
- `24-cat-primer.txt`、`25-grep-atcg.txt`、`26-grep-word.txt`の対象を、存在しない`primer-sequence.txt`から、直前の手順で作成する`primer.txt`へ変更した。検索文字列も`primer.txt`の実データ（`CCTACGGG`、`forward`）に合わせた。
- `28-batch.txt`の構造確認を`tree . 2>/dev/null || ls -R .`へ変更した。元の`cd batch_analysis`後に`tree batch_analysis`を実行する二重パスを解消した。
- `29-metadata.txt`、`30-cat-metadata.txt`、`31-config.txt`、`32-log.txt`は`cd ~/workspace/batch_analysis`から始めるようにした。ブロックを途中から実行しても`batch_analysis/batch_analysis`にならない。
- 存在しない`02_nanoの使い方.md`へのリンクは作成せず、ファイル編集はVS Codeまたは実習環境で案内されたエディターを使う説明へ置き換えた。受講者向けのリンク切れを残さないためである。

## QIIME 2解析章

旧原稿のmanifest作成、QIIME 2環境の有効化、import、cutadapt、品質確認、DADA2、taxonomy分類を`05-qiime2.mdx`へ移した。Data Resourcesの分類器画像は`src/assets/04_classifier-download.png`から`Figure`で表示する。

出力ツリーは実際のスニペットが作る名前に合わせた。feature tableの要約で作られる可視化は`table-dada2.qzv`ではなく`visual-summary.qzv`なので、完成イメージと確認手順を修正した。

### DADA2の行継続修正

旧原稿では、次の行の末尾にシェルの行継続文字がなく、`--p-n-threads 3`が別のコマンドとして解釈されていた。

```bash
    --o-base-transition-stats ./03_denoise/base-transition-stats.qza
    --p-n-threads 3
```

`src/snippets/05-qiime2/07-denoise.txt`では、出力指定の行末に`\`を追加して、同じ`qiime dada2 denoise-paired`コマンドに含めた。

```bash
    --o-base-transition-stats ./03_denoise/base-transition-stats.qza \
    --p-n-threads 3
```

QIIME 2 2026.1の公式DADA2リファレンスでも、`--o-base-transition-stats`は`denoise-paired`の出力として示され、スレッド数は`--p-n-threads`で指定できる。参照: [QIIME 2 2026.1 DADA2 reference](https://amplicon-docs.qiime2.org/en/2026.1/references/plugins/dada2.html)

サイト側では、このスニペットを`kind="template"`で表示し、`fff`と`rrr`を品質確認で決めたtruncation長へ置き換えるよう明記した。スニペットの原文には行継続を残し、コピー時にも同じ文字列が渡る。

## 未実行・実習時に確認する項目

- QIIME 2、`seqfu`、`csvlens`が指定環境に入っていることは、サイトのビルドでは検証していない。実習環境で各コマンドを実行して確認する。
- `qiime cutadapt trim-paired`のプライマー配列と`--p-minimum-length`、DADA2のtruncation長は、実データの品質プロットと実験条件に合わせて講師が確定する。
- 分類器のURL・版は更新されるため、`11-download-classifier.txt`のURL例を正本として固定せず、QIIME 2 Data Resourcesから実習時のURLを取得する。
- `/home/coder`などのパスは表示例であり、実習環境のユーザー名・作業場所に応じて読み替える。
- 教材本文のコマンドは、データを変更する可能性があるため、移行作業中には実行していない。
