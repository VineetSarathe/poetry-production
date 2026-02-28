import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { PoemsContext } from "../../context/PoemsContext";
import { Link } from "react-router-dom";
import api from "../../api";

/* ---------------- TITLES ---------------- */

const TITLES = [
  { en: "Love", hi: "प्रेम" },
  { en: "Hope", hi: "आशा" },
  { en: "Life", hi: "जीवन" },
  { en: "Pain", hi: "दर्द" },
  { en: "Dreams", hi: "सपने" },
  { en: "Friendship", hi: "दोस्ती" },
  { en: "Time", hi: "समय" },
  { en: "Faith", hi: "विश्वास" }
];

const AdminDashboard = () => {

  const navigate = useNavigate();
  const { fetchPoems } = useContext(PoemsContext);

  /* ✅ ADDED MESSAGE STATE */
  const [message, setMessage] = useState("");

  /* ================= POSTERS ================= */

  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [posters, setPosters] = useState([]);
  const [posterLoading, setPosterLoading] = useState(false);
  const [poetLoading, setPoetLoading] = useState(false);
  const [poemLoading, setPoemLoading] = useState(false);

  /* ================= POET ================= */

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // ✅ Manage / Update Poet States
  const [showManagePoets, setShowManagePoets] = useState(false);
  const [editingPoet, setEditingPoet] = useState(null);
  const [editName, setEditName] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editImageFile, setEditImageFile] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [updatingPoet, setUpdatingPoet] = useState(false);

  /* ================= POEM ================= */

  const [poetId, setPoetId] = useState("");
  const [poetSearch, setPoetSearch] = useState("");
  const [poets, setPoets] = useState([]);

  const [titleEn, setTitleEn] = useState("");
  const [titleHi, setTitleHi] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentHi, setContentHi] = useState("");
  const [poemType, setPoemType] = useState("poem");

  const [showPoetList, setShowPoetList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  /* ================= AUTH ================= */

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
    }
  }, []);

  /* ✅ ADDED AUTO-HIDE MESSAGE */
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  /* ================= PREVIEW ================= */

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (imageUrl) setPreview(imageUrl);
    else setPreview(null);
  }, [imageFile, imageUrl]);

  useEffect(() => {
    if (posterFile) {
      const url = URL.createObjectURL(posterFile);
      setPosterPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [posterFile]);

  useEffect(() => {
    if (editImageFile) {
      const url = URL.createObjectURL(editImageFile);
      setEditPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (editImageUrl) {
      setEditPreview(editImageUrl);
    } else if (editingPoet) {
      // setEditPreview(`http://localhost:5000${editingPoet.image}`);
      setEditPreview(
        `${import.meta.env.VITE_API_BASE}/${editingPoet.image.replace(/^\/+/, "")}`
      );
    }
  }, [editImageFile, editImageUrl, editingPoet]);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    loadPoets();
    loadPosters();
  }, []);

  // const loadPoets = async () => {
  //   const res = await axios.get("http://localhost:5000/api/poets");
  //   setPoets(res.data);
  // };

  const loadPoets = async () => {
    const res = await api.get("/poets");
    setPoets(res.data);
  };

  // const loadPosters = async () => {
  //   const res = await axios.get("http://localhost:5000/api/posters");
  //   setPosters(res.data);
  // };

  const loadPosters = async () => {
    const res = await api.get("/posters");
    setPosters(res.data);
  };

  /* ================= POSTER APIs ================= */

  const addPoster = async () => {
    if (!posterFile) {
      setMessage("⚠ Select an image to add");
      return;
    }

    setPosterLoading(true);
    try {
      const fd = new FormData();
      fd.append("image", posterFile);

      // await axios.post(
      //   "http://localhost:5000/api/posters/add",
      //   fd,
      //   { headers: { Authorization: localStorage.getItem("adminToken") } }
      // );

      await api.post(
        "/posters/add",
        fd,
        { headers: { Authorization: localStorage.getItem("adminToken") } }
      );

      setMessage("✅ Poster added");
      setPosterFile(null);
      setPosterPreview(null);
      await loadPosters();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to add poster");
    } finally {
      setPosterLoading(false);
    }
  };

  const updatePoster = async (id) => {
    if (!posterFile) {
      setMessage("⚠ Select a new image before replacing");
      return;
    }

    setPosterLoading(true);
    try {
      const fd = new FormData();
      fd.append("image", posterFile);

      // await axios.put(
      //   `http://localhost:5000/api/posters/${id}`,
      //   fd,
      //   { headers: { Authorization: localStorage.getItem("adminToken") } }
      // );

      await api.put(
        `/posters/${id}`,
        fd,
        { headers: { Authorization: localStorage.getItem("adminToken") } }
      );

      setMessage("✅ Poster replaced");
      setPosterFile(null);
      setPosterPreview(null);
      await loadPosters();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to replace poster");
    } finally {
      setPosterLoading(false);
    }
  };

  const deletePoster = async (id) => {
    if (!window.confirm("Delete this poster?")) return;

    setPosterLoading(true);
    try {
      // await axios.delete(
      //   `http://localhost:5000/api/posters/${id}`,
      //   { headers: { Authorization: localStorage.getItem("adminToken") } }
      // );

      await api.delete(
        `/posters/${id}`,
        { headers: { Authorization: localStorage.getItem("adminToken") } }
      );
      setMessage("🗑 Poster deleted");
      await loadPosters();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to delete poster");
    } finally {
      setPosterLoading(false);
    }
  };

  /* ================= ADD POET ================= */

  const addPoet = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", name);

    if (imageFile) fd.append("image", imageFile);
    else if (imageUrl) fd.append("imageUrl", imageUrl);

    // await axios.post(
    //   "http://localhost:5000/api/poets/add",
    //   fd,
    //   { headers: { Authorization: localStorage.getItem("adminToken") } }
    // );

    await api.post(
      "/poets/add",
      fd,
      { headers: { Authorization: localStorage.getItem("adminToken") } }
    );

    setMessage("✅ Poet added");

    setName("");
    setImageUrl("");
    setImageFile(null);
    setPreview(null);
    loadPoets();
  };

  // ✅ Start Editing Poet
  const startEditPoet = (poet) => {
    setEditingPoet(poet);
    setEditName(poet.name);
    setEditImageUrl("");
    setEditImageFile(null);
  };

  const closeModal = () => {
    setEditingPoet(null);
    setEditImageFile(null);
    setEditImageUrl("");
  };

  // ✅ Update Poet
  const updatePoet = async () => {

    // ✅ VALIDATION TOP PAR
    if (!editName.trim()) {
      setMessage("⚠ Poet name required");
      return;
    }

    const fd = new FormData();
    fd.append("name", editName);

    if (editImageFile) fd.append("image", editImageFile);
    else if (editImageUrl) fd.append("imageUrl", editImageUrl);

    setUpdatingPoet(true);   // ✅ LOADING START

    try {
      // await axios.put(
      //   `http://localhost:5000/api/poets/update/${editingPoet._id}`,
      //   fd,
      //   { headers: { Authorization: localStorage.getItem("adminToken") } }
      // );

      await api.put(
        `/poets/update/${editingPoet._id}`,
        fd,
        { headers: { Authorization: localStorage.getItem("adminToken") } }
      );

      setMessage("✅ Poet updated");
      closeModal();
      loadPoets();

    } catch (err) {
      console.error(err);
      setMessage("❌ Poet update failed");

    } finally {
      setUpdatingPoet(false);  // ✅ LOADING STOP
    }
  };

  <div className="flex justify-end">
    <button
      onClick={() => setShowManagePoets(!showManagePoets)}
      className="bg-black text-white px-4 py-2 rounded"
    >
      {showManagePoets ? "Hide Poets" : "Manage Poets"}
    </button>
  </div>

  /* ================= ADD POEM ================= */

  const addPoem = async (e) => {
    e.preventDefault();

    // await axios.post(
    //   "http://localhost:5000/api/poems/add",
    //   {
    //     poetId,
    //     title_en: titleEn,
    //     title_hi: titleHi,
    //     content_en: contentEn,
    //     content_hi: contentHi,
    //     type: poemType
    //   },
    //   { headers: { Authorization: localStorage.getItem("adminToken") } }
    // );

    await api.post(
      "/poems/add",
      {
        poetId,
        title_en: titleEn,
        title_hi: titleHi,
        content_en: contentEn,
        content_hi: contentHi,
        type: poemType
      },
      { headers: { Authorization: localStorage.getItem("adminToken") } }
    );

    setMessage("✅ Poem added");

    setContentEn("");
    setContentHi("");
    fetchPoems();
  };

  /* ================= LOGOUT ================= */

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* ✅ ADDED MESSAGE UI */}
      {message && (
        <div className="p-2 rounded bg-green-100 text-green-700 text-sm">
          {message}
        </div>
      )}

      {/* ================= POSTERS ================= */}

      <div className="bg-white p-5 rounded shadow border-2">
        <h2 className="font-semibold mb-3">Home Posters</h2>

        <div className="flex items-center gap-4">
          <label className="cursor-pointer bg-gray-100 px-3 py-2 rounded border">
            {posterFile ? posterFile.name : "Choose poster image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setPosterFile(e.target.files[0])}
            />
          </label>

          {posterPreview ? (
            <img src={posterPreview} className="h-20 rounded" alt="poster preview" />
          ) : (
            <div className="h-20 w-32 bg-gray-50 border rounded flex items-center justify-center text-sm text-gray-500">
              No preview
            </div>
          )}

          <button
            onClick={addPoster}
            disabled={posterLoading}
            className="mt-2 bg-black text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {posterLoading ? "Uploading..." : "Add Poster"}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {posters.map(p => (
            <div key={p._id} className="border p-2 rounded shadow-sm hover:shadow-md transition-shadow">
              <img
                // src={`http://localhost:5000${p.image}`}
                src={`${import.meta.env.VITE_API_BASE}/${p.image.replace(/^\/+/, "")}`}
                alt={`Poster ${p._id}`}
                className="h-32 w-full object-cover rounded"
                // onError={(e) => {
                //   const parts = p.image ? p.image.split('/') : [];
                //   const filename = parts.length ? parts[parts.length - 1] : '';
                //   const tries = Number(e.target.dataset.try || 0);
                //   if (tries === 0) {
                //     e.target.dataset.try = 1;
                //     e.target.src = `http://localhost:5000/uploads/posters/${filename}`;
                //   } else if (tries === 1) {
                //     e.target.dataset.try = 2;
                //     e.target.src = `http://localhost:5000/uploads/${filename}`;
                //   } else {
                //     e.target.onerror = null;
                //     e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                //   }
                // }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                }}
              />

              <div className="text-xs mt-1 break-words text-gray-600 truncate">Path: {p.image}</div>

              <button
                onClick={() => updatePoster(p._id)}
                disabled={!posterFile || posterLoading}
                aria-disabled={!posterFile || posterLoading}
                className="w-full mt-2 bg-blue-600 text-white py-1 rounded disabled:opacity-50"
              >
                {posterLoading ? "Working..." : "Replace"}
              </button>

              <button
                onClick={() => deletePoster(p._id)}
                disabled={posterLoading}
                className="w-full mt-2 bg-red-600 text-white py-1 rounded disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* ================= ADD POET ================= */}

      <div className="bg-white p-5 rounded shadow border-2">
        <div className="flex justify-between">
          <h2 className="font-semibold mb-3">Add Poet</h2>

          {/* ✅ MANAGE POETS TOGGLE BUTTON */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowManagePoets(!showManagePoets)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              {showManagePoets ? "Hide Poets" : "Manage Poets"}
            </button>
          </div>
        </div>

        {/* ✅ MANAGE POETS */}
        {showManagePoets && (
          <div className="mt-4 bg-white p-5 rounded shadow border">
            <h2 className="font-semibold mb-3">Manage Poets</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {poets.map(p => (
                <div key={p._id} className="border p-2 rounded">
                  {/* <img
                    src={`http://localhost:5000${p.image}`} */}
                  <img
                    src={`${import.meta.env.VITE_API_BASE}/${p.image.replace(/^\/+/, "")}`}
                    className="h-24 w-full object-cover rounded"
                  />
                  <div className="text-sm mt-1">{p.name}</div>

                  <button
                    onClick={() => startEditPoet(p)}
                    className="w-full mt-2 bg-blue-600 text-white py-1 rounded"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ✅ ADD POET FORM */}
        <form onSubmit={addPoet} className="space-y-2 mt-4">
          <input
            placeholder="Poet Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border p-2 rounded"
          />

          {/* OR Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <label className="flex items-center justify-center gap-2 cursor-pointer bg-gray-100 border p-2 rounded hover:bg-gray-200 transition">
            📁 Choose File
            <input
              type="file"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </label>

          {preview && (
            <img
              src={preview}
              className="h-20 rounded mx-auto"
            />
          )}

          <button className="w-full bg-indigo-600 text-white py-2 rounded">
            Add Poet
          </button>
        </form>
      </div>

      {editingPoet && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow w-80 space-y-2">

            <h3 className="font-semibold">Update Poet</h3>

            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <input
              placeholder="New Image URL"
              value={editImageUrl}
              onChange={(e) => setEditImageUrl(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <label className="block bg-gray-100 border p-2 rounded text-center cursor-pointer">
              📁 Choose New File
              <input
                type="file"
                className="hidden"
                onChange={(e) => setEditImageFile(e.target.files[0])}
              />
            </label>

            {editPreview && (
              <img src={editPreview} className="h-20 mx-auto rounded" />
            )}

            <div className="flex gap-2">

              <button
                onClick={updatePoet}
                disabled={updatingPoet}
                className="flex-1 bg-green-600 text-white py-2 rounded disabled:opacity-50"
              >
                {updatingPoet ? "Updating..." : "Update"}
              </button>

              {/* <button
                onClick={closeModal}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button> */}

              <button
                onClick={() => setEditingPoet(null)}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}

      {/* ================= ADD POEM ================= */}

      <div className="bg-white p-5 rounded shadow border-2">
        <div className="flex justify-between">
          <h2 className="font-semibold mb-3 mt-1">Add Poem</h2>
          {/* navigate to edit page */}
          <div>
            <Link to="/admin/poem/edit">
              <button className="bg-[#5b1919] text-white px-4 py-2 mb-4 rounded">
                Manage Poems
              </button>
            </Link>
          </div>
        </div>

        <form onSubmit={addPoem} className="space-y-2">

          {/* SEARCH POET */}
          <input
            placeholder="Search Poet"
            value={poetSearch}
            onChange={(e) => {
              setPoetSearch(e.target.value);
              setShowPoetList(true);
            }}
            onFocus={() => setShowPoetList(true)}
            className="w-full border p-2 rounded"
          />

          {/* POET LIST */}
          {showPoetList && (
            <div className="border max-h-40 overflow-y-auto rounded">

              {poets
                .filter(p =>
                  p.name.toLowerCase().includes(
                    poetSearch.toLowerCase()
                  )
                )
                .map(p => (
                  <div
                    key={p._id}
                    onClick={() => {
                      setPoetId(p._id);
                      setPoetSearch(p.name);
                      setShowPoetList(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {p.name}
                  </div>
                ))}

            </div>
          )}

          {/* TYPE */}
          <select
            value={poemType}
            onChange={(e) => setPoemType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="poem">Poem</option>
            <option value="couplet">Couplet</option>
            <option value="ghazal">Ghazal</option>
            <option value="couplets">Couplets</option>
          </select>

          {/* TITLE */}
          <select
            value={titleEn}
            size={isOpen ? Math.min(TITLES.length + 1, 6) : 1}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            onChange={(e) => {
              const t = TITLES.find(x => x.en === e.target.value);
              setTitleEn(t.en);
              setTitleHi(t.hi);
              setIsOpen(false);     // 👈 select ke baad normal
            }}
            className="
    w-full
    px-4 py-3
    border border-black
    bg-white
    text-sm sm:text-base
    font-medium
    tracking-wide
    outline-none
    overflow-y-auto

    focus:border-[#5b1919]
    focus:ring-2
    focus:ring-[#5b1919]/20
  "
          >
            <option value="">Select Title</option>

            {TITLES.map(t => (
              <option key={t.en} value={t.en}>
                {t.en} / {t.hi}
              </option>
            ))}
          </select>



          {/* CONTENT EN */}
          <textarea
            placeholder="Content English"
            value={contentEn}
            onChange={(e) => setContentEn(e.target.value)}
            className="w-full border p-2 rounded font-semibold"
          />

          {/* CONTENT HI */}
          <textarea
            placeholder="Content Hindi"
            value={contentHi}
            onChange={(e) => setContentHi(e.target.value)}
            className="w-full border p-2 rounded font-semibold"
          />

          {/* SUBMIT */}
          <button className="w-full bg-green-600 text-white py-2 rounded">
            Add Poem
          </button>

        </form>
      </div>

    </div>
  );
};

export default AdminDashboard;