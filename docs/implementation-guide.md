# Web教科書 実装指示書

作成日: 2026-09-08

対象: 本リポジトリでサイトを実装する開発者・コーディングエージェント
仕様の正本: [設計書](site-design.md)

## 1. 実装するもの

既存の実習研修教材7章を、Astro + MDX + TypeScriptで静的なWeb教科書へ移行する。GitHub Pagesへ配信できる成果物とCIを作る。最重要要件は、受講者がコマンドを正確にコピーできること。

この指示書自体はデプロイ操作を実行したことを意味しない。実装・公開の実行範囲は、その作業時のユーザー指示に従う。指示が実装までの場合、ローカル検証と公開可能な成果物の準備まで完了させる。

## 2. 作業上の制約

- 作業開始時は`ls`を実行し、作業ディレクトリに`summary.md`があれば先に読む。適用されるAGENTS.mdを確認する。
- 親ディレクトリへ移動したり、親のファイルを読んだりしない。作業は本リポジトリ内で行う。
- 既存の未コミット変更を尊重する。設計書作成時には未追跡の`.omo/`があった。中身を上書き・削除しない。
- 本文にあるインストールや解析コマンドを、サイト実装のために実行しない。
- 新機能・不具合修正にはテストを追加する。公開する部品と関数には型・仕様・使用例を文書化する。
- 秘密情報をコードへ埋め込まない。Pythonの依存導入が必要な場合はuvを使う。

## 3. 目標ディレクトリ

```text
astro.config.mjs
package.json
package-lock.json
tsconfig.json
src/
  content.config.ts
  content/lessons/           # 7章のMDX、章メタデータ
  snippets/                 # 章別のUTF-8 .txt原文
  assets/                   # 教材画像
  components/
    CourseList.tsx
    CommandBlock.astro
    ExpectedOutput.astro
    Callout.astro
    Figure.astro
    ChapterNav.astro
    TableOfContents.astro
    Search.astro
    ui/                       # shadcn/uiで生成した共通部品
  layouts/LessonLayout.astro
  pages/
    index.astro
    404.astro
    lessons/[slug].astro
  lib/                      # URL生成、原文正規化、章順検証
  scripts/                  # コピー・拡大・メニュー用ブラウザー処理
  styles/
    tokens.css
    global.css
    print.css
public/                     # 公開することを選んだ静的ファイルのみ
scripts/                    # ビルド成果物のリンク検査等
tests/
  unit/
  e2e/
  fixtures/
docs/
  site-design.md
  implementation-guide.md
  authoring.md              # 実装時に作成
  migration-log.md          # 実装時に作成
.github/workflows/
  ci.yml
  deploy.yml
```

既存の原稿・img・dataは移行中そのまま保持する。ルート全体を公開ディレクトリにしない。

## 4. 実装の順序

### Phase 1: 教材棚卸しと足場

1. 各原稿の見出し、画像、コマンド、出力例、外部リンクを棚卸しする。`docs/migration-log.md`に移行先と状態を記録する。
2. 実Gitリモートと既定ブランチを確認し、Pagesの`site`/`base`候補を記録する。未確認の所有者名を推測で固定しない。
3. 公式資料で互換性を確認してAstro・MDX・検証ツールを選び、package-lock.jsonとNodeバージョンを固定する。
4. `output: 'static'`、末尾スラッシュ付きURL、TypeScript strict、プロジェクト内importエイリアスを設定する。
5. Content Collectionsのスキーマを作る。slug・order重複や必須値欠落はビルドを失敗させる。

完了条件: 空のトップと1章がbaseパス配下で静的生成でき、データ不備をテストで検知する。

### Phase 2: 実習画面とコマンド部品

1. Tailwind CSS 4とshadcn/ui（Base UI版）を導入し、設計書の配色・幅・ブレークポイントで共通レイアウトを作る。
2. CommandBlockとExpectedOutputを先に実装する。原文の読み込み、正規化、表示、コピーの経路を一本化する。
3. Clipboard APIの成功・失敗・非対応状態を実装し、成功前に成功通知を出さない。
4. ハイライト、出力、行番号、ラベルがコピー原文に混ざらないことを検証する。
5. Callout、Figure、モバイルナビを実装する。拡大画像とメニューは閉じる操作・フォーカス復帰まで対応する。

完了条件: 複数行のBashとPython、依頼文、出力例、Tab練習を同じ画面に配置し、仕様どおり操作できる。

### Phase 3: 代表2章を移行

1. Linuxコマンド章とQIIME 2解析章をMDXへ移行する。
2. 一緒に実行する単位でコードを分割する。変数定義とその使用の前後関係を維持し、前のブロックを実行する必要がある場合は明記する。
3. Tab練習をpractice、DADA2の値の書き換えをtemplateとして表示する。
4. 原稿の行継続欠落等を修正する際は、変更理由と根拠をmigration-logへ記載する。指定バージョンのCLI仕様は公式資料で確認する。
5. 半幅ウィンドウとスマートフォン幅で画面を確認し、全章に広げる前に部品の問題を解消する。

完了条件: 短いコマンドと長い解析コマンドを、通常選択・ボタンの両方で正確にコピーできる。

### Phase 4: 全章・検索・移行記録

1. 残り5章とトップを移行し、章メタデータからナビと前後リンクを生成する。
2. h1を1つに統一し、ページ内目次はレンダー済み見出しと同じIDから生成する。
3. 画像の説明と拡大、教材データの明示的リンク、404、印刷CSSを完成する。
4. Astro build後にPagefindを実行する。`dist/`に索引がある状態で本番相当テストを行う。
5. READMEに新しい編集先・プレビュー・テスト・公開の手順を書く。旧原稿との二重更新は不要と明記する。
6. authoring.mdに、章追加、コマンド追加、出力例、注意枠、画像、リンク、全公開Propsの使用例を書く。

完了条件: 全章の移行対応表が埋まり、未解決の教材上の疑問とサイトの不具合を区別して報告できる。

### Phase 5: CIと公開準備

以下のnpm scriptsを用意する。名称を変更する場合は文書とCIを合わせて修正する。

| コマンド | 必須の処理 |
| --- | --- |
| `npm run dev` | 開発サーバー |
| `npm run check` | Astro check、型検査 |
| `npm run test` | Vitestの非watch実行 |
| `npm run build` | Astro build、続けてPagefind生成 |
| `npm run test:links` | dist内の内部リンク・画像・アンカー・アセット検査 |
| `npm run test:e2e` | ビルド済みサイトを配信してPlaywright実行 |
| `npm run preview` | 検索索引を含むビルド成果物の確認 |

CIの順序は`npm ci → check → test → build → test:links → test:e2e`。Playwrightのブラウザー導入もCI内で明示する。開発サーバーだけを検証して完了にしない。

PRでは検証のみ。実際の既定ブランチへのpushとworkflow_dispatchでは、同じ検証を通過したコミットの`dist/`をPages artifactとしてアップロードし、公開jobへ渡す。再ビルドで別の成果物を作らない。

公開jobだけに`pages: write`と`id-token: write`を付け、buildは原則`contents: read`。GitHub PagesのSourceはGitHub Actions。Actionsの版は実装時に公式資料で確認し、SHA固定する場合は版のコメントを添える。Pagefindを含む完成したdistを公開するため、ビルドとartifact uploadを明示的に分ける。

本番URL確認ではトップ、章の直接アクセス、コピー、画像、検索、404を確認する。直前の正常コミットを再デプロイできる手順をREADMEに残す。

## 5. 必須テスト

| 分類 | ケース | 合格条件 |
| --- | --- | --- |
| 原文 | LF/CRLF、末尾改行、タブ、空白、引用符、`$()`、`<SAMPLE>` | 定義したLF正規化と末尾LF除去以外を変更しない |
| コピー | ボタンが複数あるページ | 選んだブロックだけを書き込む |
| コピー | 長いQIIMEコマンド | 行継続・インデント・内部空行を維持する |
| コピー | API成功/拒否/非対応 | 成功時だけ成功通知。失敗時は選択コピーの案内 |
| 種別 | output/practice/template/prompt | 出力と練習にボタンなし。templateとpromptに適切なラベル |
| HTML | `<`、`>`、`&`を含むコード | 文字として表示され、要素やスクリプトにならない |
| 教材修正 | DADA2行継続の回帰fixture | `--p-n-threads`が単独行のコマンドとして分離しない。対象箇所の期待原文も照合 |
| 構造 | slug/order重複、欠落、見出し | 不正メタデータは失敗。h1は各ページ1つ |
| 配信 | `/r8_jissyu-kenshu/`相当のbase | トップ・深いURL・画像・検索索引・404が参照可能 |
| 検索 | 環境、インストール、DADA2、conda activate | 対応章がヒットし、遷移可能 |
| 検索 | 0件、索引取得失敗 | 状態を区別し、ナビは使用可能 |
| 画面 | 1440/768/390px、200%拡大 | 本文と操作が欠けない。コードだけ枠内スクロール |
| 操作 | キーボード、画像拡大、メニュー | 開閉、Esc、フォーカス復帰が動く |
| 基本機能 | JavaScript無効 | 本文・通常リンク・原文の手動コピーが使用可能 |

PlaywrightはChromiumとWebKitで主要操作を検証する。Clipboard APIの権限・対応差はモックで成功/拒否を網羅し、対応するブラウザーでは実クリップボード内容も確認する。コピー値をDOMから作った期待値だけと比較せず、元テキストfixtureから求めた期待値と比較する。

リンク検査は内部参照を必須とする。外部サイトの一時障害だけでCIを不安定にせず、外部教材リンクは公開前レビューで到達性と内容を確認する。シェル構文検査だけでQIIME 2の実行可能性を保証したと報告しない。

## 6. 完了報告に含めるもの

- 実装した機能と、全7章の移行結果。
- 実行した検証・結果・確認した画面幅。
- 原文から修正したコマンド、理由、確認根拠。
- 実習環境が必要で未検証の項目、公開を妨げる未完了項目。
- ローカル起動方法、編集方法、公開設定。公開した場合は実URL。

完成の判断は設計書の「初版の完成条件」に従う。ログインや進捗保存などの追加機能へ範囲を広げない。
