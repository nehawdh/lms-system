import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { http } from "../api/http";

type Course = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnailUrl?: string;
};

type Lesson = {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'reading' | 'practice';
  completed: boolean;
  duration: number;
};

export default function Course() {
  const { slug } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    http.get(`/api/courses/${slug}`).then(r => {
      setCourse(r.data);
      
      // Mock lessons data
      const mockLessons: Lesson[] = [
        { id: '1', title: 'Introduction to AI', type: 'video', completed: true, duration: 5 },
        { id: '2', title: 'AI Fundamentals Quiz', type: 'quiz', completed: false, duration: 3 },
        { id: '3', title: 'Quality Management Basics', type: 'reading', completed: false, duration: 8 },
        { id: '4', title: 'AI in QA Practice', type: 'practice', completed: false, duration: 10 },
        { id: '5', title: 'Final Assessment', type: 'quiz', completed: false, duration: 15 },
      ];
      setLessons(mockLessons);
      setLoading(false);
    });
  }, [slug]);

  const progress = lessons.length > 0 ? (lessons.filter(l => l.completed).length / lessons.length) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Course not found</h2>
          <a href="/" className="text-green-500 hover:text-green-600">← Back to courses</a>
        </div>
      </div>
    );
  }

  const startLesson = (lessonIndex: number) => {
    setCurrentLesson(lessonIndex);
    if (lessons[lessonIndex].type === 'quiz') {
      setShowQuiz(true);
    }
  };

  const completeLesson = () => {
    const updatedLessons = [...lessons];
    updatedLessons[currentLesson].completed = true;
    setLessons(updatedLessons);
    setShowQuiz(false);
    
    // Move to next lesson if available
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-800">← Back</a>
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">SkillVerse</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="streak-fire animate-pulse-glow">
                🔥 7 day streak
              </div>
              <div className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold">
                ⭐ 1,250 XP
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              {/* Course Header */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-3xl">📚</span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{course.title}</h2>
                <p className="text-gray-600 text-sm text-center">{course.description}</p>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Course Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="progress-bar" 
                    style={{width: `${progress}%`}}
                  ></div>
                </div>
              </div>

              {/* Lessons List */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Lessons</h3>
                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                        lesson.completed 
                          ? 'border-green-200 bg-green-50' 
                          : index === currentLesson
                          ? 'border-blue-200 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      onClick={() => startLesson(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            lesson.completed 
                              ? 'bg-green-500 text-white' 
                              : index === currentLesson
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {lesson.completed ? '✓' : index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 text-sm">{lesson.title}</div>
                            <div className="text-xs text-gray-500">{lesson.duration} min • {lesson.type}</div>
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          lesson.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {showQuiz ? (
              <QuizComponent 
                lesson={lessons[currentLesson]} 
                onComplete={completeLesson}
                onSkip={() => setShowQuiz(false)}
              />
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-4xl">
                      {lessons[currentLesson]?.type === 'video' ? '🎥' : 
                       lessons[currentLesson]?.type === 'reading' ? '📖' : 
                       lessons[currentLesson]?.type === 'practice' ? '💪' : '📝'}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    {lessons[currentLesson]?.title || 'Welcome!'}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {lessons[currentLesson]?.type === 'video' ? 
                      'Watch this video to learn the fundamentals of AI in quality management.' :
                      lessons[currentLesson]?.type === 'reading' ? 
                      'Read through this comprehensive guide to understand the key concepts.' :
                      lessons[currentLesson]?.type === 'practice' ? 
                      'Practice what you\'ve learned with hands-on exercises.' :
                      'Test your knowledge with this interactive quiz.'}
                  </p>

                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => startLesson(currentLesson)}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105"
                    >
                      {lessons[currentLesson]?.completed ? 'Review Lesson' : 'Start Lesson'}
                    </button>
                    
                    {currentLesson < lessons.length - 1 && (
                      <button 
                        onClick={() => setCurrentLesson(currentLesson + 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-xl font-bold transition-all duration-200"
                      >
                        Skip
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Quiz Component
function QuizComponent({ lesson, onComplete, onSkip }: { 
  lesson: Lesson; 
  onComplete: () => void; 
  onSkip: () => void; 
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "What is the primary goal of AI in quality management?",
      options: [
        "To replace human workers",
        "To improve efficiency and accuracy in QA processes",
        "To reduce costs only",
        "To eliminate all manual processes"
      ],
      correct: 1
    },
    {
      question: "Which AI technique is most commonly used for quality control?",
      options: [
        "Machine Learning",
        "Computer Vision",
        "Natural Language Processing",
        "All of the above"
      ],
      correct: 3
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{lesson.title}</h3>
        <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h4>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  showResult 
                    ? index === questions[currentQuestion].correct
                      ? 'bg-green-100 border-2 border-green-500 text-green-800'
                      : selectedAnswer === index
                      ? 'bg-red-100 border-2 border-red-500 text-red-800'
                      : 'bg-gray-100 border-2 border-gray-200 text-gray-600'
                    : selectedAnswer === index
                    ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    showResult 
                      ? index === questions[currentQuestion].correct
                        ? 'border-green-500 bg-green-500 text-white'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-300'
                      : selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300'
                  }`}>
                    {showResult 
                      ? index === questions[currentQuestion].correct
                        ? '✓'
                        : selectedAnswer === index
                        ? '✗'
                        : String.fromCharCode(65 + index)
                      : selectedAnswer === index
                      ? '✓'
                      : String.fromCharCode(65 + index)
                    }
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="text-center">
            <div className={`text-lg font-bold mb-4 ${
              selectedAnswer === questions[currentQuestion].correct ? 'text-green-600' : 'text-red-600'
            }`}>
              {selectedAnswer === questions[currentQuestion].correct ? '🎉 Correct!' : '❌ Incorrect'}
            </div>
            
            <div className="flex justify-center space-x-4">
              <button 
                onClick={nextQuestion}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </button>
              
              <button 
                onClick={onSkip}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all duration-200"
              >
                Skip Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
