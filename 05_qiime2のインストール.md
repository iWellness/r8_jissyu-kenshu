# QIIME 2のインストール

## 公式ページ

- [QIIME 2 Library](https://library.qiime2.org/quickstart/qiime2)
- [アンプリコン解析ドキュメント](https://amplicon-docs.qiime2.org/en/stable/)
- [QIIME 2 View](https://view.qiime2.org/)

QIIME 2は定期的に更新されます。教材ではバージョンを固定しすぎず、実習時に公式ページのVersionとOSを確認してください。現時点の公式ページでは **QIIME 2 2026.7** が公開されています。

## Linux / Windows WSLでのインストール

QIIME 2 Libraryの「QIIME 2」→「Using Conda」→「Install the base distribution's conda environment」を開き、Linux / Windows WSL用のコマンドをコピーして実行します。

現行版（2026.7）のLinux用コマンドは次の形式です。実習時には必ず公式ページから最新版をコピーしてください。

```bash
conda env create \
  --name rachis-qiime2-2026.7 \
  --file https://raw.githubusercontent.com/qiime2/distributions/refs/heads/dev/2026.7/qiime2/released/rachis-qiime2-linux-64-conda.yml
```

## macOSの場合

macOS用のコマンドは公式ページのOS選択から取得してください。Apple Siliconでは対応条件が異なる場合があるため、Linux/WSLのコマンドを流用しないでください。

## 環境の有効化と確認

```bash
conda activate rachis-qiime2-2026.7
qiime info
```

`qiime info` が実行できれば、QIIME 2のインストールは完了です。

```bash
conda env list
```

環境名は、公式ページで選択したバージョンに応じて変わります。`2026.7` と異なる場合は、表示された環境名を使って `conda activate` してください。
