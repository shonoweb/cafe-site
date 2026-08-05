# Cafe Lumière

自家焙煎コーヒーと手作りスイーツをテーマにした、営業提案にも耐えるクオリティのカフェ紹介サイトです。

## 構成

- `index.html` — ページ構造
- `style.css` — スタイル（レスポンシブ・アニメーション対応）
- `script.js` — メニュー切替・フォーム検証・パララックス・カウントアップなどの動作

## 使い方

リポジトリを取得後、`index.html` をブラウザで開くか、簡易サーバーを立てて確認してください。

```bash
python3 -m http.server 8000
```

`http://localhost:8000` にアクセスします。

## 実店舗へ導入する前に

現在、ヒーロー画像・About画像・ギャラリー6枚は **Unsplash の無料素材を仮置き** しています。実際の店舗に提案・納品する際は、以下を必ず実店舗の写真に差し替えてください。

- `index.html` 内の `images.unsplash.com` を含む `src` / `srcset` / `imagesrcset` / `og:image`（計8箇所: ヒーロー1・About1・ギャラリー6）
- 画像を差し替える際は、`width` / `height` 属性と `srcset` の解像度（500/800/1000pxなど）も実際の画像サイズに合わせて調整し、表示崩れ・レイアウトシフトを防いでください
- `<link rel="canonical" href="https://example.com/">` と `og:image` の URL は、本番ドメインが決まり次第更新してください
- 店名・住所・電話番号・営業時間などの店舗情報（`#access` セクション）はダミーです。実店舗の情報に置き換えてください

## パフォーマンス上の工夫

- ヒーロー画像は `fetchpriority="high"` + `<link rel="preload">` で最優先読み込み、それ以外の画像は `loading="lazy"` で遅延読み込み
- 全画像に `srcset` を設定し、画面サイズに応じた最適サイズを配信
- フォントは `display=swap` でテキストのブロッキングを回避
- パララックス演出はタッチデバイス・`prefers-reduced-motion` 環境では自動的に無効化
