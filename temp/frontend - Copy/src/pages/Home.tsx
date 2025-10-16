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
      <div className="min-h-screen flex items-center justify-center bg-bg-secondary">
        <div className="text-center">
          <div className="modern-spinner mx-auto mb-6"></div>
          <p className="text-text-secondary text-lg font-medium">Loading amazing courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Modern Header */}
      <header className="modern-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-blue to-secondary-purple rounded-modern flex items-center justify-center mr-4 shadow-modern-md">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-2xl font-bold text-gradient">SkillVerse</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-2">
              <a href="#" className="modern-nav-link">Browse</a>
              <a href="#" className="modern-nav-link">For Business</a>
              <a href="#" className="modern-nav-link">For Universities</a>
              <a href="#" className="modern-nav-link">Teach on SkillVerse</a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="modern-button-secondary">Log in</button>
              <button className="modern-button-primary">Sign up</button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <section className="modern-hero relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fadeInUp">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Learn without 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                limits
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
              Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees from world-class universities and companies.
            </p>
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="What do you want to learn?" 
                  className="modern-search text-lg pr-32"
                />
                <button className="modern-button-primary absolute right-2 top-2 bottom-2 px-6 text-sm">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-modern flex items-center justify-center text-2xl">
            🎓
          </div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{animationDelay: '1s'}}>
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-modern flex items-center justify-center text-xl">
            💡
          </div>
        </div>
        <div className="absolute bottom-20 left-20 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-14 h-14 bg-white bg-opacity-20 rounded-modern flex items-center justify-center text-xl">
            🚀
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Courses */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Featured Courses
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Discover our most popular courses handpicked by industry experts
            </p>
          </div>
          
          <div className="modern-grid">
            {courses.map((course, index) => (
              <div key={course.id} className="modern-course-card animate-fadeInUp hover-lift" style={{animationDelay: `${index * 0.1}s`}}>
                {/* Course Image */}
                <div className="modern-course-image">
                  <span className="text-6xl">📚</span>
                </div>
                
                {/* Course Content */}
                <div className="p-8">
                  {/* Course Level Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="modern-badge">{course.level}</span>
                    <span className="text-sm text-text-muted font-medium">{course.duration}</span>
                  </div>
                  
                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  {/* Instructor */}
                  <p className="text-sm text-text-secondary mb-4 font-medium">
                    👨‍🏫 {course.instructor}
                  </p>
                  
                  {/* Description */}
                  <p className="text-sm text-text-secondary mb-6 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                  
                  {/* Rating and Students */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="modern-rating">
                      <span className="modern-star">★</span>
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-text-muted">({course.students?.toLocaleString()} students)</span>
                    </div>
                  </div>
                  
                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <span className="modern-price">${course.price}</span>
                    <a 
                      href={`/course/${course.slug}`}
                      className="modern-button-primary text-sm px-6 py-3"
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
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Popular Categories
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Explore courses by category and find your perfect learning path
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Data Science', icon: '📊', courses: 120, color: 'from-blue-500 to-blue-600' },
              { name: 'Programming', icon: '💻', courses: 95, color: 'from-green-500 to-green-600' },
              { name: 'AI & Machine Learning', icon: '🤖', courses: 78, color: 'from-purple-500 to-purple-600' },
              { name: 'Business', icon: '💼', courses: 156, color: 'from-orange-500 to-orange-600' },
              { name: 'Design', icon: '🎨', courses: 89, color: 'from-pink-500 to-pink-600' },
              { name: 'Marketing', icon: '📈', courses: 67, color: 'from-red-500 to-red-600' },
              { name: 'Health', icon: '🏥', courses: 134, color: 'from-teal-500 to-teal-600' },
              { name: 'Language', icon: '🗣️', courses: 45, color: 'from-indigo-500 to-indigo-600' }
            ].map((category, index) => (
              <div key={index} className="modern-card p-8 text-center hover-lift animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-modern flex items-center justify-center mx-auto mb-4 text-2xl text-white shadow-modern-md`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-text-primary mb-2 text-lg">{category.name}</h3>
                <p className="text-text-secondary font-medium">{category.courses} courses</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary-blue-light to-secondary-purple-light rounded-modern-lg p-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div className="animate-fadeInUp">
              <div className="text-5xl font-bold text-gradient mb-4">5,000+</div>
              <div className="text-text-secondary text-lg font-semibold">Courses</div>
            </div>
            <div className="animate-fadeInUp" style={{animationDelay: '0.1s'}}>
              <div className="text-5xl font-bold text-gradient mb-4">100M+</div>
              <div className="text-text-secondary text-lg font-semibold">Learners</div>
            </div>
            <div className="animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <div className="text-5xl font-bold text-gradient mb-4">200+</div>
              <div className="text-text-secondary text-lg font-semibold">Universities</div>
            </div>
            <div className="animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <div className="text-5xl font-bold text-gradient mb-4">3,000+</div>
              <div className="text-text-secondary text-lg font-semibold">Companies</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary-blue to-secondary-purple rounded-modern-lg p-16 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform your life through education
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Learners around the world are launching new careers, advancing in their fields, and enriching their lives.
          </p>
          <button className="bg-white text-primary-blue hover:bg-gray-100 text-lg px-10 py-4 rounded-modern font-bold transition-all duration-300 hover:scale-105 shadow-modern-lg">
            Join for Free
          </button>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-r from-text-primary to-gray-800 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-blue to-secondary-purple rounded-modern flex items-center justify-center mr-4 shadow-modern-md">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-2xl font-bold">SkillVerse</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                The world's largest online learning platform, empowering learners worldwide to achieve their goals.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Platform</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Browse Catalog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Degrees</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Certificates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Community</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Learners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Developers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Beta Testers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Support</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkillVerse. All rights reserved. Made with ❤️ for learners worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
