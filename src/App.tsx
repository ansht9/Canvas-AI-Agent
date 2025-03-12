import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {
  User,
  LayoutDashboard,
  BookOpen,
  Users,
  Calendar,
  Inbox,
  History,
  HelpCircle,
  Accessibility,
  ChevronDown,
  ChevronRight,
  FileText,
  ArrowLeft,
  GraduationCap,
  FileQuestion,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Brain,
  BarChart,
  LineChart,
  BookOpenCheck,
  PencilLine,
  Loader2
} from 'lucide-react';

// Mock API response for development
const mockAnalytics = {
  positive: `Strong understanding of D3.js fundamentals:
- Excellent grasp of data binding concepts and implementation
- Strong comprehension of transitions and animations
- Solid understanding of basic visualization principles
- Effective use of SVG elements for visualization`,
  negative: `Areas that need attention:
- Advanced scale types and their applications
- Complex axis configurations and customization
- Performance optimization for large datasets
- Advanced SVG manipulation techniques`
};

const quizResults = {
  "D3.js Fundamentals": {
    title: "D3.js Fundamentals Quiz",
    dueDate: "Sep 22, 2024 at 11:59pm",
    timeLimit: "30 Minutes",
    attempts: "2",
    points: 5,
    score: 5,
    totalQuestions: 10,
    questions: [
      {
        question: "What is the primary purpose of D3.js?",
        options: [
          "To create static images",
          "To manipulate data and create dynamic visualizations",
          "To store data in databases",
          "To handle server-side rendering"
        ],
        correctAnswer: "To manipulate data and create dynamic visualizations",
        userAnswer: "To manipulate data and create dynamic visualizations",
        correct: true
      },
      {
        question: "Which method is used to bind data to DOM elements in D3.js?",
        options: [
          ".bind()",
          ".connect()",
          ".data()",
          ".join()"
        ],
        correctAnswer: ".data()",
        userAnswer: ".data()",
        correct: true
      },
      {
        question: "What is the purpose of D3.js scales?",
        options: [
          "To resize the browser window",
          "To measure screen resolution",
          "To map data values to visual properties",
          "To scale images proportionally"
        ],
        correctAnswer: "To map data values to visual properties",
        userAnswer: "To map data values to visual properties",
        correct: true
      },
      {
        question: "Which of these is NOT a valid D3.js scale type?",
        options: [
          "Linear scale",
          "Logarithmic scale",
          "Exponential scale",
          "Quantum scale"
        ],
        correctAnswer: "Quantum scale",
        userAnswer: "Linear scale",
        correct: false
      },
      {
        question: "What is the purpose of D3.js transitions?",
        options: [
          "To change page layouts",
          "To animate changes in data visualization",
          "To transition between different web pages",
          "To load new datasets"
        ],
        correctAnswer: "To animate changes in data visualization",
        userAnswer: "To animate changes in data visualization",
        correct: true
      },
      {
        question: "Which SVG element is typically used to create a bar chart in D3.js?",
        options: [
          "<circle>",
          "<rect>",
          "<line>",
          "<path>"
        ],
        correctAnswer: "<rect>",
        userAnswer: "<circle>",
        correct: false
      },
      {
        question: "What is the purpose of D3.js's enter() selection?",
        options: [
          "To remove elements",
          "To update existing elements",
          "To create new elements for new data",
          "To merge selections"
        ],
        correctAnswer: "To create new elements for new data",
        userAnswer: "To create new elements for new data",
        correct: true
      },
      {
        question: "Which D3.js function is used to create an axis?",
        options: [
          "d3.createAxis()",
          "d3.makeAxis()",
          "d3.axis()",
          "d3.newAxis()"
        ],
        correctAnswer: "d3.axis()",
        userAnswer: "d3.makeAxis()",
        correct: false
      },
      {
        question: "What is the purpose of d3.extent()?",
        options: [
          "To calculate the average of values",
          "To find the minimum and maximum values",
          "To extend the SVG canvas",
          "To measure the extent of animations"
        ],
        correctAnswer: "To find the minimum and maximum values",
        userAnswer: "To extend the SVG canvas",
        correct: false
      },
      {
        question: "Which event listener is commonly used for hover interactions in D3.js?",
        options: [
          "hover",
          "mouseover",
          "onHover",
          "mouseHover"
        ],
        correctAnswer: "mouseover",
        userAnswer: "mouseover",
        correct: true
      }
    ]
  }
};

const assignmentRubric = {
  "Basic D3.js Visualization": {
    score: 92,
    maxScore: 100,
    criteria: [
      {
        name: "Data Binding & Visualization Clarity",
        score: 18,
        maxScore: 20,
        feedback: "Excellent data binding implementation. Visualization clearly represents the dataset."
      },
      {
        name: "SVG Element Usage",
        score: 18,
        maxScore: 20,
        feedback: "Good use of SVG elements. Consider using more advanced SVG features."
      },
      {
        name: "Scales & Axes Implementation",
        score: 19,
        maxScore: 20,
        feedback: "Perfect implementation of scales and axes."
      },
      {
        name: "Code Organization & Documentation",
        score: 18,
        maxScore: 20,
        feedback: "Well-organized code with clear comments."
      },
      {
        name: "Interactivity & User Experience",
        score: 19,
        maxScore: 20,
        feedback: "Excellent interactive features. Smooth transitions."
      }
    ]
  },
  "Advanced Visualization Project": {
    score: 95,
    maxScore: 100,
    criteria: [
      {
        name: "Complex Data Handling",
        score: 19,
        maxScore: 20,
        feedback: "Excellent handling of complex datasets."
      },
      {
        name: "Advanced D3.js Features",
        score: 19,
        maxScore: 20,
        feedback: "Great use of advanced D3.js features and transitions."
      },
      {
        name: "Visualization Design",
        score: 20,
        maxScore: 20,
        feedback: "Outstanding visual design and user experience."
      },
      {
        name: "Performance Optimization",
        score: 18,
        maxScore: 20,
        feedback: "Good performance. Consider further optimization for large datasets."
      },
      {
        name: "Documentation & Presentation",
        score: 19,
        maxScore: 20,
        feedback: "Well-documented code and excellent presentation."
      }
    ]
  }
};

const improvementQuiz = [
  {
    question: "Which of the following chart types is best suited for showing trends over time?",
    options: {
      A: "Pie chart",
      B: "Bar chart",
      C: "Line chart",
      D: "Scatter plot"
    },
    correctAnswer: "C"
  },
  {
    question: "What is the primary purpose of data visualization?",
    options: {
      A: "To make data look pretty",
      B: "To communicate information clearly and effectively",
      C: "To increase data storage efficiency",
      D: "To encrypt sensitive data"
    },
    correctAnswer: "B"
  },
  {
    question: "Which color scheme is most effective for viewers with color blindness?",
    options: {
      A: "Red-Green",
      B: "Blue-Yellow",
      C: "Red-Blue",
      D: "Green-Purple"
    },
    correctAnswer: "B"
  },
  {
    question: "What type of visualization is best for comparing discrete categories?",
    options: {
      A: "Bar chart",
      B: "Line chart",
      C: "Area chart",
      D: "Bubble chart"
    },
    correctAnswer: "A"
  },
  {
    question: "In a heatmap, what typically represents the data values?",
    options: {
      A: "Size of circles",
      B: "Length of bars",
      C: "Intensity of color",
      D: "Angle of lines"
    },
    correctAnswer: "C"
  },
  {
    question: "Which of these is NOT a principle of good data visualization design?",
    options: {
      A: "Clarity",
      B: "Accuracy",
      C: "Complexity",
      D: "Efficiency"
    },
    correctAnswer: "C"
  },
  {
    question: "What type of chart is best for showing the composition of a whole?",
    options: {
      A: "Scatter plot",
      B: "Pie chart",
      C: "Histogram",
      D: "Box plot"
    },
    correctAnswer: "B"
  },
  {
    question: "What does a 'legend' in a visualization typically do?",
    options: {
      A: "Explains the data source",
      B: "Defines the symbols or colors used",
      C: "Lists the raw data values",
      D: "Shows the calculation formulas"
    },
    correctAnswer: "B"
  },
  {
    question: "Which visualization tool is commonly used to detect outliers in a dataset?",
    options: {
      A: "Pie chart",
      B: "Box plot",
      C: "Bar chart",
      D: "Line chart"
    },
    correctAnswer: "B"
  },
  {
    question: "When should you avoid using a 3D chart?",
    options: {
      A: "When data is simple and 2D is sufficient",
      B: "When you want to impress the audience",
      C: "When showing time-based data",
      D: "When comparing multiple variables"
    },
    correctAnswer: "A"
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('modules');
  const [expandedSection, setExpandedSection] = useState('part2');
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer
    });
  };

  const handleQuizClick = (quizName) => {
    setSelectedQuiz(quizResults[quizName]);
    setActiveTab('quiz');
  };

  const handleCanvasAssistant = (sectionData) => {
    setActiveTab('canvas-assistant');
    setAnalytics(null);
    setShowAnalytics(false);
  };

  const handleStartQuiz = async () => {
    setIsGeneratingQuiz(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setShowQuizModal(true);
    setSelectedAnswers({});
    setQuizScore(null);
    setIsGeneratingQuiz(false);
  };

  const handleSubmitQuiz = () => {
    const correctAnswers = improvementQuiz.reduce((acc, question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    
    const score = Math.round((correctAnswers / improvementQuiz.length) * 100);
    setQuizScore(score);
  };

  const handleAnalyzePerformance = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setAnalytics(mockAnalytics);
    setShowAnalytics(true);
    setIsLoading(false);
  };

  const addCanvasAssistant = (items, quiz, rubric) => {
    return [
      ...items,
      {
        type: 'canvas-assistant',
        content: "Canvas+ Assistant",
        icon: <Brain className="w-4 h-4" />,
        onClick: () => handleCanvasAssistant({ quiz, rubric })
      }
    ];
  };

  const part2Items = [
    {
      type: 'topic',
      content: "Topic 2.1: Basics of D3.js"
    },
    {
      type: 'topic',
      content: "Topic 2.2: Scales, Axes, and Color in D3.js"
    },
    {
      type: 'topic',
      content: "Topic 2.3: Interactivity in D3.js"
    },
    {
      type: 'assignment',
      content: "Assignment: Basic D3.js Visualization",
      icon: <GraduationCap className="w-4 h-4" />,
      details: assignmentRubric["Basic D3.js Visualization"]
    },
    {
      type: 'quiz',
      content: "Quiz: D3.js Fundamentals",
      icon: <FileQuestion className="w-4 h-4" />,
      details: quizResults["D3.js Fundamentals"]
    },
    {
      type: 'discussion',
      content: "Discussion: Visualization Techniques",
      icon: <MessageSquare className="w-4 h-4" />
    }
  ];

  const part3Items = [
    {
      type: 'topic',
      content: "Topic 3.1: Dynamic Dashboards and Visualizing Dense Data"
    },
    {
      type: 'topic',
      content: "Topic 3.2: Network Visualization"
    },
    {
      type: 'assignment',
      content: "Assignment: Advanced Visualization Project",
      icon: <GraduationCap className="w-4 h-4" />,
      details: assignmentRubric["Advanced Visualization Project"]
    },
    {
      type: 'quiz',
      content: "Quiz: Advanced D3.js Concepts",
      icon: <FileQuestion className="w-4 h-4" />,
      details: quizResults["D3.js Fundamentals"]
    },
    {
      type: 'discussion',
      content: "Discussion: Visualization Ethics",
      icon: <MessageSquare className="w-4 h-4" />
    }
  ];

  const finalPart2Items = addCanvasAssistant(
    part2Items,
    quizResults["D3.js Fundamentals"],
    assignmentRubric["Basic D3.js Visualization"]
  );

  const finalPart3Items = addCanvasAssistant(
    part3Items,
    quizResults["D3.js Fundamentals"],
    assignmentRubric["Advanced Visualization Project"]
  );

  return (
    <div className="flex min-h-screen bg-white">
      <Toaster position="top-right" />
      <aside className="w-[90px] bg-[#2D2D2D] text-white flex flex-col items-center">
        <div className="w-full p-2 border-b border-gray-700">
          <img 
            src="https://images.unsplash.com/photo-1599008633840-052c7f756385?w=150&h=50&fit=crop" 
            alt="University Logo" 
            className="w-full mb-1"
          />
        </div>
        
        <nav className="w-full flex flex-col items-center gap-1 py-2">
          <NavItem icon={<User />} text="Account" />
          <NavItem icon={<LayoutDashboard />} text="Dashboard" />
          <NavItem icon={<BookOpen />} text="Courses" />
          <NavItem icon={<Users />} text="Groups" />
          <NavItem icon={<Calendar />} text="Calendar" />
          <NavItem icon={<Inbox />} text="Inbox" badge="25" />
          <NavItem icon={<History />} text="History" />
          <NavItem icon={<HelpCircle />} text="Help" badge="4" />
          <NavItem icon={<Accessibility />} text="Accessibility" />
        </nav>

        <div className="mt-auto p-2 border-t border-gray-700 w-full flex justify-center">
          <ArrowLeft className="w-6 h-6" />
        </div>
      </aside>

      <nav className="w-[200px] bg-[#F5F5F5] border-r border-gray-300">
        <div className="p-4 border-b border-gray-300">
          <div className="text-sm text-gray-600">2025 Spring C</div>
        </div>

        <div className="py-2">
          <SecondaryNavItem text="Home" />
          <SecondaryNavItem text="Announcements" />
          <SecondaryNavItem text="Assignments" />
          <SecondaryNavItem text="Discussions" />
          <SecondaryNavItem text="Grades" badge="1" />
          <SecondaryNavItem text="Modules" active={activeTab === 'modules'} onClick={() => setActiveTab('modules')} />
          <SecondaryNavItem text="Files" />
          <SecondaryNavItem text="Syllabus" />
          <SecondaryNavItem text="People" />
        </div>
      </nav>

      <main className="flex-1 bg-white">
        {activeTab === 'modules' && (
          <div className="p-6">
            <Section
              title="Part 2: D3.js Mastery"
              isExpanded={expandedSection === 'part2'}
              onToggle={() => setExpandedSection(expandedSection === 'part2' ? '' : 'part2')}
              expandedItem={expandedItem}
              setExpandedItem={setExpandedItem}
              onQuizClick={handleQuizClick}
              items={finalPart2Items}
            />

            <Section
              title="Part 3: Advanced Topics and Responsible Visualization"
              isExpanded={expandedSection === 'part3'}
              onToggle={() => setExpandedSection(expandedSection === 'part3' ? '' : 'part3')}
              expandedItem={expandedItem}
              setExpandedItem={setExpandedItem}
              onQuizClick={handleQuizClick}
              items={finalPart3Items}
            />
          </div>
        )}
        {activeTab === 'quiz' && selectedQuiz && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <button 
                onClick={() => setActiveTab('modules')}
                className="text-gray-600 hover:text-gray-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Modules
              </button>
            </div>
            
            <div className="bg-white border border-gray-300 rounded-lg">
              <div className="p-6 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedQuiz.title}</h1>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Due: {selectedQuiz.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Time Limit: {selectedQuiz.timeLimit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Points: {selectedQuiz.points}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Allowed Attempts: {selectedQuiz.attempts}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {selectedQuiz.questions.map((question, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <div className="flex justify-between p-3 bg-gray-50 border-b border-gray-200">
                        <h3 className="font-medium">Question {index + 1}</h3>
                        <span className="text-sm text-gray-600">0.4 / 0.4 pts</span>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-800 mb-4">{question.question}</p>
                        <div className="space-y-3">
                          {question.options.map((option, optIndex) => (
                            <label key={optIndex} className="flex items-center gap-3 text-gray-600">
                              <input
                                type="radio"
                                name={`question-${index}`}
                                checked={option === question.userAnswer}
                                onChange={() => handleAnswerChange(index, option)}
                                className="w-4 h-4 text-[#8C1D40] border-gray-300 focus:ring-[#8C1D40]"
                              />
                              <span className="text-sm">{option}</span>
                              {option === question.userAnswer && (
                                question.correct ? 
                                  <CheckCircle2 className="w-4 h-4 text-green-500 ml-2" /> :
                                  <XCircle className="w-4 h-4 text-red-500 ml-2" />
                              )}
                            </label>
                          ))}
                        </div>
                        {question.userAnswer && !question.correct && (
                          <p className="mt-2 text-sm text-red-600">
                            Correct answer: {question.correctAnswer}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="bg-[#8C1D40] text-white px-4 py-2 rounded hover:bg-[#6E1732] transition-colors">
                    Take Quiz Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'canvas-assistant' && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <button 
                onClick={() => setActiveTab('modules')}
                className="text-gray-600 hover:text-gray-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Modules
              </button>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg">
              <div className="p-6 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  Canvas+ Assistant
                </h1>
                <p className="text-gray-600">AI-powered analysis of your performance</p>
              </div>

              <div className="p-6">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart className="w-5 h-5" />
                    Performance Analytics
                  </h2>
                  
                  {!showAnalytics ? (
                    <div className="flex justify-center">
                      <button
                        onClick={handleAnalyzePerformance}
                        disabled={isLoading}
                        className="bg-[#8C1D40] text-white px-6 py-3 rounded-lg hover:bg-[#6E1732] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Analyzing Performance...
                          </>
                        ) : (
                          <>
                            <LineChart className="w-5 h-5" />
                            Analyze Performance
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h3 className="text-green-800 font-medium mb-2">Strengths</h3>
                          <p className="text-green-700 whitespace-pre-line">{analytics.positive}</p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h3 className="text-red-800 font-medium mb-2">Areas for Improvement</h3>
                          <p className="text-red-700 whitespace-pre-line">{analytics.negative}</p>
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        <button
                          onClick={() => toast.success("Resources will be available soon!")}
                          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <BookOpenCheck className="w-5 h-5" />
                          Get Resources for Your Studies
                        </button>
                        
                        <button
                          onClick={handleStartQuiz}
                          disabled={isGeneratingQuiz}
                          className="w-full bg-[#8C1D40] text-white px-4 py-2 rounded hover:bg-[#6E1732] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGeneratingQuiz ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Generating Quiz...
                            </>
                          ) : (
                            <>
                              <PencilLine className="w-5 h-5" />
                              Generate Updated Quiz
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {showQuizModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Test Your Knowledge</h2>
                    <p className="text-gray-600">Focus on your areas of improvement</p>
                  </div>

                  <div className="p-6 space-y-6">
                    {!quizScore ? (
                      <>
                        {improvementQuiz.map((question, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <p className="font-medium mb-4">{question.question}</p>
                            <div className="space-y-2">
                              {Object.entries(question.options).map(([key, value]) => (
                                <label key={key} className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={key}
                                    checked={selectedAnswers[index] === key}
                                    onChange={() => handleAnswerChange(index, key)}
                                    className="w-4 h-4 text-[#8C1D40] border-gray-300 focus:ring-[#8C1D40]"
                                  />
                                  <span>{value}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-end">
                          <button
                            onClick={handleSubmitQuiz}
                            className="bg-[#8C1D40] text-white px-6 py-2 rounded hover:bg-[#6E1732] transition-colors"
                          >
                            Submit Quiz
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <h3 className="text-2xl font-bold mb-4">Your Score: {quizScore}%</h3>
                        <p className="text-gray-600 mb-6">
                          Would you like to proceed with getting a new analysis based on your quiz results?
                        </p>
                        <div className="space-x-4">
                          <button
                            onClick={() => {
                              setShowQuizModal(false);
                              toast.success("Analysis updated successfully!");
                            }}
                            className="bg-[#8C1D40] text-white px-6 py-2 rounded hover:bg-[#6E1732] transition-colors"
                          >
                            Get New Analysis
                          </button>
                          <button
                            onClick={() => setShowQuizModal(false)}
                            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function NavItem({ icon, text, badge }) {
  return (
    <div className="w-full flex flex-col items-center py-2 px-1 hover:bg-gray-700 cursor-pointer">
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] text-center mt-1">{text}</span>
    </div>
  );
}

function SecondaryNavItem({ text, badge, active, onClick }) {
  return (
    <div 
      className={`flex items-center px-4 py-2 text-sm cursor-pointer ${
        active ? 'bg-white text-[#8C1D40]' : 'text-gray-700 hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      <span>{text}</span>
      {badge && (
        <span className="ml-auto bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
          {badge}
        </span>
      )}
    </div>
  );
}

function Section({ title, isExpanded, onToggle, items, expandedItem, setExpandedItem, onQuizClick }) {
  return (
    <div className="border border-gray-300 rounded bg-gray-50 mb-4">
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100"
        onClick={onToggle}
      >
        <h2 className="text-gray-700 font-medium flex items-center gap-2">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          {title}
        </h2>
      </div>
      {isExpanded && (
        <div className="border-t border-gray-300">
          {items.map((item, index) => (
            <div key={index}>
              <div 
                className={`p-3 border-b border-gray-200 bg-white hover:bg-gray-50 cursor-pointer flex items-center gap-2 ${
                  item.type !== 'topic' ? 'pl-6 text-sm text-gray-600' : ''
                } ${
                  item.type === 'canvas-assistant' ? 'bg-[#8C1D40] bg-opacity-5 hover:bg-opacity-10 text-[#8C1D40]' : ''
                }`}
                onClick={() => {
                  if (item.type === 'quiz') {
                    const quizName = item.content.replace('Quiz: ', '');
                    onQuizClick(quizName);
                  } else if (item.type === 'canvas-assistant') {
                    item.onClick();
                  } else {
                    setExpandedItem(expandedItem === index ? null : index);
                  }
                }}
              >
                {item.icon}
                <span className="flex-1">{item.content}</span>
                {item.details && (
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-medium">
                      {item.type === 'assignment' ? 
                        `${item.details.score}/${item.details.maxScore}` :
                        `${item.details.score}/${item.details.totalQuestions}`
                      }
                    </span>
                    {expandedItem === index ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </div>
                )}
              </div>
              {expandedItem === index && item.details && item.type === 'assignment' && (
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Rubric</h3>
                    {item.details.criteria.map((criterion, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800">{criterion.name}</span>
                          <span className="text-green-600">{criterion.score}/{criterion.maxScore}</span>
                        </div>
                        <p className="text-sm text-gray-600">{criterion.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;