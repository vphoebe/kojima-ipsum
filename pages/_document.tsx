import Document, { Html, Head, Main, NextScript } from 'next/document'

class KIDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://use.typekit.net/zvf4bjw.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default KIDocument
