import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <script src="https://kit.fontawesome.com/544f5f1654.js" crossOrigin="anonymous"></script>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap');
            </style>
            
            
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
