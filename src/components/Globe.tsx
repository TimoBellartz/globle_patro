import { useContext, useEffect, useRef, useState } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";
import { City } from "../lib/city";
import { answerCountry } from "../util/answer";
import { globeImg } from "../util/globe";
import { ThemeContext } from "../context/ThemeContext";
import { getColour } from "../util/colour";
import { isMobile } from "react-device-detect";

type Props = {
  guesses: City[];
  globeRef: React.MutableRefObject<GlobeMethods>;
  practiceMode: boolean;
};

const ZOOM_SPEED = 1;

export default function Globe({ guesses, globeRef, practiceMode }: Props) {
  // State
  const [places] = useState(guesses);

  // Theme
  const { nightMode, prideMode, highContrast } = useContext(ThemeContext).theme;

  // Globe size settings
  const size = isMobile ? 320 : 600; // px on one side
  const extraStyle = {
    width: `${size}px`,
    clipPath: `circle(${size / 2}px at ${size / 2}px ${size / 2}px)`,
  };

  // On first render - centre on Belgium's Eifel region
  useEffect(() => {
    const controls: any = globeRef.current.controls();
    controls.autoRotate = false;
    setTimeout(() => {
      globeRef.current.pointOfView({ lat: 50.35, lng: 6.15, altitude: 0.15 });
    }, 400);
  }, [globeRef]);

  // Stop rotate on drag
  const containerRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const controls: any = globeRef.current.controls();
    containerRef.current.addEventListener("mouseup", () => {
      controls.autoRotate = false;
    });
    containerRef.current.addEventListener("touchend", () => {
      controls.autoRotate = false;
    });
  }, [globeRef]);

  // Called when the globe position changes
  function globeOnZoom() {
    overrideGlobeZooming();
  }

  function overrideGlobeZooming() {
    const controls: any = globeRef.current?.controls();
    if (controls != null) controls.zoomSpeed = ZOOM_SPEED;
  }

  // Clicking the zoom buttons on mobile
  function zoom(z: number) {
    const controls: any = globeRef.current.controls();
    controls.autoRotate = false;
    const coords = globeRef.current.pointOfView();
    const { altitude } = globeRef.current.pointOfView();
    coords["altitude"] = Math.max(altitude + z, 0.05);
    globeRef.current.pointOfView(coords, 250);
  }

  const btnFill = nightMode ? "bg-[#582679]" : "bg-[#F3BC63]";
  const btnBorder = nightMode ? "border-[#350a46]" : "border-[#FF8E57]";
  const btnText = nightMode ? "text-white font-bold" : "";

  return (
    <div>
      <div
        ref={containerRef}
        className="globe mx-auto cursor-grab text-center select-none"
        style={extraStyle}
      >
        <ReactGlobe
          ref={globeRef}
          globeImageUrl={globeImg(nightMode)}
          width={size}
          height={size}
          backgroundColor="#00000000"
          atmosphereColor={nightMode ? "rgba(63, 201, 255)" : "lightskyblue"}
          onZoom={globeOnZoom}
        />
      </div>
      {isMobile && (
        <div className="w-full flex justify-between text-md ">
          <button
            className={`border-[1px] rounded-md select-none ${btnText} ${btnFill} px-4 ${btnBorder}`}
            onTouchStart={() => zoom(0.2)}
          >
            -
          </button>
          <button
            className={`border-[1px] rounded-md select-none ${btnText} ${btnFill} px-4 ${btnBorder}`}
            onTouchStart={() => zoom(-0.2)}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
