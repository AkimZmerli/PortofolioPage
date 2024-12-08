import Head from "next/head";
import Terminal from "../../components/Terminal";

const Home: React.FC = () => {
  return (
    <div>
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
