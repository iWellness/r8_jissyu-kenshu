# Web教科書 編集ガイド

教材の正本は `src/content/lessons/` のMDXです。ルートの旧Markdownは移行元の記録で、サイト更新時に二重編集しません。コマンド原文は `src/snippets/`、画像は `src/assets/` で管理します。

## ローカル確認

Node.js 24を使い、`npm ci`の後に`npm run dev`で確認します。提出前は`npm run validate`を実行します。

## 章のメタデータ

frontmatterには`slug`、`order`、`title`、`description`、`objectives`、`prerequisites`、`environment`を定義します。`slug`は英小文字・数字・ハイフン、`order`は重複しない0以上の整数です。任意の`reviewedAt`は実際に内容を確認したISO日付だけを指定します。

## CommandBlock

実行文字列を表示し、同じ原文をコピーします。snippetを`?raw`でimportして`code`へ渡します。

```mdx
<CommandBlock
  id="linux-pwd" code={checkLocation} language="bash"
  kind="command" context="ターミナル" title="現在地を確認"
/>
```

公開Props:

- `id`（必須）: ページ内で一意のID。
- `code`（必須）: 表示・コピーする原文。
- `language`（任意）: Shikiの言語。既定値は`bash`。
- `kind`（任意）: `command`、`template`、`practice`、`prompt`。既定値は`command`。
- `context`（必須）: 入力場所。
- `title`（任意）: コマンドの目的。
- `replacementNotes`（templateで必須）: 書き換える値の説明。

`practice`はTab補完など途中入力の練習用で、コピー操作を表示しません。

## ExpectedOutput

出力例を表示し、コピー操作は付けません。`code`は必須です。`caption`と`language`は任意で、既定値は「期待される出力」と`text`です。

## Callout

`title`は必須です。`type`は`note`、`warning`、`check`で、既定値は`note`です。必須手順を折り畳みの中へ入れません。

## Figure

静的importした画像を`src`へ渡します。`src`、操作内容を表す`alt`、表示用の`caption`はすべて必須です。

## 編集時の確認

- ページ本文にh1を書かない。ページタイトルはレイアウトが生成します。
- 一緒に実行するコマンドだけを一つのsnippetにまとめます。
- `$HOME`、引用符、バックスラッシュ、タブを整形目的で変更しません。
- 出力例はExpectedOutputを使います。
- QIIME 2の版や分類器URLは講座の指定を確認してから更新します。
- 公開Propsや動作を追加した場合は、この文書とテストを更新します。
