import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function Footer() {
  const { lang } = useContext(LanguageContext);

  return (
    <footer
      className="
        bg-gradient-to-r
        from-[#5b1919]
        to-[#7a2b2b]
        text-white
        mt-10
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto
          px-4
          py-6
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-3
          text-sm
        "
      >
        {/* LEFT */}
        <p className="opacity-80">
          © 2026<span className="font-semibold">__Gahraaiyan.in</span>
        </p>

        {/* CENTER */}
        <p className="italic opacity-70 text-xs sm:text-sm text-center">
          {lang === "en"
            ? "“Where emotions turn into poetry.”"
            : "“जहाँ भावनाएँ कविता बन जाती हैं।”"}
        </p>
      </div>
    </footer>
  );
}