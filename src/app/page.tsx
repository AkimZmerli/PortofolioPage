import Head from "next/head";

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="CLI Terminal Style Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Terminal />
      </main>
    </div>
  );
};

export default Home;
