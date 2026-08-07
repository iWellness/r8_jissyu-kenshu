# JupyterLabのインストール

今回は、JupyterLabを講師側で一括準備せず、受講者が各自の環境にインストールします。

## 1. conda環境の確認

```bash
conda --version
conda env list
```

## 2. JupyterLabのインストール

base環境でインストールします。

```bash
conda activate base
conda install -c conda-forge jupyterlab
```

途中で `Proceed ([y]/n)?` と表示されたら `y` を入力します。

## 3. 起動と動作確認

```bash
jupyter lab
```

表示されたURLをブラウザで開き、新しいNotebookで次を実行します。

```python
import sys
print(sys.version)
print("JupyterLab OK")
```

SSH先で起動する場合は、ターミナルに表示されたURLを使用します。終了時はJupyterLabのターミナルで `Ctrl + C` を押し、確認に `y` を入力します。

## 4. QIIME 2環境をNotebookから使う場合

QIIME 2の解析は基本的にターミナルで行います。NotebookからQIIME 2環境のPythonを使う場合は、カーネルを登録します。

```bash
conda activate rachis-qiime2-2026.7
conda install -c conda-forge ipykernel
python -m ipykernel install --user --name rachis-qiime2-2026.7 --display-name "Python (QIIME 2 2026.7)"
```

Notebook作成時に `Python (QIIME 2 2026.7)` を選択します。

## 完成チェック

- [ ] `jupyter lab` でJupyterLabを起動できる
- [ ] Notebookを新規作成できる
- [ ] Pythonコードを実行できる
- [ ] 使用中のカーネルを確認できる
- [ ] JupyterLabを終了できる
