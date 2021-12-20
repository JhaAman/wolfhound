import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Page } from "../global";
import LandingLayout from "../layout/LandingLayout";
import Meta from "./_components/landing/Meta";

const Home: Page = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <div className="px-6 py-8 bg-white rounded-lg shadow-xl dark:bg-gray-900 ring-1 ring-gray-900/5">
      {/* Dark Mode */}
      <div>
        <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
          {/* A button to switch dark mode */}
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="flex items-center justify-center transition-all bg-gray-200 rounded-lg w-9 h-9 dark:bg-gray-600 hover:ring-2 ring-gray-300"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 text-gray-800 dark:text-gray-200"
              >
                {resolvedTheme === "dark" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
          </button>
        </span>
      </div>

      {/* The Auth testing */}
      <h3 className="mt-5 text-base font-medium tracking-tight text-gray-900 dark:text-white">
        Writes Upside-Down
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        The Zero Gravity Pen can be used to write in any orientation, including
        upside-down. It even works in outer space.
      </p>
    </div>
  );
};

// Attach the landing layout (and other nested layouts) to the page
Home.getLayout = (page) => {
  return (
    // Attach the Landing layout with a meta component, decide on header/footer
    <LandingLayout
      meta={<Meta title="Title" description="Description" />}
      headerActive={false}
      footerActive={false}
    >
      {page}
    </LandingLayout>
  );
};

export default Home;
