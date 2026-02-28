import { useEffect, useState, useContext } from "react";
// import axios from "axios";
import { PoemsContext } from "../../context/PoemsContext";
import api from "../../api";

const TYPES = ["poem", "couplet", "couplets", "ghazal"];

const ManagePoems = () => {
    const { poems, fetchPoems } = useContext(PoemsContext);

    const [poets, setPoets] = useState([]);
    const [selectedPoet, setSelectedPoet] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [selectedPoem, setSelectedPoem] = useState(null);

    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState("");

    const [showPoetDropdown, setShowPoetDropdown] = useState(false);
    const [poetSearch, setPoetSearch] = useState("");

    useEffect(() => {
        fetchPoems();
        loadPoets();
    }, []);

    const loadPoets = async () => {
        // const res = await axios.get("http://localhost:5000/api/poets");
        const res = await api.get("/poets");
        setPoets(res.data);
    };

    /* ✅ Poet Poems */
    const poetPoems = poems?.filter(
        p => p.poet?._id === selectedPoet?._id
    );

    /* ✅ Available Types */
    const availableTypes = TYPES.filter(type =>
        poetPoems?.some(p => p.type === type)
    );

    /* ✅ Unique Titles */
    const availableTitles = [
        ...new Set(
            poetPoems
                ?.filter(p => p.type === selectedType)
                ?.map(p => p.title_en)
        ),
    ];

    /* ✅ Final Poems → MULTIPLE */
    const filteredPoems = poetPoems?.filter(
        p =>
            p.type === selectedType &&
            p.title_en === selectedTitle
    );

    /* ✅ Update */
    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setMessage("");

        try {
            // await axios.put(
            //     `http://localhost:5000/api/poems/update/${selectedPoem._id}`,
            //     selectedPoem,
            //     {
            //         headers: {
            //             Authorization: localStorage.getItem("adminToken"),
            //         },
            //     }
            // );

            await api.put(
  `/poems/update/${selectedPoem._id}`,
  selectedPoem,
  {
    headers: {
      Authorization: localStorage.getItem("adminToken"),
    },
  }
);

            setMessage("✅ Poem updated");
            fetchPoems();

        } catch (err) {
            console.error(err);
            setMessage("❌ Update failed");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f8f3f3] via-[#f5eded] to-[#efe6e6] p-6">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold mb-6 text-[#5b1919] tracking-tight">
                    Manage Poems
                </h1>

                {/* ================= FILTER PANEL ================= */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-md border border-[#e8dede] p-5 mb-6">

                    <div className="grid md:grid-cols-3 gap-6">

                        {/* POETS */}
                        <div className="relative">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Poets
                            </h3>

                            <button
                                onClick={() => setShowPoetDropdown(!showPoetDropdown)}
                                className="
              w-full flex justify-between items-center
              px-4 py-2.5 rounded-xl border border-gray-300
              bg-white text-sm text-gray-700
              hover:border-[#5b1919] hover:shadow-sm
              transition-all duration-200
            "
                            >
                                <span className="font-medium">
                                    {selectedPoet ? selectedPoet.name : "Select Poet"}
                                </span>

                                <span className="text-xs text-gray-400">
                                    {showPoetDropdown ? "▲" : "▼"}
                                </span>
                            </button>

                            {showPoetDropdown && (
                                <div className="
              absolute z-50 mt-2 w-full
              bg-white border border-gray-200
              rounded-xl shadow-xl p-3
              animate-fadeIn
            ">
                                    <input
                                        type="text"
                                        placeholder="Search poet..."
                                        value={poetSearch}
                                        onChange={(e) => setPoetSearch(e.target.value)}
                                        className="
                  w-full mb-2 px-3 py-2 text-sm
                  border border-gray-300 rounded-lg
                  focus:border-[#5b1919] outline-none
                "
                                    />

                                    <div className="max-h-48 overflow-y-auto space-y-1">
                                        {poets
                                            .filter(poet =>
                                                poet.name.toLowerCase().includes(poetSearch.toLowerCase())
                                            )
                                            .map(poet => (
                                                <div
                                                    key={poet._id}
                                                    onClick={() => {
                                                        setSelectedPoet(poet);
                                                        setSelectedType(null);
                                                        setSelectedTitle(null);
                                                        setSelectedPoem(null);
                                                        setShowPoetDropdown(false);
                                                    }}
                                                    className={`
                        px-3 py-2 rounded-lg text-sm cursor-pointer transition
                        ${selectedPoet?._id === poet._id
                                                            ? "bg-[#5b1919] text-white"
                                                            : "hover:bg-[#f7efef] text-gray-700"}
                      `}
                                                >
                                                    {poet.name}
                                                </div>
                                            ))}

                                        {poets.filter(poet =>
                                            poet.name.toLowerCase().includes(poetSearch.toLowerCase())
                                        ).length === 0 && (
                                                <div className="text-xs text-gray-400 text-center py-2">
                                                    No poet found
                                                </div>
                                            )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* TYPES */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Types
                            </h3>

                            {!selectedPoet ? (
                                <div className="text-sm text-gray-400">
                                    Select poet first
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {availableTypes.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                setSelectedType(type);
                                                setSelectedTitle(null);
                                                setSelectedPoem(null);
                                            }}
                                            className={`
                    px-3 py-1.5 rounded-full text-xs tracking-wide border transition-all duration-200
                    ${selectedType === type
                                                    ? "bg-[#5b1919] text-white border-[#5b1919] shadow-sm"
                                                    : "bg-[#fbf7f7] text-gray-600 border-gray-200 hover:border-[#5b1919] hover:text-[#5b1919]"}
                  `}
                                        >
                                            {type.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* TITLES */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Titles
                            </h3>

                            {!selectedType ? (
                                <div className="text-sm text-gray-400">
                                    Select type
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {availableTitles.map(title => (
                                        <button
                                            key={title}
                                            onClick={() => {
                                                setSelectedTitle(title);
                                                setSelectedPoem(null);
                                            }}
                                            className={`
                    px-3 py-1.5 rounded-full text-xs border transition-all duration-200
                    ${selectedTitle === title
                                                    ? "bg-[#5b1919] text-white border-[#5b1919] shadow-sm"
                                                    : "bg-white text-gray-600 border-gray-300 hover:border-[#5b1919] hover:text-[#5b1919]"}
                  `}
                                        >
                                            {title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* ================= POEM CARDS ================= */}
                {!selectedTitle ? (
                    <div className="text-sm text-gray-400 text-center py-12">
                        Select title to view poems
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-5">

                        {filteredPoems?.map(poem => (
                            <div
                                key={poem._id}
                                className="
              bg-white rounded-2xl border border-[#eee]
              shadow-sm hover:shadow-lg
              hover:-translate-y-0.5
              transition-all duration-300
              p-4
            "
                            >
                                <div className="flex justify-between items-start">

                                    <div>
                                        <div className="text-sm font-semibold text-gray-800">
                                            {poem.title_en}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {poem.type}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setSelectedPoem(poem);
                                            setMessage("");
                                        }}
                                        className="
                  bg-[#5b1919] text-white text-xs
                  px-3 py-1.5 rounded-lg
                  hover:shadow-md hover:opacity-95
                  transition-all duration-200
                "
                                    >
                                        Edit
                                    </button>
                                </div>

                                <div className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-3">
                                    {poem.content_en}
                                </div>
                            </div>
                        ))}

                    </div>
                )}

                {/* ================= INLINE EDIT PANEL ================= */}
                {selectedPoem && (
                    <div className="
        mt-8 bg-white rounded-2xl shadow-xl
        border border-[#eadede]
        p-6 animate-fadeIn
      ">

                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-[#5b1919]">
                                Editing Poem
                            </h3>

                            <button
                                onClick={() => setSelectedPoem(null)}
                                className="text-xs text-gray-400 hover:text-[#5b1919]"
                            >
                                ✕ Close
                            </button>
                        </div>

                        <div className="text-sm mb-4">
                            <div className="font-semibold text-gray-800">
                                {selectedPoem.title_en}
                            </div>
                            <div className="text-xs text-gray-400">
                                {selectedPoem.type}
                            </div>
                        </div>

                        {message && (
                            <div className="text-sm text-green-600 mb-2">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleUpdate} className="space-y-3">

                            <div>
                                <label className="text-xs text-gray-500">
                                    Title English
                                </label>
                                <input
                                    value={selectedPoem.title_en || ""}
                                    onChange={(e) =>
                                        setSelectedPoem({
                                            ...selectedPoem,
                                            title_en: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#5b1919] outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-500">
                                    Title Hindi
                                </label>
                                <input
                                    value={selectedPoem.title_hi || ""}
                                    onChange={(e) =>
                                        setSelectedPoem({
                                            ...selectedPoem,
                                            title_hi: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#5b1919] outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-500">
                                    Content English
                                </label>
                                <textarea
                                    value={selectedPoem.content_en || ""}
                                    onChange={(e) =>
                                        setSelectedPoem({
                                            ...selectedPoem,
                                            content_en: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:border-[#5b1919] outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-500">
                                    Content Hindi
                                </label>
                                <textarea
                                    value={selectedPoem.content_hi || ""}
                                    onChange={(e) =>
                                        setSelectedPoem({
                                            ...selectedPoem,
                                            content_hi: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:border-[#5b1919] outline-none"
                                />
                            </div>

                            <button
                                disabled={updating}
                                className="
              w-full bg-[#5b1919] text-white py-2.5 rounded-lg
              hover:shadow-md hover:opacity-95
              transition-all duration-200
            "
                            >
                                {updating ? "Updating..." : "Update Poem"}
                            </button>

                        </form>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ManagePoems;