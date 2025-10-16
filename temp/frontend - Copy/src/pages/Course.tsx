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
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="modern-spinner mx-auto mb-6"></div>
          <p className="text-text-secondary text-lg font-medium">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Course not found</h2>
          <a href="/" className="modern-button-primary">← Back to courses</a>
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
    <div className="min-h-screen bg-bg-secondary">
      {/* Modern Header */}
      <header className="modern-header sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <a href="/" className="text-text-secondary hover:text-primary-blue transition-colors font-medium">← Back</a>
              <div className="w-12 h-12 bg-gradient-to-r from-primary-blue to-secondary-purple rounded-modern flex items-center justify-center shadow-modern-md">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl font-bold text-gradient">SkillVerse</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="streak-fire">
                🔥 7 day streak
              </div>
              <div className="xp-badge">
                ⭐ 1,250 XP
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Course Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="modern-card p-8 sticky top-24">
              {/* Course Header */}
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-blue to-secondary-purple rounded-modern-lg flex items-center justify-center mx-auto mb-6 shadow-modern-lg">
                  <span className="text-white font-bold text-4xl">📚</span>
                </div>
                
                <h2 className="text-2xl font-bold text-text-primary mb-3 text-center">{course.title}</h2>
                <p className="text-text-secondary text-center leading-relaxed">{course.description}</p>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-text-secondary mb-3">
                  <span className="font-semibold">Course Progress</span>
                  <span className="font-bold text-primary-blue">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-border-light rounded-full h-4">
                  <div 
                    className="progress-bar" 
                    style={{width: `${progress}%`}}
                  ></div>
                </div>
                <p className="text-xs text-text-muted mt-2 text-center">
                  {lessons.filter(l => l.completed).length} of {lessons.length} lessons completed
                </p>
              </div>

              {/* Lessons List */}
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-6">Lessons</h3>
                <div className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id}
                      className={`p-4 rounded-modern border-2 transition-all cursor-pointer hover-lift ${
                        lesson.completed 
                          ? 'border-accent-green bg-accent-green-light' 
                          : index === currentLesson
                          ? 'border-primary-blue bg-primary-blue-light'
                          : 'border-border-light bg-bg-primary hover:border-border-medium'
                      }`}
                      onClick={() => startLesson(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-modern flex items-center justify-center font-bold ${
                            lesson.completed 
                              ? 'bg-accent-green text-white' 
                              : index === currentLesson
                              ? 'bg-primary-blue text-white'
                              : 'bg-border-light text-text-secondary'
                          }`}>
                            {lesson.completed ? '✓' : index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-text-primary text-sm">{lesson.title}</div>
                            <div className="text-xs text-text-muted">{lesson.duration} min • {lesson.type}</div>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full ${
                          lesson.completed ? 'bg-accent-green' : 'bg-border-light'
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
              <div className="modern-card p-12">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-primary-blue to-secondary-purple rounded-modern-lg flex items-center justify-center mx-auto mb-8 shadow-modern-lg">
                    <span className="text-white text-6xl">
                      {lessons[currentLesson]?.type === 'video' ? '🎥' : 
                       lessons[currentLesson]?.type === 'reading' ? '📖' : 
                       lessons[currentLesson]?.type === 'practice' ? '💪' : '📝'}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl font-bold text-text-primary mb-6">
                    {lessons[currentLesson]?.title || 'Welcome!'}
                  </h3>
                  
                  <p className="text-text-secondary mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                    {lessons[currentLesson]?.type === 'video' ? 
                      'Watch this video to learn the fundamentals of AI in quality management.' :
                      lessons[currentLesson]?.type === 'reading' ? 
                      'Read through this comprehensive guide to understand the key concepts.' :
                      lessons[currentLesson]?.type === 'practice' ? 
                      'Practice what you\'ve learned with hands-on exercises.' :
                      'Test your knowledge with this interactive quiz.'}
                  </p>

                  <div className="flex justify-center space-x-6">
                    <button 
                      onClick={() => startLesson(currentLesson)}
                      className="modern-button-primary text-lg px-10 py-4"
                    >
                      {lessons[currentLesson]?.completed ? 'Review Lesson' : 'Start Lesson'}
                    </button>
                    
                    {currentLesson < lessons.length - 1 && (
                      <button 
                        onClick={() => setCurrentLesson(currentLesson + 1)}
                        className="modern-button-secondary text-lg px-10 py-4"
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
    <div className="modern-card p-12">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-text-primary mb-4">{lesson.title}</h3>
        <p className="text-text-secondary text-lg">Question {currentQuestion + 1} of {questions.length}</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h4 className="text-2xl font-semibold text-text-primary mb-8 text-center">
            {questions[currentQuestion].question}
          </h4>
          
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-6 rounded-modern text-left transition-all duration-300 hover-lift ${
                  showResult 
                    ? index === questions[currentQuestion].correct
                      ? 'bg-accent-green-light border-2 border-accent-green text-accent-green'
                      : selectedAnswer === index
                      ? 'bg-red-100 border-2 border-red-500 text-red-800'
                      : 'bg-border-light border-2 border-border-light text-text-secondary'
                    : selectedAnswer === index
                    ? 'bg-primary-blue-light border-2 border-primary-blue text-primary-blue'
                    : 'bg-bg-primary border-2 border-border-light hover:border-primary-blue text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-modern border-2 flex items-center justify-center font-bold ${
                    showResult 
                      ? index === questions[currentQuestion].correct
                        ? 'border-accent-green bg-accent-green text-white'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-500 text-white'
                        : 'border-border-medium'
                      : selectedAnswer === index
                      ? 'border-primary-blue bg-primary-blue text-white'
                      : 'border-border-medium'
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
                  <span className="font-semibold text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="text-center">
            <div className={`text-2xl font-bold mb-6 ${
              selectedAnswer === questions[currentQuestion].correct ? 'text-accent-green' : 'text-red-500'
            }`}>
              {selectedAnswer === questions[currentQuestion].correct ? '🎉 Correct!' : '❌ Incorrect'}
            </div>
            
            <div className="flex justify-center space-x-6">
              <button 
                onClick={nextQuestion}
                className="modern-button-primary text-lg px-8 py-4"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </button>
              
              <button 
                onClick={onSkip}
                className="modern-button-secondary text-lg px-8 py-4"
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
