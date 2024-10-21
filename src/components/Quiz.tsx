import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuizProps {
    module: 'loops' | 'conditionals';
    language: string;
}

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

const Quiz: React.FC<QuizProps> = ({ module, language }) => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        // We can use an API for questions
        const loopsQuestions = [
            {
                question: "What is the purpose of a loop in programming?",
                options: [
                    "To make decisions in code",
                    "To repeat a block of code multiple times",
                    "To define functions",
                    "To import libraries"
                ],
                correctAnswer: 1,
                explanation: "Loops are used to repeat a block of code multiple times, allowing for efficient execution of repetitive tasks."
            },
            {
                question: "Which of the following is NOT a type of loop in most programming languages?",
                options: [
                    "for loop",
                    "while loop",
                    "do-while loop",
                    "if loop"
                ],
                correctAnswer: 3,
                explanation: "The 'if' statement is used for conditional branching, not looping. The other options are common types of loops."
            }
        ];

        const conditionalsQuestions = [
            {
                question: "What is the purpose of an 'if' statement in programming?",
                options: [
                    "To create a loop",
                    "To define a function",
                    "To make decisions based on conditions",
                    "To import modules"
                ],
                correctAnswer: 2,
                explanation: "The 'if' statement is used to make decisions in code based on specified conditions."
            },
            {
                question: "Which of the following is NOT a valid comparison operator in most programming languages?",
                options: [
                    "==",
                    "<",
                    ">",
                    "=>"
                ],
                correctAnswer: 3,
                explanation: "'=>' is not a valid comparison operator. It's often used as an arrow function syntax in some languages. The correct 'greater than or equal to' operator is '>='."
            }
        ];

        setQuestions(module === 'loops' ? loopsQuestions : conditionalsQuestions);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowExplanation(false);
        setQuizCompleted(false);
    }, [module, language]);

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowExplanation(false);
        setQuizCompleted(false);
    };

    if (questions.length === 0) {
        return <div>Loading quiz...</div>;
    }

    if (quizCompleted) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4 text-indigo-600">Quiz Completed!</h2>
                <p className="text-lg mb-4">Your score: {score} out of {questions.length}</p>
                <button
                    onClick={resetQuiz}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Retake Quiz
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Quiz</h2>
            <p className="mb-4">{questions[currentQuestion].question}</p>
            <div className="space-y-2 mb-4">
                {questions[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        className={`w-full text-left px-4 py-2 rounded-md ${
                            selectedAnswer === index
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {!showExplanation && (
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    disabled={selectedAnswer === null}
                >
                    Submit Answer
                </button>
            )}
            {showExplanation && (
                <div className="mb-4">
                    <div className={`p-4 rounded-md mb-2 ${
                        selectedAnswer === questions[currentQuestion].correctAnswer
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                            <CheckCircle className="inline mr-2" size={20} />
                        ) : (
                            <XCircle className="inline mr-2" size={20} />
                        )}
                        {selectedAnswer === questions[currentQuestion].correctAnswer
                            ? 'Correct!'
                            : 'Incorrect. The correct answer was: ' +
                            questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}
                    </div>
                    <div className="p-4 bg-blue-100 text-blue-800 rounded-md">
                        <HelpCircle className="inline mr-2" size={20} />
                        <strong>Explanation:</strong> {questions[currentQuestion].explanation}
                    </div>
                </div>
            )}
            {showExplanation && (
                <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            )}
        </div>
    );
};

export default Quiz;