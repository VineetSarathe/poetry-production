
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
    const [posters, setPosters] = useState([]);
    const [current, setCurrent] = useState(0);
    const mountedRef = useRef(true);

    // Helper to test URL and return the working URL or null
    // const testUrls = async (candidateUrls) => {
    //     for (const url of candidateUrls) {
    //         try {
    //             const res = await fetch(url, { method: "HEAD" });
    //             if (res.ok) return url;
    //         } catch (err) {
    //             // ignore and try next
    //         }
    //     }
    //     return null;
    // };

    // Normalize and preload posters: check which URLs actually exist and replace poster.image with working path
    useEffect(() => {
        mountedRef.current = true;
        // const load = async () => {
        //     try {
        //         const res = await fetch("http://localhost:5000/api/posters");
        //         if (!res.ok) return setPosters([]);
        //         const data = await res.json();

        //         // For each poster, try the canonical path and fallbacks
        //         const processed = await Promise.all(
        //             data.map(async (p) => {
        //                 const parts = p.image ? p.image.split("/") : [];
        //                 const filename = parts.length ? parts[parts.length - 1] : "";

        //                 const candidates = [
        //                     `http://localhost:5000${p.image}`,
        //                     `http://localhost:5000/uploads/posters/${filename}`,
        //                     `http://localhost:5000/uploads/${filename}`,
        //                 ].filter(Boolean);

        //                 const working = await testUrls(candidates);

        //                 if (working) {
        //                     // store the path part (starting with /uploads... or original path)
        //                     const urlObj = new URL(working);
        //                     return { ...p, _publicUrl: working, image: urlObj.pathname };
        //                 } else {
        //                     return { ...p, _publicUrl: null };
        //                 }
        //             })
        //         );

        //         // Keep only posters that resolved to an actual image
        //         const valid = processed.filter((p) => p._publicUrl);
        //         if (mountedRef.current) setPosters(valid);
        //     } catch (err) {
        //         if (mountedRef.current) setPosters([]);
        //     }
        // };

        const load = async () => {
            try {
                const BASE = import.meta.env.VITE_API_BASE;

                const res = await fetch(`${BASE}/api/posters`);
                if (!res.ok) return setPosters([]);

                const data = await res.json();

                setPosters(data);
            } catch (err) {
                setPosters([]);
            }
        };
        load();

        return () => {
            mountedRef.current = false;
        };
    }, []);

    // Auto slide — depend on posters.length to avoid re-creating when objects change
    useEffect(() => {
        if (!posters.length) return undefined;
        const id = setInterval(() => {
            setCurrent((c) => (c + 1) % posters.length);
        }, 3500);
        return () => clearInterval(id);
    }, [posters.length]);

    if (!posters.length) return null;

    const poster = posters[current];

    // Reset tries on image load so fallback attempts start fresh on next change
    const onLoad = (e) => {
        try {
            delete e.target.dataset.try;
        } catch { }
    };

    // Enhanced onError to try known fallbacks if something slipped through
    // const onError = (e) => {
    //     const img = e.target;
    //     const tries = Number(img.dataset.try || 0);
    //     const parts = poster.image ? poster.image.split("/") : [];
    //     const filename = parts.length ? parts[parts.length - 1] : "";

    //     if (tries === 0) {
    //         img.dataset.try = 1;
    //         img.src = `http://localhost:5000/uploads/posters/${filename}`;
    //     } else if (tries === 1) {
    //         img.dataset.try = 2;
    //         img.src = `http://localhost:5000/uploads/${filename}`;
    //     } else {
    //         img.onerror = null;
    //         img.src = "https://via.placeholder.com/1200x520?text=No+Image";
    //     }
    // };

    const onError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/1200x520?text=No+Image";
};

    return (
        <section className="relative w-full px-4 rounded-2xl overflow-hidden shadow-md -mt-2">
            <img
                key={poster._id}
                // src={poster._publicUrl || `http://localhost:5000${poster.image}`}
                src={poster.image}
                alt="poster"
                onLoad={onLoad}
                onError={onError}
                className="
    w-full
    h-auto
    object-contain
    rounded-2xl
    bg-[#fff2e9]
    border-2 border-[#fff2e9]
  "

            />

            <div className="absolute inset-0" />

            {/* Indicators */}
            <div className="absolute bottom-1 md:bottom-2 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 ">
                {posters.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        aria-label={`Show poster ${idx + 1}`}
                        className={`w-3 h-3 cursor-pointer rounded-full transition-colors ${idx === current ? "bg-white" : "bg-white/40"}`}
                    />
                ))}
            </div>
        </section>
    );
}


