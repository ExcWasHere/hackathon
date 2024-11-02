// app/components/ErrorBoundary.tsx
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : 'Oops!'}
        </h1>
        <p className="text-gray-600 mb-8">
          {isRouteErrorResponse(error)
            ? error.data
            : 'Something went wrong. Please try again later.'}
        </p>
        <a
          href="/"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
    },
  },
  plugins: [],
}