import { useEffect, useState } from "react";
import { http } from "../api/http";

type Course = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnailUrl?: string;      // if your backend returns thumbnail_url, change this key or map it
};

export default function Home(){
  const [courses,setCourses] = useState<Course[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState<string>("");

  useEffect(()=>{
    http.get("/api/courses")
      .then(r => setCourses(r.data ?? []))
      .catch(e => setError(String(e)))
      .finally(()=> setLoading(false));
  },[]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Catalog</h1>

      {loading && <div className="opacity-80">Loading…</div>}
      {error && <div className="text-red-300">Error: {error}</div>}
      {!loading && courses.length === 0 && !error && (
        <div className="opacity-80">No courses yet.</div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <a key={c.id} href={`/course/${c.slug}`}
             className="rounded-2xl p-4 bg-white/5 hover:bg-white/10 border border-white/10 transition">
            <div className="aspect-video rounded-xl bg-white/10 mb-3 overflow-hidden">
              {c.thumbnailUrl && (
                <img src={c.thumbnailUrl} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="text-lg font-semibold mb-1">{c.title}</div>
            <div className="opacity-80 text-sm line-clamp-3">{c.description}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
