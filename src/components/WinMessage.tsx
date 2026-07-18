import { useEffect, useRef } from "react";
import Fade from "../transitions/Fade";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WinMessage({ show, setShow }: Props) {
  const modalRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    function closeModal(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!modalRef.current?.contains(target)) {
        setShow(false);
      }
    }
    if (show) {
      document.addEventListener("click", closeModal);
    }
    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, [show, setShow]);

  return (
    <Fade
      show={show}
      background="border-4 border-green-400 dark:border-green-600 bg-green-50 
        dark:bg-slate-900 drop-shadow-xl 
        absolute z-10 w-full sm:w-fit inset-x-0 mx-auto py-8 px-8 rounded-md 
        space-y-4"
    >
      <div ref={modalRef} className="max-w-sm text-center">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-xl"
          onClick={() => setShow(false)}
        >
          ✕
        </button>
        <p className="text-4xl mb-4">🎉</p>
        <h2
          className="text-2xl font-extrabold text-green-700 dark:text-green-300"
          style={{ fontFamily: "'Montserrat'" }}
        >
          Richtig!
        </h2>
        <p className="text-lg text-gray-800 dark:text-gray-200 mt-3">
          Ihr könnt jetzt nach Weywertz zur Kirche gehen!
        </p>
        <p className="text-3xl mt-4">⛪</p>
      </div>
    </Fade>
  );
}
