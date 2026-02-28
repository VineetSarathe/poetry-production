import HeroSection from "../components/HeroSection";
import Poems from "./Poems";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";   // ✅ IMPORTANT

export default function Home() {

  const { lang } = useContext(LanguageContext);

  return (
    <div className="bg-[#fff2e9] min-h-screen">

      {/* ================= HERO ================= */}
      <HeroSection />

      {/* ================= INTRO + QUOTE ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="
          grid md:grid-cols-2
          gap-6
          mt-6 sm:mt-10
        ">

          {/* WELCOME */}
          <div className="
            bg-white
            rounded-3xl
            shadow-[0_20px_60px_rgba(0,0,0,0.10)]
            p-6 sm:p-8
          ">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#5b1919] mb-3">
              {lang === "en"
                ? "Welcome to Gahraaiyan ✨"
                : "Gahraaiyan में आपका स्वागत है ✨"}
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {lang === "en"
                ? "A peaceful digital space where emotions breathe through poetry, shayari, and heartfelt words."
                : "एक शांत डिजिटल मंच जहाँ भावनाएँ कविता, शायरी और एहसासों के रूप में जीवित होती हैं।"}
            </p>
          </div>

          {/* QUOTE */}
          <div className="
            bg-gradient-to-br
            from-[#5b1919]
            to-[#7a2b2b]
            text-white
            rounded-3xl
            shadow-[0_20px_60px_rgba(91,25,25,0.35)]
            p-6 sm:p-8
            flex flex-col justify-center
          ">
            <p className="text-sm uppercase tracking-widest opacity-70 mb-2">
              {lang === "en" ? "Quote of the Day" : "आज का विचार"}
            </p>

            <p className="italic text-lg sm:text-xl leading-relaxed">
              {lang === "en"
                ? "“Poetry begins where language ends.”"
                : "“जहाँ भाषा समाप्त होती है, वहीं कविता जन्म लेती है।”"}
            </p>
          </div>

        </div>
      </section>

      {/* ================= SEPARATOR ================= */}
      <div className="
        max-w-5xl
        mx-auto
        my-10
        h-[1px]
        bg-gradient-to-r
        from-transparent
        via-[#5b1919]/30
        to-transparent
      " />

      {/* ================= EMOTIONS ================= */}
      <section className="px-4 pb-10">

        <h3 className="text-xl sm:text-2xl font-bold text-center text-[#5b1919] mb-6">
          {lang === "en" ? "✨ Explore Emotions" : "✨ भावनाएँ खोजें"}
        </h3>

        <div className="
          grid grid-cols-2 sm:grid-cols-4
          gap-4
          max-w-5xl mx-auto
        ">
          {[
            { en: "Love", hi: "प्रेम", emoji: "❤️" },
            { en: "Pain", hi: "दर्द", emoji: "💔" },
            { en: "Hope", hi: "आशा", emoji: "✨" },
            { en: "Dreams", hi: "सपने", emoji: "🌙" }
          ].map((item, i) => (

            <Link
              key={i}
              to="/poems"   // ✅ CLICK → POEMS PAGE
              className="
                bg-white
                p-5
                rounded-2xl
                shadow-sm
                text-center
                hover:shadow-xl
                hover:-translate-y-1
                hover:scale-[1.03]
                transition-all duration-300
                block
              "
            >
              <div className="text-2xl mb-1">{item.emoji}</div>

              <p className="font-semibold text-[#5b1919]">
                {lang === "en" ? item.en : item.hi}
              </p>
            </Link>

          ))}
        </div>
      </section>

      {/* ================= POEMS ================= */}
      <Poems />

      {/* ================= FEATURE STRIP ================= */}
      <section className="
        bg-[#5b1919]
        text-white
        py-10
        mt-6
      ">
        <div className="max-w-4xl mx-auto text-center px-4">

          <p className="uppercase text-xs tracking-widest opacity-70 mb-2">
            {lang === "en" ? "Why Gahraaiyan?" : "Gahraaiyan क्यों?"}
          </p>

          <p className="text-sm sm:text-base opacity-90 leading-relaxed">
            {lang === "en"
              ? "Because some emotions cannot be spoken — they must be written."
              : "क्योंकि कुछ भावनाएँ कही नहीं जातीं — उन्हें लिखा जाता है।"}
          </p>

        </div>
      </section>

    </div>
  );
}
