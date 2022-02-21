import '../styles/globals.css';
import Head from 'next/head';
import Sidebar from '../components/sidebar/sidebar';

function MyApp({ Component, pageProps }) {

  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-gray-600 text-white">
      <Head>
        <title>skript.help</title>
        <meta name="description" content="Learn Skript not by watching, but by doing!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="fixed left-0 top-0 flex flex-row">
        <Sidebar />
        <div className="ml-[12.75rem]">
          <Component {...pageProps} />
        </div>
      </main>
    </div>
  );
}

export default MyApp;