import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>수원대학교 학식 - 코집사</title>
        <meta
          name="description"
          content="수원대학교 학식 정보 웹사이트 입니다."
        />
        <link rel="canonical" href="https://suwon-u-dining.vercel.app/" />
        <meta property="og:title" content="수원대학교 학식 - 코집사" />
        <meta
          property="og:description"
          content="수원대학교 학식 정보 웹사이트 입니다."
        />
        <meta property="og:url" content="https://suwon-u-dining.vercel.app/" />
        <meta property="og:image" content="https://suwon-u-dining.vercel.app/images/logo.png" />
        <meta property="og:image:width" content="700" />
        <meta property="og:image:height" content="328" />
        <meta property="og:image:alt" content="수원대학교 이미지" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
