import Head from "next/head";
import { ChangeEvent, useState } from "react";

const HomePage = () => {
  const [input, setInput] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const generatePost = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const { output } = await response.json();

      setApiResponse(output.text.toString());
    } catch (error) {
      setApiResponse("Something went wrong. Please try again later.");
    }
    setIsLoading(false);
  };

  return (
    <div className="">
      <Head>
        <title>GPT-3 Blog Writer</title>
      </Head>
      <div className="container mx-auto">
        <div className="container">
          <div className="header mb-6">
            <div className="header-title">
              <h1 className="text-4xl font-bold mt-4">GPT-3 Blog Writer</h1>
            </div>
            <div className="header-subtitle">
              <h2>Easily write blog posts using GPT-3</h2>
            </div>
          </div>
          <div className="prompt-container flex flex-col gap-4 items-end">
            <textarea
              onChange={handleInput}
              value={input}
              placeholder="start typing here"
              className="w-full h-48 bg-slate-900 text-slate-200 p-4 rounded-2xl"
            />
            <button
              className="rounded-full bg-red-600 text-white font-bold px-6 py-4 disabled:opacity-50"
              disabled={isLoading}
              onClick={generatePost}
            >
              {isLoading ? "Loading..." : "Generate"}
            </button>
          </div>

          {apiResponse && (
            <div
              className="response-container mt-6"
              dangerouslySetInnerHTML={{
                __html: apiResponse.replaceAll("\n", "<br />"),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
