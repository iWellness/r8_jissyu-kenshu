# はじめに：基本ルール

### コマンドの実行方法
- コマンドを入力後、`Enter`キーを押して実行
- **重要**: 半角スペース区切りで入力（全角スペースは使わないで！）

### 基本文型
`コマンド` `引数` `オプション`

**例**: `ls -l data/`
- `ls`: コマンド（リスト表示）
- `-l`: オプション（詳細表示）
- `data/`: 引数（対象ディレクトリ）

---

# 超重要：Tabキーの補完機能 ⭐

**最も重要な機能**：`Tab`キーで自動入力！

例：`ls da` と入力してから `Tab`キーを押す → `ls data/` に自動補完

- 補完候補が1つしかない時：自動で補完される
- 複数ある時：`Tab`を2回押すと候補が表示される

これを使うと、入力ミスが激減します！**必ず使ってください。**

---

# 今日の練習流れ

「入力 → 確認」のサイクルで進めます。各ステップで✅チェックマークがついたら次へ進んでください。

---

# Step 1: 今どこにいる？

### 現在の場所を確認：`pwd`

```bash
pwd
```

**期待される出力**:
```
/home/coder
```

✅ `/home/coder` と表示されたらOK！

---

### ファイル/フォルダを確認：`ls`

```bash
ls
```

何が表示されましたか？（ファイルやフォルダの一覧が見えるはず）

---

# Step 2: フォルダ移動の基本

### ホームディレクトリに移動

```bash
cd ~
pwd
```

**期待される出力**:
```
/home/coder
```

✅ `/home/coder` と表示されたらOK！

**ポイント**:
- `~` (チルダ) = ホームディレクトリの省略形
- `cd` だけで `Enter` を押しても同じ効果

---

### 作業用フォルダに移動

```bash
cd workspace
pwd
```

**期待される出力**:
```
/home/coder/workspace
```

✅ `/home/coder/workspace` と表示されたらOK！

---

# Step 3: Tab補完の練習 ⭐

**ここが一番大事！** Tab補完を体に覚えさせましょう。

### 練習1: Tab補完で移動

```bash
cd w
```

ここで `Tab` キーを押してください → 自動で `workspace` に補完されます！

補完されたら `Enter` を押して移動。

### 練習2: Tab補完で確認

```bash
ls w
```

`Tab` キーを押すと、候補が表示されます。もう一度 `Tab` を押すと補完されます。

✅ Tab補完が使えるようになった！

---

# Step 4: フォルダを作る

### 練習用フォルダ作成：`mkdir`

```bash
mkdir test
ls
```

`test` というフォルダが作成されたことを確認。

### 作成したフォルダに移動

```bash
cd test
pwd
```

**期待される出力**:
```
/home/coder/workspace/test
```

✅ 作成して移動できたらOK！

---

# Step 5: 一つ上に戻る

### 親ディレクトリに移動：`cd ..`

```bash
cd ..
pwd
```

**期待される出力**:
```
/home/coder/workspace
```

✅ `/home/coder/workspace` に戻れたらOK！

**ポイント**:
- `..` = 一つ上のフォルダ（親ディレクトリ）
- `.` = 今いるフォルダ（カレントディレクトリ）

---

# Step 6: 作ったフォルダを削除

### フォルダ削除：`rm -r`

```bash
rm -r test
ls
```

`test` フォルダが消えていることを確認。

**ポイント**:
- `rm -r` = フォルダと中身を全て削除
- **注意**: 削除は取り返せません！

✅ 削除できたらOK！

---

# 応用：階層構造を作ってみよう

目標：以下のフォルダ構造を作る

```text
project/
├── data/
└── results/
```

### 実践

1. `project` フォルダを作る
2. `project` に移動
3. `data` と `results` を作る
4. 一つずつ移動して確認

**ヒント**: Tab補完を活用！

### 実行例（答え）

```bash
mkdir project
cd pro[TAB]
ls
mkdir data results
ls
cd da[TAB]
pwd
cd ..
cd re[TAB]
pwd
```

**期待される出力**:
```
/home/coder/workspace/project
/home/coder/workspace/project/results
```

✅ 全てのフォルダを作成できたらOK！

---

# 重要なディレクトリ指定方法

| 指定 | 意味 |
|------|------|
| `./` | 今いるフォルダ |
| `../` | 一つ上のフォルダ |
| `~` | ホームディレクトリ |

**例**:
```bash
cd ./data        # 今いるフォルダの中のdataへ
cd ../data       # 一つ上のフォルダの中のdataへ
cd ~/workspace   # ホームのworkspaceへ
```

---

# 完成チェック！

## 基礎編（必須）

以下の操作ができるようになったらOK！

- [ ] `pwd` で現在の場所を表示できる
- [ ] `ls` でファイル/フォルダを確認できる
- [ ] `cd` でフォルダを移動できる
- [ ] `cd ..` で一つ上に戻れる
- [ ] `mkdir` でフォルダを作れる
- [ ] `rm -r` でフォルダを削除できる
- [ ] **Tabキーで補完が使える！** ←これが一番重要

## 実践編（Qiime2で必要）

Qiime2解析に向けて、以下の操作もできるようになりましょう：

- [ ] `cat` でファイル内容を確認できる
- [ ] `less` で大きなファイルを閲覧できる（`q`で終了）
- [ ] `echo` で変数の中身を確認できる
- [ ] `echo > file` で簡単なファイルを作成できる
- [ ] `変数='値'` で変数を設定できる
- [ ] `cp` でファイルをコピーできる
- [ ] `mv` でファイルを移動・名前変更できる
- [ ] `wget` でファイルをダウンロードできる
- [ ] `grep` でファイル内を検索できる

全てチェックできましたか？素晴らしい！Qiime2解析の準備が整いました！🎉

**📝 次のステップ：nanoエディタを使ってファイルを自由に作成・編集したい！**

→ [02_nanoの使い方](02_nanoの使い方.md) で詳しく学びましょう！

---

# 補足：エラーへの対処法

Linuxではエラーが出るのは普通です。慌てずにエラーメッセージを読みましょう。

**よくあるエラー例**:

```
No such file or directory
```
→ ファイル名が間違っています。Tab補完を使って確認しましょう。

```
command not found
```
→ コマンドのスペルミスです。

**重要**: エラーが出たら、無視せずにしっかり読んで対処すること！

# 実践：Qiime2解析で使うテクニック

Qiime2の解析では、ファイルの閲覧や変数の設定など、より実践的な操作が必要です。

### Step 1: テキストファイルの中身を確認

まず、サンプルフォルダを作成します：

```bash
cd ~/workspace
mkdir practice
cd practice
```

#### サンプルファイルを作成

簡単なコマンドでファイルを作ります：

```bash
echo "Hello, Qiime2!" > sample.txt
```

#### ファイルの中身を確認：`cat`

```bash
cat sample.txt
```

**期待される出力**:
```
Hello, Qiime2!
```

✅ `Hello, Qiime2!` と表示されたらOK！

---

**📝 テキストファイルを自分で作成・編集したい？**

`nano`エディタの使い方は、次の章で詳しく説明しています！

→ [02_nanoの使い方](02_nanoの使い方.md)

---

### Step 2: 大きなファイルの閲覧：`less`

Qiime2では、ログファイルやデータファイルを閲覧することがよくあります。

#### 大きなファイルを作成

```bash
seq 1 1000 > numbers.txt
```

これで1〜1000までの数字を含むファイルを作成しました。

#### lessで閲覧

```bash
less numbers.txt
```

**操作方法**:
- `↓` または `Space`: 下にスクロール
- `↑` または `b`: 上にスクロール
- `/文字`: 検索（例：`/500` で500を検索）
- `q`: 終了

✅ `q` で終了できたらOK！

---

### Step 2: 変数を使ってみる

Qiime2では、配列情報を変数に保存して使います。

#### 変数の設定と確認

```bash
MY_PRIMER='ATCGATCG'
echo $MY_PRIMER
```

**期待される出力**:
```
ATCGATCG
```

✅ `ATCGATCG` と表示されたらOK！

#### 複数の変数を使う

```bash
FWD='CCTACGGGNGGCWGCAG'
REV='GACTACHVGGGTATCTAATCC'
echo $FWD
echo $REV
```

✅ 両方の配列が表示されたらOK！

---

**💡 変数をファイルに保存する**

```bash
echo $FWD > primer.txt
cat primer.txt
```

✅ ファイルに保存できたらOK！

---

### Step 3: ファイルのコピーと移動

#### ファイルのコピー：`cp`

```bash
cp sample.txt sample_backup.txt
ls
```

`sample_backup.txt` が作成されたことを確認。

#### ファイルの移動/名前変更：`mv`

```bash
mv sample_backup.txt renamed.txt
ls
```

`sample_backup.txt` が消え、`renamed.txt` ができていることを確認。

✅ コピーと移動ができたらOK！

---

### Step 4: ファイルのダウンロード：`wget`

Qiime2では、分類器などのデータをダウンロードします。

#### サンプルデータをダウンロード

```bash
wget https://raw.githubusercontent.com/Yokohide0317/2025_BI-Zissen/refs/heads/main/01_Linux%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89.md
```

ダウンロードが完了したら、中身を確認：

```bash
cat primer-sequence.txt
```

✅ ファイルがダウンロードできて、中身が見えたらOK！

---

### Step 5: ファイルの内容を検索

特定の文字列がファイルに含まれているか検索します。

#### grepで検索

```bash
grep "ATCG" primer-sequence.txt
```

**期待される出力**: "ATCG" を含む行が表示される

#### 特定の単語を検索（単語単位）

```bash
grep -w "sequence" primer-sequence.txt
```

✅ 検索ができたらOK！

---

# 実践的な課題：解析シミュレーション

以下のようなシナリオを想定して、実際の作業フローを練習しましょう。

### 課題：Qiime2解析の準備

1. `qiime_analysis/` というフォルダを作成
2. `data/` と `results/` サブフォルダを作成
3. `data/` に移動し、Primer配列を変数に設定
4. `data/` に `metadata.txt` を作成（echoで簡単に作成）
5. 作成したファイルを `results/` にコピー
6. `qiime_analysis/` に戻って構造を確認

### 実行例（ヒント）

```bash
cd ~/workspace
mkdir qiime_analysis
cd qiime_analysis
mkdir data results
cd data
FWD='CCTACGGGNGGCWGCAG'
REV='GACTACHVGGGTATCTAATCC'
echo $FWD > primer.txt
echo $REV >> primer.txt
echo "sample-id,treatment" > metadata.txt
echo "sample1,control" >> metadata.txt
echo "sample2,treatment" >> metadata.txt
cp primer.txt ../results/
cp metadata.txt ../results/
cd ..
ls -R
```

✅ フォルダ構造とファイルの中身を確認して完了！

---

## ここで学んだコマンドのまとめ

| コマンド | Qiime2での用途 |
|---------|---------------|
| `cat` | ファイル内容の確認 |
| `less` | ログファイルの閲覧 |
| `echo` | 変数の中身の確認、ファイル作成 |
| `='...'` | Primer配列などの変数設定 |
| `cp` | ファイルのバックアップ |
| `mv` | ファイルの名前変更・移動 |
| `wget` | 分類器のダウンロード |
| `grep` | ログやデータの検索 |

**💡 テキストファイルを自分で作成・編集したい？**

メタデータファイルを手動で作成・編集したい場合は、次の章を参照！

→ [02_nanoの使い方](02_nanoの使い方.md)

これらはQiime2解析で実際に使うテクニックです！

---

---

# チャレンジ：より実践的なシナリオ

自信のある方は、より複雑なシナリオに挑戦してみましょう。

### シナリオ1: バッチ処理の準備

複数のサンプルデータを扱う準備をします。

```bash
cd ~/workspace
mkdir batch_analysis
cd batch_analysis

# サンプルフォルダの作成
mkdir -p raw_data/{sample1,sample2,sample3}
mkdir processed results/{tables,plots}

# 構造を確認
tree batch_analysis 2>/dev/null || ls -R batch_analysis
```

### シナリオ2: メタデータファイルの作成

各サンプルのメタデータを作成します。

```bash
cd batch_analysis
echo -e "sample-id\tcondition\treatment" > metadata.tsv
echo -e "sample1\tcontrol\tnone" >> metadata.tsv
echo -e "sample2\ttreatment\tdrugA" >> metadata.tsv
echo -e "sample3\ttreatment\tdrugB" >> metadata.tsv
```

保存して終了したら、内容を確認：

```bash
cat metadata.tsv
```

### シナリオ3: 設定ファイルの作成とバックアップ

解析パラメータを設定ファイルとして保存し、バックアップを作成します。

```bash
cd batch_analysis

# 設定ファイル作成
cat > config.txt << EOF
[General]
version=2025.4
threads=4

[Primer]
forward=CCTACGGGNGGCWGCAG
reverse=GACTACHVGGGTATCTAATCC
EOF

# バックアップ作成
cp config.txt config_backup.txt
ls -lh config*
```

### シナリオ4: ログファイルの検索

解析中にログファイルを検索する練習です。

```bash
# サンプルログファイル作成
cat > analysis.log << EOF
[INFO] Starting analysis...
[INFO] Importing data...
[ERROR] Sample2 quality check failed
[INFO] Denoising sample1...
[INFO] Denoising sample3...
[WARN] Low read count in sample1
[INFO] Taxonomy classification complete
EOF

# エラーのみを検索
grep ERROR analysis.log

# 警告を検索
grep WARN analysis.log

# 情報メッセージを数える
grep -c INFO analysis.log
```

✅ 各ステップで期待通りの結果が得られたら完了！

---

# トラブルシューティング実習

Linuxコマンドでよくあるトラブルと解決方法を練習します。

### トラブル1: ファイル権限の問題

```bash
cd ~/workspace/practice
cat testfile.txt
```

このコマンドがエラーになる場合：

```bash
ls -l testfile.txt
```

権限がない場合の対処方法を確認（読み取り専用など）

### トラブル2: スペースを含むファイル名

```bash
cd ~/workspace/practice
touch "my data.txt"
ls
```

スペースを含むファイル名の扱い方：

```bash
# 正しい方法
cat "my data.txt"

# 間違った方法
cat my data.txt  # これはエラーになる
```

### トラブル3: 隠しファイルの表示

```bash
ls -a
```

`.`で始まる隠しファイルが見えますか？

```bash
cat .bashrc 2>/dev/null || echo "No .bashrc file"
```

---

# 参考コマンド一覧

| コマンド | 説明 | 使用例 |
|---------|------|--------|
| `pwd` | 現在の場所を表示 | `pwd` |
| `ls` | ファイル/フォルダ一覧 | `ls`<br>`ls -l`（詳細表示） |
| `cd` | フォルダ移動 | `cd data`<br>`cd ..`<br>`cd ~` |
| `mkdir` | フォルダ作成 | `mkdir data`<br>`mkdir -p a/b/c`（階層ごと作成） |
| `rm` | ファイル削除 | `rm file.txt` |
| `rm -r` | フォルダ削除 | `rm -r data/` |
| `cp` | コピー | `cp file1.txt file2.txt` |
| `mv` | 移動/名前変更 | `mv file.txt data/`<br>`mv old.txt new.txt` |
| `cat` | ファイル内容表示 | `cat file.txt` |

---

# おめでとうございます！🎉

Linuxコマンドの基本をマスターしました！

**キーポイント**:
- Tab補完を常に使うこと！
- `pwd`, `ls`, `cd`, `mkdir`, `rm -r` が使えること
- エラーが出ても慌てずに読むこと

次はnanoエディタの使い方を学びましょう！

→ [02_nanoの使い方](02_nanoの使い方.md)
