import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

type Props = {
  setReSpin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ setReSpin }: Props) {
  const { theme } = useContext(ThemeContext);

  function reRenderGlobe() {
    setReSpin(true);
  }

  const svgColour = theme.nightMode ? "rgb(209 213 219)" : "black";

  return (
    <header className="mt-8 h-10 relative dark:text-gray-200 z-10">
      <div className="relative h-full">
        <button
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 "
          onClick={reRenderGlobe}
        >
          <h1
            className="text-4xl font-extrabold"
            style={{ fontFamily: "'Montserrat'" }}
          >
            Elsenborn
          </h1>
        </button>
      </div>
      <hr className="bottom-0" style={{ borderColor: svgColour }} />
    </header>
  );
}
