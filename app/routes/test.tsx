import { Theme, Themed, useTheme } from "~/utils/theme-provider";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { TestButton } from "~/components/button";
import { TestCard } from "~/components/card";
import { SpinnerTest, AutoSpinner } from "~/components/spinner";
export default function Test() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };
  return (
    <>
      <div className="h-45"></div>
      <button onClick={toggleTheme}>
        <Themed
          dark={<SunIcon className="h-6 w-6 text-gold" />}
          light={<MoonIcon className="h-6 w-6" />}
        />
      </button>
      theme is {theme}
      <div>
        <TestButton />
        <TestCard />
        <SpinnerTest />
      </div>
    </>
  );
}
