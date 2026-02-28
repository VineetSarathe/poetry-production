import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../api";
import { LanguageContext } from "../context/LanguageContext";

export default function TitlePoems() {

  const { title } = useParams();
  const { lang } = useContext(LanguageContext);

  const [poems, setPoems] = useState([]);

  useEffect(() => {
    const fetchPoems = async () => {
      const res = await api.get(`/poems/title/${title}`);
      setPoems(res.data);
    };
    fetchPoems();
  }, [title]);

  const speakPoem = (text) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang === "en" ? "en-US" : "hi-IN";
    speech.rate = 0.85;
    speech.pitch = 0.9;
    window.speechSynthesis.speak(speech);
  };

  if (!poems.length) {
    return <p className="text-center mt-10">No poems found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-serif mb-6">
        {lang === "en" ? poems[0].title_en : poems[0].title_hi}
      </h1>

      {poems.map(p => (

        <div
          key={p._id}
          className="bg-[#faf7f2] p-6 rounded-xl mb-6"
        >

          <div className="flex justify-between mb-2">
            <p className="text-gray-500">
              — {p.poet?.name}
            </p>

            <button
              onClick={() =>
                speakPoem(
                  lang === "en"
                    ? p.content_en
                    : p.content_hi
                )
              }
              className="w-9 h-9 rounded-full
              bg-black text-white"
            >
              🔊
            </button>
          </div>

          <p className="whitespace-pre-line text-lg font-serif">
            {lang === "en" ? p.content_en : p.content_hi}
          </p>

        </div>

      ))}

    </div>
  );
}
