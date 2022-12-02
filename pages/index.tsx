import Head from "next/head";

const HomePage = () => {
  return (
    <div className="">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1 className="text-3xl font-bold">
              sup, insert your headline here
            </h1>
          </div>
          <div className="header-subtitle">
            <h2>insert your subtitle here</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
