import { useEffect, useState } from "react";
import { http } from "../api/http";

type Course = { 
  id: string; 
  title: string; 
  slug: string; 
  description?: string; 
  thumbnailUrl?: string;
  instructor?: string;
  rating?: number;
  students?: number;
  price?: number;
  duration?: string;
  level?: string;
};

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Static Coursera-style data
    const staticCourses: Course[] = [
      {
        id: '1',
        title: 'AI for Quality Managers',
        slug: 'ai-for-quality-managers',
        description: 'Learn practical AI techniques for QA, auditing, and CSAT. Master machine learning applications in quality management.',
        instructor: 'Dr. Sarah Johnson',
        rating: 4.8,
        students: 12500,
        price: 49,
        duration: '6 weeks',
        level: 'Intermediate'
      },
      {
        id: '2',
        title: 'Machine Learning Fundamentals',
        slug: 'ml-fundamentals',
        description: 'Comprehensive introduction to machine learning algorithms, data preprocessing, and model evaluation.',
        instructor: 'Prof. Michael Chen',
        rating: 4.9,
        students: 25000,
        price: 79,
        duration: '8 weeks',
        level: 'Beginner'
      },
      {
        id: '3',
        title: 'Data Science for Business',
        slug: 'data-science-business',
        description: 'Transform business data into actionable insights using Python, SQL, and statistical analysis.',
        instructor: 'Dr. Emily Rodriguez',
        rating: 4.7,
        students: 18000,
        price: 59,
        duration: '10 weeks',
        level: 'Intermediate'
      },
      {
        id: '4',
        title: 'Python Programming Mastery',
        slug: 'python-mastery',
        description: 'From basics to advanced Python programming, including web development and data analysis.',
        instructor: 'Prof. David Kim',
        rating: 4.9,
        students: 35000,
        price: 39,
        duration: '12 weeks',
        level: 'Beginner'
      },
      {
        id: '5',
        title: 'Cloud Computing with AWS',
        slug: 'aws-cloud-computing',
        description: 'Master Amazon Web Services, cloud architecture, and deployment strategies for modern applications.',
        instructor: 'Dr. Lisa Wang',
        rating: 4.8,
        students: 22000,
        price: 89,
        duration: '14 weeks',
        level: 'Advanced'
      },
      {
        id: '6',
        title: 'Cybersecurity Essentials',
        slug: 'cybersecurity-essentials',
        description: 'Learn to protect systems and data from cyber threats with hands-on security practices.',
        instructor: 'Prof. James Wilson',
        rating: 4.6,
        students: 15000,
        price: 69,
        duration: '8 weeks',
        level: 'Intermediate'
      }
    ];

    // Try to get real data, fallback to static
    http.get("/api/courses").then(r => {
      if (r.data && r.data.length > 0) {
        const coursesWithDetails = r.data.map((course: any, index: number) => ({
          ...course,
          instructor: staticCourses[index % staticCourses.length].instructor,
          rating: staticCourses[index % staticCourses.length].rating,
          students: staticCourses[index % staticCourses.length].students,
          price: staticCourses[index % staticCourses.length].price,
          duration: staticCourses[index % staticCourses.length].duration,
          level: staticCourses[index % staticCourses.length].level,
        }));
        setCourses(coursesWithDetails);
      } else {
        setCourses(staticCourses);
      }
      setLoading(false);
    }).catch(() => {
      setCourses(staticCourses);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Coursera-style Header */}
      <header className="coursera-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">SkillVerse</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="coursera-nav-link">Browse</a>
              <a href="#" className="coursera-nav-link">For Business</a>
              <a href="#" className="coursera-nav-link">For Universities</a>
              <a href="#" className="coursera-nav-link">Teach on SkillVerse</a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="coursera-button-secondary">Log in</button>
              <button className="coursera-button-primary">Sign up</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="coursera-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Learn without limits
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees from world-class universities and companies.
          </p>
          <div className="max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="What do you want to learn?" 
              className="coursera-search mb-4"
            />
            <button className="coursera-button-primary w-full">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Courses */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Courses</h2>
          
          <div className="coursera-grid">
            {courses.map((course, index) => (
              <div key={course.id} className="coursera-course-card animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
                {/* Course Image */}
                <div className="coursera-course-image">
                  <span className="text-6xl">📚</span>
                </div>
                
                {/* Course Content */}
                <div className="p-6">
                  {/* Course Level Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="coursera-badge">{course.level}</span>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                  
                  {/* Course Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  {/* Instructor */}
                  <p className="text-sm text-gray-600 mb-3">
                    {course.instructor}
                  </p>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  {/* Rating and Students */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="coursera-rating">
                      <span className="coursera-star">★</span>
                      <span>{course.rating}</span>
                      <span className="text-gray-400">({course.students?.toLocaleString()} students)</span>
                    </div>
                  </div>
                  
                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <span className="coursera-price">${course.price}</span>
                    <a 
                      href={`/course/${course.slug}`}
                      className="coursera-button-primary text-sm px-4 py-2"
                    >
                      Enroll Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Data Science', icon: '📊', courses: 120 },
              { name: 'Programming', icon: '💻', courses: 95 },
              { name: 'AI & Machine Learning', icon: '🤖', courses: 78 },
              { name: 'Business', icon: '💼', courses: 156 },
              { name: 'Design', icon: '🎨', courses: 89 },
              { name: 'Marketing', icon: '📈', courses: 67 },
              { name: 'Health', icon: '🏥', courses: 134 },
              { name: 'Language', icon: '🗣️', courses: 45 }
            ].map((category, index) => (
              <div key={index} className="coursera-card p-6 text-center hover:bg-blue-50">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.courses} courses</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100M+</div>
              <div className="text-gray-600">Learners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">Universities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">3,000+</div>
              <div className="text-gray-600">Companies</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-blue-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Transform your life through education
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Learners around the world are launching new careers, advancing in their fields, and enriching their lives.
          </p>
          <button className="coursera-button-primary text-lg px-8 py-3">
            Join for Free
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold">SkillVerse</span>
              </div>
              <p className="text-gray-400">
                The world's largest online learning platform.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Browse Catalog</a></li>
                <li><a href="#" className="hover:text-white">Degrees</a></li>
                <li><a href="#" className="hover:text-white">Certificates</a></li>
                <li><a href="#" className="hover:text-white">For Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Learners</a></li>
                <li><a href="#" className="hover:text-white">Partners</a></li>
                <li><a href="#" className="hover:text-white">Developers</a></li>
                <li><a href="#" className="hover:text-white">Beta Testers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Accessibility</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkillVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
