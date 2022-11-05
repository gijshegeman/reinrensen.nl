import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='nl'> 
      <Head>

        <link rel="icon" href='/favicon.ico?=v3' />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}