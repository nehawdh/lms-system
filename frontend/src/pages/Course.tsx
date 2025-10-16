import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { http } from "../api/http";

type Course = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnailUrl?: string;
  isPublished?: boolean;
};

export default function Course() {
  const { slug } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    http
      .get(`/api/courses/${slug}`)
      .then((res) => setCourse(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-gray-300">Loading course...</div>;
  if (error) return <div className="text-red-400">Error: {error}</div>;
  if (!course) return <div className="text-gray-400">Course not found.</div>;

  return (
    <div className="max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-3">{course.title}</h1>

      {course.description && (
        <p className="opacity-90 mb-6 leading-relaxed">
          {course.description}
        </p>
      )}

      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-xl bg-white text-black font-semibold">
          Enroll
        </button>
        <Link
          to="/"
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/10"
        >
          Back to Catalog
        </Link>
      </div>
    </div>
  );
}
