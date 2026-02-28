import { useParams, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../api";
import { LanguageContext } from "../context/LanguageContext";

/* ================= POEM TYPES ================= */

const POEM_TYPES = [
  { key: "couplet", en: "Couplet", hi: "शे'र" },
  { key: "poem", en: "Poem", hi: "नज़्म" },
  { key: "ghazal", en: "Ghazal", hi: "ग़ज़ल" },
  { key: "couplets", en: "Couplets", hi: "अश'आर" }
];

export default function PoemDetails() {

  const { title } = useParams();
  const [searchParams] = useSearchParams();
  const poet = searchParams.get("poet");
  const typeFromUrl = searchParams.get("type");

  const { lang } = useContext(LanguageContext);

  const [poems, setPoems] = useState([]);
  const [type, setType] = useState(typeFromUrl || "poem"); // Use URL param if available

  /* ================= FETCH ================= */

  useEffect(() => {

    const fetchPoems = async () => {
      const res = await api.get(`/poems/title/${title}`);

      const onlyPoetPoems = res.data.filter(
        p => p.poet?.name === poet
      );

      setPoems(onlyPoetPoems);
    };

    fetchPoems();

  }, [title, poet]);

  /* ================= TYPE FILTER ================= */

  // const visiblePoems = poems.filter(p => {
  //   if (!p.type) return type === "poem"; // old data
  //   return p.type === type;
  // });

  const visiblePoems = poems
    .filter(p => {
      if (!p.type) return type === "poem";
      return p.type === type;
    })
    .sort((a, b) =>
      new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    ); // ✅ newest first safety

  /* ================= TEXT TO SPEECH ================= */

  const speakPoem = (text) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang === "en" ? "en-US" : "hi-IN";
    speech.rate = 0.85;
    speech.pitch = 0.9;
    window.speechSynthesis.speak(speech);
  };

  /* ================= EMPTY ================= */

  if (!visiblePoems.length) {
    return (
      <div className="text-center mt-12 text-gray-500">
        No {title} found in {lang === "en" ? type : POEM_TYPES.find(t => t.key === type)?.hi} form for {poet}
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* TITLE */}
      <h1 className="text-3xl font-serif mb-6">
        {lang === "en"
          ? poems[0]?.title_en
          : poems[0]?.title_hi}
      </h1>

      {/* TYPE BUTTONS */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">

        {POEM_TYPES.map(t => (
          <button
            key={t.key}
            onClick={() => setType(t.key)}
            className={`
        px-5 py-2
        rounded-full
        text-[13px] sm:text-sm
        tracking-wide
        border

        transition-all
        duration-300
        ease-out

        ${lang === "hi" ? "font-bold" : "font-medium"}

        ${type === t.key
                ? `
            bg-[#5b1919] text-white border-[#5b1919]
            shadow-[0_6px_16px_rgba(91,25,25,0.35)]
            translate-y-0
          `
                : `
            bg-white text-gray-700 border-gray-300
            shadow-[0_4px_10px_rgba(0,0,0,0.12)]
            hover:-translate-y-0.5
            hover:shadow-[0_8px_18px_rgba(0,0,0,0.18)]
            hover:bg-gray-100
          `
              }
      `}
          >
            {lang === "en" ? t.en : t.hi}
          </button>
        ))}

      </div>


      {/* POEMS */}
      {visiblePoems.map((p) => (

        <div
          key={p._id}
          className="
    bg-[#faf7f2]
    rounded-2xl
    p-8
    mb-8

    border border-black/5

    shadow-[0_8px_24px_rgba(0,0,0,0.10)]
    transition-all
    duration-300
    ease-out

    hover:-translate-y-1
    hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]
  "
        >


          <p className="text-gray-500 mb-2">
            — {p.poet?.name}
          </p>

          <div className="flex justify-end mb-4">
            <button
              onClick={() =>
                speakPoem(
                  lang === "en"
                    ? p.content_en
                    : p.content_hi
                )
              }
              className="w-10 h-10 rounded-full bg-black text-white -mt-10"
            >
              🔊
            </button>
          </div>

          <p className="text-lg whitespace-pre-line font-serif leading-relaxed">
            {lang === "en"
              ? p.content_en
              : p.content_hi}
          </p>

        </div>

      ))}

    </div>
  );
}