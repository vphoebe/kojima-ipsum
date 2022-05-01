import Document, { Html, Head, Main, NextScript } from 'next/document'

class KIDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://use.typekit.net/zvf4bjw.css" rel="stylesheet" />
          <meta
            property="og:image"
            content="https://kojima-ipsum.sjw.zone/public/og.png"
          />
          <meta
            name="description"
            content="Create lorem ipsum text using words, characters, and locations from Hideo Kojima's games."
          />
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
