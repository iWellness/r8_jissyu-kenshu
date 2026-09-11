# 令和8年度BI実践研修

## Web教科書の開発

Web版の正本は`src/content/lessons/`です。このREADME以下の旧目次とルートのMarkdownは、移行元として当面残しています。

Node.js 24で次を実行します。

```bash
npm ci
npm run dev
```

提出前は`npm run validate`を実行してください。編集方法は[Web教科書 編集ガイド](docs/authoring.md)、設計判断は[設計書](docs/site-design.md)を参照してください。

`main`へ反映するとGitHub Actionsが検証し、GitHub Pagesへ公開します。リポジトリ設定のPages Sourceは「GitHub Actions」にします。

## 旧教材の目次（移行元）

### 目次

- [01_Linuxコマンド](01_Linuxコマンド.md)
- [02_nanoの使い方](02_nanoの使い方.md)
- [03_conda環境の設定](03_conda環境の設定.md)
- [04_JupyterLabのインストール](04_JupyterLabのインストール.md)
- [05_qiime2のインストール](05_qiime2のインストール.md)
- [06_qiime2](06_qiime2.md)
- [07_Nextflowの紹介](07_Nextflowの紹介.md)
- [08_Claude CodeでPython演習](08_Claude_CodeでPython演習.md)

## 実習の流れ

SSH接続 → Linuxの基本操作・環境構築 → 各自でJupyterLabをインストール → QIIME 2解析 → Claude Codeを使ったPython演習、の順で進めます。導入教材「00_SSH」の正本は[SSHで実習環境に接続](src/content/lessons/00-ssh.mdx)です。

受講者ごとのIPアドレス、ユーザー名、認証情報を事前に配布します。VPN、SSHポート、JupyterLab用のポート転送は実習環境に合わせて設定します。実際のパスワードや秘密鍵は教材リポジトリに記載しません。

## 注意
QIIME 2のインストールコマンドと分類器のURLは更新されるため、実習時には公式ページの最新版を確認してください。
