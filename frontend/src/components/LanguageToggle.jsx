import { useContext, useState, useRef, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";

const LanguageToggle = () => {

  const { lang, setLang } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-white text-black px-4 py-2 rounded-lg
        font-semibold text-sm shadow-sm
        flex items-center gap-2"
      >
        {lang === "en" ? "English" : "हिंदी"}
        <span>▼</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-full
        bg-gray-600 rounded-lg shadow-lg overflow-hidden">

          <div
            onClick={() => {
              setLang("en");
              setOpen(false);
            }}
            className="px-4 py-2 cursor-pointer"
          >
            English
          </div>

          <div
            onClick={() => {
              setLang("hi");
              setOpen(false);
            }}
            className="px-4 py-2 cursor-pointer"
          >
            हिंदी
          </div>

        </div>
      )}

    </div>
  );
};

export default LanguageToggle;
