import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Farming Helper - Support Center" },
    { name: "description", content: "Get help with your farming needs" },
  ];
};

export default function SupportHero() {
  const supportCategories = [
    {
      title: "FAQ",
      description:
        "Find answers to commonly asked questions about farming techniques, equipment, and best practices",
      icon: (
        <svg
          className="w-8 h-8 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Contact Us",
      description:
        "Get personalized support from our team of agricultural experts available 24/7",
      icon: (
        <svg
          className="w-8 h-8 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Help Center",
      description:
        "Access comprehensive guides, video tutorials, and documentation for all your farming needs",
      icon: (
        <svg
          className="w-8 h-8 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50">
      <img
        src="/support/autumn.jpeg"
        alt=""
        className="absolute w-full h-[50vh] object-cover"
      />
      <div className="absolute w-full h-[50vh] bg-gradient-to-t from-black to-transparent object-cover"></div>
      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Support Center
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Get the help you need to succeed in your farming endeavors. Our
            comprehensive support system is designed to assist you at every
            step.
          </p>
        </div>

        {/* Support Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {supportCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  {category.description}
                </p>

                <div className="mt-6 text-center">
                  <Link
                    to={`/support/${category.title.toLowerCase()}`}
                    className="inline-block bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors duration-300"
                  >
                    View All {category.title} Resources
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Support Banner */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <svg
                className="w-8 h-8 text-red-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-red-800">
                  Need Emergency Support?
                </h3>
                <p className="text-red-600">
                  Our emergency team is available 24/7
                </p>
              </div>
            </div>
            <Link
              to="/emergency"
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Get Emergency Help
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}
