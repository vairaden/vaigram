import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@600&family=Oxygen:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-white dark:bg-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
