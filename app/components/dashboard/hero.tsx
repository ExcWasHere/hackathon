import React, { useState } from 'react'
import { BiChevronRight } from 'react-icons/bi';
import { BsCpu } from 'react-icons/bs';
import { requestToAI } from '~/utils/groq';

export default function DashboardMain() {
  const [inputValue, setInputValue] = useState("");
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!inputValue.trim()) return;
    setIsLoading(true);
    try {
      const response = await requestToAI(inputValue);
      setPrompt(response ?? "");
    } catch (error) {
      console.error("Error fetching prompt:", error);
      setPrompt("An error occurred while fetching the response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-indigo-400">Hello</span>
              <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                ,
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light">
              What can I do for you?
            </p>
          </div>
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input
                type="text"
                className="w-full px-6 py-4 rounded-2xl bg-gray-800/50 border border-gray-700
                         text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2
                         focus:ring-indigo-500 focus:border-transparent transition-all duration-200
                         shadow-lg backdrop-blur-sm"
                placeholder="Ask anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                onClick={handleClick}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl
                         bg-indigo-500 hover:bg-indigo-600 text-white transition-colors
                         duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                disabled={isLoading || !inputValue.trim()}
              >
                <BiChevronRight
                  size={24}
                  className={`transform transition-transform duration-200
                           ${isLoading ? "rotate-90" : ""}`}
                />
              </button>
            </div>
          </form>
          {prompt && (
            <div className="flex flex-col items-start space-y-4">
              <div className="flex items-center space-x-2 bg-gray-800/30 px-4 py-3 rounded-lg border border-gray-700/50">
                <div className="px-2 py-2 border-2 rounded-lg">
                  <BsCpu size={20} />
                </div>
                <h1 className="text-xl font-semibold">Groq</h1>
              </div>
              <div
                className="mt-8 p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50
                         backdrop-blur-sm shadow-xl transition-all duration-300 ease-in-out"
              >
                <div className="prose prose-invert max-w-none">{prompt}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

