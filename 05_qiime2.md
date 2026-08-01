## はじめに

Jupyterの画面から、データをUploadし、作業場所に `raw-data/` のフォルダと、その中にfastqが入ってあるとします。

```text
raw-data/
    ├── <SAMPLE1>_R1_001.fastq.gz
    ├── <SAMPLE1>_R2_001.fastq.gz
    ├── ...
    ├── <SAMPLE5>_R1_001.fastq.gz
    └── <SAMPLE5>_R2_001.fastq.gz
```

### 目標

```text
raw-data/
    ├── <YOURSAMPLE>_R1_001.fastq.gz
    ├── ...
    └── <YOURSAMPLE>_R2_001.fastq.gz
manifest.tsv
01_data-import/
    └── import.qza
02_adapter/
    ├── trimmed-seqs.qza
    └── trimmed-seqs.qzv
03_denoise/
    ├── table-dada2.qza
    ├── table-dada2.qzv
    ├── rep-seqs-dada2.qza
    ├── rep-seqs-dada2.qzv
    ├── stats-dada2.qza
    └── stats-dada2.qzv
04_taxonomy/
    ├── taxa-bar-plots.qzv
    ├── taxonomy.qza
    └── taxonomy.qzv
```

## menifestファイルの作成

```bash
seqfu metadata -f manifest -s _S raw-data > manifest.tsv
```

## qiime2環境のactivate

```bash
conda activate rachis-qiime2-2026.1
```

## 01_data-import

```bash
# ディレクトリの作成
mkdir 01_data-import

# manifest.tsvに従って、データを
# 01_data-import/demux-paired-end.qza として保存。
qiime tools import \
    --type "SampleData[PairedEndSequencesWithQuality]" \
    --input-path manifest.tsv \
    --input-format PairedEndFastqManifestPhred33V2 \
    --output-path ./01_data-import/import.qza
```

## 02_adapter

```bash
# ディレクトリの作成
mkdir 02_adapter

# Primer配列の定義
FWD='CCTACGGGNGGCWGCAG' ## V3V4用
REV='GACTACHVGGGTATCTAATCC' ## V3V4用

FWDRC=$(echo "${FWD}" | tr ACGTMRYKVHDBacgtmrykvhdb TGCAKYRMBDHVtgcakyrmbdhv | rev)
REVRC=$(echo "${REV}" | tr ACGTMRYKVHDBacgtmrykvhdb TGCAKYRMBDHVtgcakyrmbdhv | rev)

# アダプタートリミング
## 次のオプションに注意。
## --p-discard-untrimmed: トリムされなかったリードは使わない。
## --p-cores: 並列処理につかうスレッドの数
qiime cutadapt trim-paired \
    --i-demultiplexed-sequences ./01_data-import/import.qza \
    --p-front-f ${FWD} --p-front-r ${REV} \
    --p-adapter-f ${REVRC} --p-adapter-r ${FWDRC} \
    --p-times 10 \
    --p-match-read-wildcards --p-match-adapter-wildcards \
    --p-minimum-length 200 \
    --p-discard-untrimmed \
    --o-trimmed-sequences ./02_adapter/trimmed-seqs.qza \
    --o-stats ./02_adapter/stats.qza \
    --p-cores 3

# visualizationファイルへ出力。
qiime demux summarize --i-data ./02_adapter/trimmed-seqs.qza --o-visualization ./02_adapter/trimmed-seqs.qzv
```

## クォリティの確認

次のDADA2では、

1. キメラ配列の削除
2. 低クオリティ部分をカット
3. ForwardとReverseを繋ぎ合わせる。

を行います。<br>
`2. 低クオリティ部分`については、解析者が手動で指定する必要があります。

`.qzv`はvisualizationファイルで、各ステップの結果を可視化することができます。

### `.qzv`ファイルの可視化方法

#### 1. (今回使用)Qiime2 Viewへアップロード
[https://view.qiime2.org/](https://view.qiime2.org/)

#### 2. `qiime tools view`コマンド
手元のPC（MacBookなど）にQiime2をインストールしている場合、この方法が使用できます。

```bash
qiime tools view <file>.qzv
```

### `.qzv`データのエクスポートと`.tsv`の可視化。

```bash

qiime tools export --input-path ./02_adapter/trimmed-seqs.qzv --output-path ./02_adapter/outputs

# csvlensをインストール
conda install csvlens -c conda-forge

# Forward配列の結果を可視化。qで終了。
csvlens -d auto ./02_adapter/outputs/forward-seven-number-summaries.tsv
# Reverse配列の結果を可視化。qで終了。
csvlens -d auto ./02_adapter/outputs/reverse-seven-number-summaries.tsv

```


## 03_denoise

```bash
# ディレクトリの作成
mkdir 03_denoise

# DADA2
## fffとrrrは適宜変更
qiime dada2 denoise-paired \
    --i-demultiplexed-seqs ./02_adapter/trimmed-seqs.qza \
    --p-trunc-len-f fff \
    --p-trunc-len-r rrr \
    --o-table ./03_denoise/table-dada2.qza \
    --o-representative-sequences ./03_denoise/rep-seqs-dada2.qza \
    --o-denoising-stats ./03_denoise/stats-dada2.qza \
    --o-base-transition-stats ./03_denoise/base-transition-stats.qza
    --p-n-threads 3

# 各qzaファイルをqzvファイルへ
## 何%削除されたなどの、DADA2のステータス
qiime metadata tabulate --m-input-file ./03_denoise/stats-dada2.qza --o-visualization ./03_denoise/stats-dada2.qzv

## 各サンプルのリード数など
qiime feature-table summarize --i-table ./03_denoise/table-dada2.qza --o-visualization ./03_denoise/table-dada2.qzv

## Forward+Reverse マージ後に決定した代表配列の一覧
qiime feature-table tabulate-seqs --i-data ./03_denoise/rep-seqs-dada2.qza --o-visualization ./03_denoise/rep-seqs-dada2.qzv
```

## 04_taxonomy

### 分類器(データベース)のダウンロード

[https://library.qiime2.org/data-resources](https://library.qiime2.org/data-resources)
![](./img//04_classifier-download.png)

```bash

# コピーしたURLからダウンロード

# ※以下のURLは例です。必ずライブラリページから最新のURLをコピーしてください。
wget https://data.qiime2.org/classifiers/sklearn-1.4.2/silva/silva-138-99-nb-classifier.qza

```

```bash
# ディレクトリの作成
mkdir 04_taxonomy

# 分類器を使って分類
qiime feature-classifier classify-sklearn \
    --i-reads ./03_denoise/rep-seqs-dada2.qza \
    --i-classifier ./silva-138-99-nb-classifier.qza \
    --o-classification ./04_taxonomy/taxonomy.qza \
    --p-n-jobs 3

# 分類結果を表形式で可視化
qiime metadata tabulate \
    --m-input-file ./04_taxonomy/taxonomy.qza \
    --o-visualization ./04_taxonomy/taxonomy.qzv

# 分類結果をバープロットで可視化
qiime taxa barplot \
    --i-table ./03_denoise/table-dada2.qza \
    --i-taxonomy ./04_taxonomy/taxonomy.qza \
    --o-visualization ./04_taxonomy/taxa-bar-plots.qzv

```
