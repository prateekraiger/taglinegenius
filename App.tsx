import React, { useState, useEffect } from "react";
import { generateTaglines } from "./services/geminiService";

// --- Type Definitions ---
type Theme = "light" | "dark";

// --- Icon Components (self-contained SVGs for simplicity) ---

const LogoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || "w-6 h-6"}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L14.5 9.5H22L16 14.5L18.5 22L12 17L5.5 22L8 14.5L2 9.5H9.5L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
    />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>
);

const CopyIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.125-2.25 2.25m0 0-2.25-2.25m2.25 2.25V17.25m-7.5-6.125h2.25"
    />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || "w-6 h-6"}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || "w-6 h-6"}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
      clipRule="evenodd"
    />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

const Spinner = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-dark dark:border-primary-light"></div>
);

// --- UI Sub-Components ---

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-light/80 dark:bg-dark/80 backdrop-blur-sm border-b border-primary-light/10 dark:border-primary-dark/10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="flex items-center gap-2" aria-label="Homepage">
            <LogoIcon className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold text-primary-light dark:text-primary-dark tracking-tight">
              TaglineGenius
            </span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-primary-light dark:text-primary-dark hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <MoonIcon className="w-5 h-5" />
              ) : (
                <SunIcon className="w-5 h-5" />
              )}
            </button>
            <a
              href="#"
              className="hidden sm:inline-block bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity text-sm"
            >
              Get Started
            </a>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full text-primary-light dark:text-primary-dark hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <XIcon className="w-5 h-5" />
                ) : (
                  <MenuIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-light/10 dark:border-primary-dark/10">
            <a
              href="#"
              className="block mt-2 text-center bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity text-sm"
            >
              Get Started
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

interface TaglineInputFormProps {
  userInput: string;
  setUserInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}
const TaglineInputForm: React.FC<TaglineInputFormProps> = ({
  userInput,
  setUserInput,
  handleSubmit,
  isLoading,
}) => (
  <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="e.g., TenZ 1v4 clutch vs LOUD"
        className="relative w-full p-4 pr-[115px] bg-light/80 dark:bg-dark/80 backdrop-blur-sm border border-secondary-light/20 dark:border-secondary-dark/20 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow text-primary-light dark:text-primary-dark placeholder-secondary-light dark:placeholder-secondary-dark"
        rows={3}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !userInput}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light font-semibold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center justify-center"
      >
        {isLoading ? <Spinner /> : "Generate ✨"}
      </button>
    </div>
  </form>
);

interface ResultCardProps {
  tagline: string;
  isCopied: boolean;
  onCopy: () => void;
  animationIndex: number;
}

const ResultCard: React.FC<ResultCardProps> = ({
  tagline,
  isCopied,
  onCopy,
  animationIndex,
}) => {
  return (
    <div
      className="bg-light/50 dark:bg-dark/50 backdrop-blur-md border border-secondary-light/20 dark:border-secondary-dark/20 rounded-lg p-4 flex justify-between items-center transition-all duration-300 hover:scale-[1.02] hover:border-blue-400/50 animate-slide-up-fade-in"
      style={{ animationDelay: `${animationIndex * 100}ms` }}
    >
      <p className="text-primary-light dark:text-primary-dark flex-1 pr-4">
        {tagline}
      </p>
      <button
        onClick={onCopy}
        className={`p-2 rounded-full transition-all duration-200 ${
          isCopied
            ? "bg-green-500/20 text-green-400"
            : "text-secondary-dark hover:bg-black/10 dark:hover:bg-white/10"
        }`}
        aria-label="Copy tagline"
      >
        {isCopied ? (
          <CheckIcon className="w-5 h-5" />
        ) : (
          <CopyIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

interface GeneratedResultsListProps {
  taglines: string[];
  copiedIndex: number | null;
  setCopiedIndex: (index: number | null) => void;
}
const GeneratedResultsList: React.FC<GeneratedResultsListProps> = ({
  taglines,
  copiedIndex,
  setCopiedIndex,
}) => {
  if (taglines.length === 0) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-10">
      <h2 className="text-lg font-semibold text-secondary-light dark:text-secondary-dark mb-4 text-center">
        Here are your AI-generated taglines!
      </h2>
      <div className="grid gap-3">
        {taglines.map((tagline, index) => (
          <ResultCard
            key={index}
            tagline={tagline}
            isCopied={copiedIndex === index}
            onCopy={() => handleCopy(tagline, index)}
            animationIndex={index}
          />
        ))}
      </div>
    </div>
  );
};

const PageFooter = () => (
  <footer className="w-full bg-light/50 dark:bg-dark/50 border-t border-primary-light/10 dark:border-primary-dark/10 mt-auto">
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <LogoIcon className="w-6 h-6 text-blue-500" />
          <span className="text-lg font-semibold text-primary-light dark:text-primary-dark">
            TaglineGenius
          </span>
        </div>
        <p className="text-sm text-secondary-light dark:text-secondary-dark order-last md:order-none">
          © {new Date().getFullYear()} TaglineGenius. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/mrpratik753"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
          >
            <TwitterIcon className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/prateekraiger/Riya"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [userInput, setUserInput] = useState<string>("");
  const [generatedTaglines, setGeneratedTaglines] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedTaglines([]);
    setCopiedIndex(null);

    const result = await generateTaglines(userInput);

    if (
      result.length > 0 &&
      (result[0].includes("Error") ||
        result[0].includes("API") ||
        result[0].includes("Sorry"))
    ) {
      setError(result[0]);
      setGeneratedTaglines([]);
    } else {
      setGeneratedTaglines(result);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen text-primary-light dark:text-primary-dark font-sans transition-colors duration-300 isolate flex flex-col">
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-light dark:bg-dark"></div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-light dark:bg-dark bg-[radial-gradient(circle_farthest-side_at_50%_200px,#a855f711,rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_farthest-side_at_50%_200px,#7c3aed44,rgba(0,0,0,0))]"></div>

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 animate-fade-in-slow flex flex-col items-center pt-16 md:pt-24 pb-16">
        <div className="text-center mb-10 md:mb-12 px-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-3 bg-clip-text text-transparent bg-gradient-to-b from-primary-light/90 to-primary-light dark:from-primary-dark/90 dark:to-primary-dark">
            Level Up Your Valorant Titles
          </h2>
          <p className="text-lg md:text-xl text-secondary-light dark:text-secondary-dark max-w-2xl mx-auto">
            Describe an epic pro play or ranked moment. Get AI headlines that
            sound like they're straight from a VCT broadcast. 🎤🏆
          </p>
        </div>
        <TaglineInputForm
          userInput={userInput}
          setUserInput={setUserInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
        {error && (
          <div className="w-full max-w-2xl mx-auto px-4 mt-4 text-center text-red-500 bg-red-500/10 p-3 rounded-lg">
            <p>{error}</p>
          </div>
        )}
        <GeneratedResultsList
          taglines={generatedTaglines}
          copiedIndex={copiedIndex}
          setCopiedIndex={setCopiedIndex}
        />
      </main>

      <PageFooter />
    </div>
  );
}

export default App;
