import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function About() {

  const { lang } = useContext(LanguageContext);

  return (
    <div className="w-full min-h-screen bg-[#fff2e9] pb-16 -mt-20">

      {/* Spacer for fixed navbar */}
      <div className="h-24" />

      <div className="max-w-5xl mx-auto px-5">

        {/* ================= HERO ================= */}
        <div className="text-center mb-12">

          <h1 className="
            text-3xl sm:text-5xl
            font-bold
            text-[#5b1919]
            mb-4
          ">
            {lang === "en" ? "About Gahraaiyan ✨" : "Gahraaiyan के बारे में ✨"}
          </h1>

          <p className="
            italic
            text-[#5b1919]/70
            text-sm sm:text-lg
          ">
            {lang === "en"
              ? "“Where emotions find their voice…”"
              : "“जहाँ भावनाएँ अपनी आवाज़ पाती हैं…”"}
          </p>

        </div>

        {/* ================= INTRO ================= */}
        <div className="
          bg-white
          p-6 sm:p-8
          rounded-3xl
          shadow-[0_20px_50px_rgba(0,0,0,0.12)]
          border border-black/5
          mb-10
          text-center
        ">
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {lang === "en"
              ? "Gahraaiyan is a peaceful digital space crafted for poetry lovers. Whether you seek love, pain, hope, or dreams — this platform brings feelings to life through beautifully written verses."
              : "Gahraaiyan एक शांत डिजिटल मंच है जो कविता प्रेमियों के लिए बनाया गया है। चाहे आप प्रेम, दर्द, आशा या सपनों की तलाश में हों — यहाँ हर भावना को शब्दों में पिरोया गया है।"}
          </p>
        </div>

        {/* ================= MISSION / VISION ================= */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="
            bg-white
            p-6
            rounded-2xl
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
          ">
            <h2 className="text-lg font-semibold mb-2">
              🌸 {lang === "en" ? "Our Mission" : "हमारा उद्देश्य"}
            </h2>
            <p className="text-gray-600 text-sm">
              {lang === "en"
                ? "To make poetry accessible, relatable, and emotionally meaningful for everyone."
                : "कविता को हर व्यक्ति के लिए सहज, जुड़ावपूर्ण और भावनात्मक बनाना।"}
            </p>
          </div>

          <div className="
            bg-white
            p-6
            rounded-2xl
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
          ">
            <h2 className="text-lg font-semibold mb-2">
              ✨ {lang === "en" ? "Our Vision" : "हमारी सोच"}
            </h2>
            <p className="text-gray-600 text-sm">
              {lang === "en"
                ? "To build a soulful creative community of readers and writers."
                : "पाठकों और लेखकों का एक भावनात्मक रचनात्मक समुदाय बनाना।"}
            </p>
          </div>

        </div>

        {/* ================= FEATURES ================= */}
        <div className="mb-12">

          <h2 className="
            text-xl sm:text-2xl
            font-bold
            text-center
            text-[#5b1919]
            mb-6
          ">
            {lang === "en" ? "✨ Platform Highlights" : "✨ प्लेटफॉर्म की खासियत"}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

            {[
              "Poetry Posters",
              "Hindi & English Poems",
              "Shayari & Couplets",
              "Emotion Based Titles",
              "Clean Reading Experience",
              "Minimal Elegant Design"
            ].map((f, i) => (

              <div
                key={i}
                className="
                  bg-white
                  p-4
                  rounded-xl
                  shadow-sm
                  text-sm
                  hover:shadow-md
                  hover:scale-[1.03]
                  transition
                "
              >
                ✔ {lang === "en" ? f :
                  ["कविता पोस्टर्स",
                    "हिंदी और अंग्रेज़ी कविताएँ",
                    "शायरी और शेर",
                    "भावनाओं पर आधारित शीर्षक",
                    "साफ पढ़ने का अनुभव",
                    "साधारण सुंदर डिज़ाइन"][i]}
              </div>

            ))}

          </div>
        </div>

        {/* ================= CREATOR BLOCK ================= */}
        <div className="
          bg-[#5b1919]
          text-white
          rounded-3xl
          p-6 sm:p-10
          text-center
          shadow-xl
          mb-12
        ">
          <h2 className="text-xl font-semibold mb-3">
            {lang === "en" ? "✨ Created With Passion" : "✨ जुनून से निर्मित"}
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            {lang === "en"
              ? "This platform was built to celebrate emotions, creativity, and the timeless beauty of poetry."
              : "यह मंच भावनाओं, रचनात्मकता और कविता की सुंदरता को समर्पित है।"}
          </p>
        </div>

        {/* ================= QUOTE ================= */}
        <div className="
          text-center
          italic
          text-[#5b1919]/80
          text-sm sm:text-lg
          mb-8
        ">
          {lang === "en"
            ? "“Poetry is not written, it is felt.”"
            : "“कविता लिखी नहीं जाती, महसूस की जाती है।”"}
        </div>

        {/* ================= CTA ================= */}
        <div className="text-center">
          <Link
            to="/poems"
            className="
              inline-block
              bg-[#5b1919]
              text-white
              px-8 py-3
              rounded-xl
              hover:scale-105
              transition
              shadow-md
            "
          >
            {lang === "en" ? "Explore Poems 💫" : "कविताएँ देखें 💫"}
          </Link>
        </div>

      </div>
    </div>
  );
}
