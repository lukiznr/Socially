import { Theme, Themed, useTheme } from "~/utils/theme-provider";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { TestButton } from "~/components/button";
import { TestCard } from "~/components/card"
export default function Test() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };
  return (
    <>
      <div className="h-25"></div>
      <button onClick={toggleTheme}>
        <Themed
          dark={<SunIcon className="h-6 w-6 text-gold" />}
          light={<MoonIcon className="h-6 w-6" />}
        />
      </button>
      theme is {theme}
      <div className="border-2 border-muted rounded-md p-3 m-2">
        <div className="bg-base">Background Base Color</div>
        <div className="bg-surface">Background Surface Color</div>
        <div className="bg-overlay">Background Overlay Color</div>
        <div className="bg-muted">Background Muted Color</div>
        <div className="text-subtle">Text Subtle Color</div>
        <div className="text-love">Text Love Color</div>
        <div className="text-gold">Text Gold Color</div>
        <div className="text-rose">Text Rose Color</div>
        <div className="text-pine">Text Pine Color</div>
        <div className="text-foam">Text Foam Color</div>
        <div className="text-iris">Text Iris Color</div>
        <div className="bg-highlightLow">Background Highlight Low Color</div>
        <div className="bg-highlightMed">Background Highlight Medium Color</div>
        <div className="bg-highlightHigh">Background Highlight High Color</div>
      </div>
      <TestButton />
      <TestCard/>
    </>
  );
}
