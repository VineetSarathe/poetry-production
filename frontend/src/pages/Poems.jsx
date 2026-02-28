import { PoemsContext } from "../context/PoemsContext";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";


/* ================= TITLES ================= */

const FIXED_TITLES = [
  { en: "Love", hi: "प्रेम" },
  { en: "Hope", hi: "आशा" },
  { en: "Life", hi: "जीवन" },
  { en: "Pain", hi: "दर्द" },
  { en: "Dreams", hi: "सपने" },
  { en: "Friendship", hi: "दोस्ती" },
  { en: "Time", hi: "समय" },
  { en: "Faith", hi: "विश्वास" }
];

/* ================= POEM TYPES ================= */

const POEM_TYPES = [
  { key: "couplet", en: "Couplet", hi: "शे'र" },
  { key: "poem", en: "Poem", hi: "नज़्म" },
  { key: "ghazal", en: "Ghazal", hi: "ग़ज़ल" },
  { key: "couplets", en: "Couplets", hi: "अश'आर" }
];

export default function Poems() {

  const { poems } = useContext(PoemsContext);
  const { lang } = useContext(LanguageContext);

  const [selectedPoet, setSelectedPoet] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("couplet");

  /* ================= BUILD POETS ================= */

  const allPoets = [
    ...new Set(
      poems
        .filter(p => p.poet && p.poet.name)
        .map(p => p.poet.name)
    )
  ];

  useEffect(() => {
    if (allPoets.length > 0) {
      setSelectedPoet(allPoets[0]);
    }
  }, [poems]);

  /* ================= SEARCH TYPE ================= */

  const q = search.toLowerCase().trim();

  const isPoetSearch = allPoets.some(p =>
    p.toLowerCase().includes(q)
  );

  const isTitleSearch = FIXED_TITLES.some(t =>
    t.en.toLowerCase().includes(q) ||
    t.hi.toLowerCase().includes(q)
  );

  const isPoemWordSearch =
    q && !isPoetSearch && !isTitleSearch;

  /* ================= POETS TO SHOW ================= */

  const visiblePoets = isPoetSearch
    ? allPoets.filter(p => p.toLowerCase().includes(q))
    : allPoets;

  /* ================= FILTER POEMS ================= */

  const filteredPoems = poems.filter(p => {

    if (isPoetSearch)
      return p.poet?.name?.toLowerCase().includes(q);

    if (isTitleSearch)
      return (
        p.title_en.toLowerCase().includes(q) ||
        p.title_hi.toLowerCase().includes(q)
      );

    if (isPoemWordSearch)
      return (
        p.content_en?.toLowerCase().includes(q) ||
        p.content_hi?.toLowerCase().includes(q)
      );

    if (selectedPoet)
      return p.poet?.name === selectedPoet;

    return true;
  });

  /* ================= GROUP BY TITLE + TYPE ================= */

  const grouped = {};

  FIXED_TITLES.forEach(t => {
    grouped[t.en] = filteredPoems.filter(
      p =>
        p.title_en === t.en &&
        p.poet?.name === selectedPoet &&
        p.type === type              // ✅ IMPORTANT
    );
  });

  /* ================= IMAGE FORMAT ================= */

  const formatImageSrc = (img) => {
    if (!img || img === "") return "/images/faiz.png";
    if (img.startsWith("http")) return img;
    return `http://localhost:5000/${img.replace(/^\/+/, "")}`;
  };

  /* ================= UI ================= */

  return (
    <div className="w-full bg-[#fff2e9] pb-6">

      {/* 🔍 SEARCH */}
      <div className="sticky top-0 z-10 bg-[#fff2e9]/90 backdrop-blur px-4 py-3">
        <input
          type="text"
          placeholder="Search poet, title, or poem…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
      w-full
      rounded-xl
      border border-black/10
      bg-white
      px-4 py-3
      text-sm sm:text-base
      text-black
      placeholder:text-black/40
      outline-none
      transition
      duration-200
      focus:border-black/30
      focus:ring-2
      focus:ring-black/5
    "
        />
      </div>


      {/* 👨‍🎨 POETS */}
      <div className="flex gap-5 overflow-x-auto px-4 pt-3 pb-5">

        {visiblePoets.map(poet => {

          const poetData = poems.find(
            p => p.poet && p.poet.name === poet && p.poet.image
          );

          return (
            <button
              key={poet}
              onClick={() => setSelectedPoet(poet)}
              className={`
          flex-shrink-0
          text-center
          transition
          duration-300
          ${selectedPoet === poet ? "scale-110" : "hover:scale-105"}
        `}
            >

              <img
                src={formatImageSrc(poetData?.poet?.image)}
                alt={poet}
                className="
            w-30 h-30
            sm:w-24 sm:h-24
            rounded-full
            mx-auto
            object-contain
          "
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/faiz.png";
                }}
              />

              <p className="font-semibold text-sm sm:text-base text-black/80">
                {poet}
              </p>

            </button>
          );
        })}

      </div>

      {/* 🧭 TYPE BUTTONS */}
      <div className="flex justify-center gap-3 px-3 pb-4 flex-wrap mt-5">

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
        duration-200
        ${lang === "hi" ? "font-bold" : "font-medium"}
        ${type === t.key
                ? "bg-[#5b1919] text-white border-[#5b1919]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }
      `}
          >
            {lang === "en" ? t.en : t.hi}
          </button>
        ))}

      </div>


      {/* 📚 TITLES */}
      {!isPoemWordSearch && (

        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

          {FIXED_TITLES
            .filter(t =>
              !isTitleSearch ||
              t.en.toLowerCase().includes(q) ||
              t.hi.toLowerCase().includes(q)
            )
            .map(t => (

              <Link
                key={t.en}
                to={`/poems/title/${t.en}?poet=${selectedPoet}&type=${type}`}
                className="
            bg-white
            p-5
            rounded-2xl
            border border-black/10

            shadow-[0_10px_24px_rgba(0,0,0,0.10)]
            transition-all
            duration-300
            ease-out

            hover:-translate-y-1.5
            hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]
            hover:bg-[#faf7f2]

            active:translate-y-0
            active:shadow-[0_8px_18px_rgba(0,0,0,0.14)]
          "
              >

                <h2
                  className="
    text-[15px] sm:text-base
    font-semibold
    tracking-wide
    text-black/90
  "
                >
                  {lang === "en" ? t.en : t.hi}
                </h2>


                <p className="
            mt-6
            text-[11px] sm:text-xs
            tracking-wide
            text-black/50
          ">
                  {grouped[t.en]?.length || 0} Poems
                </p>

              </Link>

            ))}

        </div>
      )}



      {/* 📜 DIRECT POEMS */}
      {isPoemWordSearch && (

        <div className="p-4 space-y-4">

          {filteredPoems.map(p => (

            <div
              key={p._id}
              className="bg-[#faf7f2] p-4 sm:p-6 rounded-xl"
            >

              <p className="text-gray-500 text-xs sm:text-sm mb-1">
                — {p.poet?.name}
              </p>

              <h3 className="font-semibold text-sm sm:text-base mb-2">
                {lang === "en"
                  ? p.title_en
                  : p.title_hi}
              </h3>

              <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed">
                {lang === "en"
                  ? p.content_en
                  : p.content_hi}
              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}
