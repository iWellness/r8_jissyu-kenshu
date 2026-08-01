# Qiime2関連URL

- [Qiime2 Top](https://qiime2.org/)
- [Document](https://amplicon-docs.qiime2.org/en/latest/)
- [Install](https://library.qiime2.org/quickstart/amplicon)

※ Qiime2は定期的にバージョンアップされており、そのたびにドキュメントも更新されています。URL中の`2025.10`は、バージョンを指しています。できるだけ最新を参照してください。

# Install
### 1. Installページにアクセス
- [https://library.qiime2.org/quickstart/amplicon](https://library.qiime2.org/quickstart/amplicon)
- `Using conda`をクリック。

<br>

※ [ドキュメントページ](https://amplicon-docs.qiime2.org/en/latest/)から行く場合はこちら<br>

![](./img/03_qiime2_install-page_2025.png)

### 2. condaでのインストール方法を選択
- 今回は、`Conda` を使用します。`Using Conda` > `Install the base distribution’s conda environment`
を見つける。
- `Linux / Windows WSL`をクリック。
![](./img/03_qiime2_install-page-linux.png)

### 3. インストール
- `conda ...`のコマンドをコピーし、ターミナルに貼り付けて実行。
- 途中、`Proceed ([y]/n)?`と聞かれた場合は、`y`を入力して進める。
- 数分待つ

# conda環境の有効化
condaのメリットは、`RNA-Seq`や`Qiime2`、`Python`など、環境ごとにパッケージを管理できることです。<br>
現在、Qiime2環境の外にいるため、`qiime`コマンドが使えない状態です。<br>
```bash
qiime --help
```

使用するためには、環境を有効化する必要があります。<br>
まずは、環境名を確認します。<br>

```bash
conda env list
```

<br>
今回は、以下の出力になるはずです。<br>

```
# conda environments:
#
base                 * /home/r8user/miniforge3
rachis-qiime2-2026.7   /home/r8user/miniforge3/envs/rachis-qiime2-2026.7
```

`rachis-qiime2-2026.7`をコピーし、以下のコマンドを実行して有効化します。<br>
```
conda activate rachis-qiime2-2026.7
```

これで、Qiime2環境が有効化されました。<br>
`qiime`コマンドが使えるようになります。<br>

```bash
qiime --help
```

