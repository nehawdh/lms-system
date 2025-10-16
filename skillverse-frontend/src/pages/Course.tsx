import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { http } from "../api/http";

export default function Course(){
  const { slug } = useParams();
  const [course,setCourse] = useState<any>(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState<string>("");

  useEffect(()=>{
    setLoading(true);
    http.get(`/api/courses/${slug}`)
      .then(r => setCourse(r.data))
      .catch(e => setError(String(e)))
      .finally(()=> setLoading(false));
  },[slug]);

  if (loading) return <div className="opacity-80">Loading…</div>;
  if (error) return <div className="text-red-300">Error: {error}</div>;
  if (!course) return <div className="opacity-80">Not found.</div>;

  return (
    <div className="max-w-3xl">
      <div className="aspect-video rounded-xl bg-white/10 mb-4 overflow-hidden">
        {course.thumbnailUrl && (
          <img src={course.thumbnailUrl} className="w-full h-full object-cover" />
        )}
      </div>
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="opacity-90 mb-6">{course.description}</p>

      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-xl bg-white text-black font-semibold">
          Enroll
        </button>
        <a href="/" className="px-4 py-2 rounded-xl bg-white/10 border border-white/10">
          Back to catalog
        </a>
      </div>
    </div>
  )
}
