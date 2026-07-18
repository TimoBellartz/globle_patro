import { isMobile } from "react-device-detect";

export default function Globe() {
  const size = isMobile ? 320 : 550;

  return (
    <div className="mx-auto my-4" style={{ width: `${size}px` }}>
      <iframe
        title="East Belgium Map"
        width={size}
        height={Math.round(size * 0.75)}
        style={{ border: "2px solid #ccc", borderRadius: "12px" }}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=5.7%2C50.15%2C6.5%2C50.75&layer=mapnik`}
        scrolling="no"
      />
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
        Ostbelgien / Eifel
      </p>
    </div>
  );
}
