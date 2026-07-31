# nanoエディタの使い方

## はじめに：テキストファイルとは？

### テキストファイルって何？

テキストファイルとは、**文字だけで書かれたファイル**です。

**身近な例**:
- WordやPowerPoint文書 → 装飾やフォント情報が含まれている（テキストファイルではない）
- メモ帳のファイル → 文字だけ（テキストファイル）
- プログラムのソースコード → 文字だけ（テキストファイル）

**生物情報解析でのテキストファイル例**:
- `manifest.tsv` → サンプル情報を記述したファイル
- `metadata.tsv` → サンプルの属性（条件、処理など）を記述
- `config.txt` → 解析パラメータを設定したファイル

**重要**: Qiime2のような解析ツールは、テキストファイルを読み込んで処理します。

---

## nanoとは？

**nano** = Linuxで使えるシンプルなテキストエディタ

**特徴**:
- マウス不要：キーボードだけで操作
- シンプル：Wordのような複雑な機能はない
- 保存と終了が簡単

**使う理由**:
- サーバー上でファイルを直接作成・編集できる
- メタデータファイルや設定ファイルを作るのに便利

---

# nanoの基本操作

### 起動方法

```bash
nano ファイル名.txt
```

**例**:
```bash
nano test.txt
```

**画面の見方**:
```
GNU nano 7.2                                      test.txt


^G Get Help   ^O Write Out  ^R Read File ^Y Prev Page ^K Cut Text  ^C Cur Pos
^X Exit       ^J Justify    ^W Where Is  ^V Next Page ^U Uncut Text^T To Spell
```

- 上の部分：現在のファイル名
- 下の部分：コマンド一覧
- **`^` は `Ctrl` キーを意味します**

---

### nanoの基本コマンド

| コマンド | 操作 | 説明 |
|---------|------|------|
| `Ctrl + X` | 終了 | nanoを終了する |
| `Ctrl + O` | 保存 | ファイルを保存する |
| `Ctrl + R` | 読み込み | 他のファイルを読み込む |
| `Ctrl + W` | 検索 | 文字列を検索 |
| `Ctrl + K` | 切り取り | 行を切り取る |
| `Ctrl + U` | 貼り付け | 切り取った行を貼り付ける |
| `Ctrl + G` | ヘルプ | ヘルプを表示 |

**重要**: `Ctrl + X` → `Ctrl + O` → `Enter` → `Ctrl + X` で保存して終了

---

# 実践演習

## 演習1: 初めてのファイルを作成

### Step 1: nanoを起動

```bash
cd ~/workspace
mkdir practice
cd practice
nano hello.txt
```

### Step 2: テキストを入力

以下のテキストを入力してください：

```
Hello, Qiime2!
これはテキストファイルです。
```

### Step 3: 保存して終了

1. `Ctrl + O` を押す
2. 「File Name to Write: hello.txt」が表示される
3. `Enter` を押す
4. 「File written to hello.txt」が表示される
5. `Ctrl + X` を押して終了

### Step 4: 作成したファイルを確認

```bash
cat hello.txt
```

**期待される出力**:
```
Hello, Qiime2!
これはテキストファイルです。
```

✅ ファイルが作成され、内容が表示されたらOK！

---

## 演習2: 既存のファイルを編集

### Step 1: 既存のファイルを開く

```bash
nano hello.txt
```

### Step 2: 行を追加

最後の行に追加：

```
Hello, Qiime2!
これはテキストファイルです。
nanoは便利ですね！
```

### Step 3: 保存して終了

1. `Ctrl + O` → `Enter`
2. `Ctrl + X`

### Step 4: 確認

```bash
cat hello.txt
```

**期待される出力**:
```
Hello, Qiime2!
これはテキストファイルです。
nanoは便利ですね！
```

✅ 編集できたらOK！

---

## 演習3: メタデータファイルを作成（Qiime2で必要）

Qiime2で実際に使うTSV形式（タブ区切り）のファイルを作ります。

### Step 1: TSVファイルを作成

```bash
nano metadata.tsv
```

### Step 2: ヘッダーとデータを入力

以下をコピーして貼り付け（`Ctrl + Shift + V` で貼り付け可能）：

```tsv
sample-id	treatment	group
sample1	control	A
sample2	drugA	B
sample3	drugB	B
```

**重要**: 各項目は**Tabキー**で区切ってください！スペースではありません。

### Step 3: 保存して終了

1. `Ctrl + O` → `Enter`
2. `Ctrl + X`

### Step 4: ファイル形式を確認

```bash
cat metadata.tsv
```

タブで区切られていることを確認。

### Step 5: TSVとして認識されているか確認

```bash
head -n 2 metadata.tsv | cat -A
```

Tabは `^I` として表示されます。

✅ TSVファイルが作成できたらOK！

---

# よくあるトラブルと解決方法

## トラブル1: 保存せずに終了しようとした

**現象**:
```
Save modified buffer? (Answering "No" will discard changes)
```

**解決方法**:
- `Y` → 保存して終了
- `N` → 保存せずに終了（変更は破棄）
- `Ctrl + C` → 終了をキャンセル

---

## トラブル2: Tabキーが効かない

**現象**: スペースが入ってしまう

**解決方法**:
- ターミナルの設定による場合があります
- スペースではなくTabで区切られている必要があるファイルでは注意

**確認方法**:
```bash
cat -A filename.txt | grep " "  # スペースが含まれているか確認
```

---

## トラブル3: 日本語入力ができない

**解決方法**:
- `Ctrl + Space` または `Ctrl + Shift + Space` でIME切り替え
- ターミナルの設定による

---

## トラブル4: ファイルを間違えて編集してしまった

**解決方法**:
- 変更を破棄して終了: `Ctrl + X` → `N`
- バックアップを作成してから編集することをお勧め

```bash
cp original.txt original_backup.txt
nano original.txt  # 元のファイルを編集
```

---

# 実践課題：Qiime2解析の準備

以下のシナリオで、実際の作業を練習しましょう。

### 課題: メタデータと設定ファイルの作成

1. `qiime_prep/` フォルダを作成
2. `metadata.tsv` を作成（以下の内容）
3. `primer_config.txt` を作成（以下の内容）
4. 両方のファイルの内容を確認

### metadata.tsv

```tsv
sample-id	timepoint	condition
sample1	t1	control
sample2	t1	treatment
sample3	t2	control
sample4	t2	treatment
```

### primer_config.txt

```text
# Qiime2 Primer Configuration
[Primer]
forward=CCTACGGGNGGCWGCAG
reverse=GACTACHVGGGTATCTAATCC

[Parameters]
discard_untrimmed=true
min_length=200
```

### 実行例

```bash
cd ~/workspace
mkdir qiime_prep
cd qiime_prep

# metadata.tsv作成
nano metadata.tsv
# 内容を入力して保存終了

# primer_config.txt作成
nano primer_config.txt
# 内容を入力して保存終了

# 確認
cat metadata.tsv
cat primer_config.txt
```

✅ 両方のファイルが作成され、内容が正しく表示されたら完了！

---

# 完成チェック！

以下の操作ができるようになったらOK！

## 基本操作

- [ ] `nano` で新しいファイルを作成できる
- [ ] `Ctrl + X` で終了できる
- [ ] 作成したファイルを `cat` で確認できる

## 実践操作

- [ ] 既存のファイルを開いて編集できる
- [ ] TSVファイル（タブ区切り）を作成できる
- [ ] 設定ファイルやメタデータファイルを作成できる

## トラブル対応

- [ ] 保存せずに終了する方法を知っている（`Ctrl + X` → `N`）
- [ ] 変更を保存して終了する方法を知っている（`Ctrl + X` → `Y`）
