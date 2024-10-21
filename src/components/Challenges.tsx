import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

interface ChallengesProps {
    module: 'loops' | 'conditionals';
    language: string;
}

interface Challenge {
    question: string;
    code: string;
    answer: string;
    hint: string;
}

const Challenges: React.FC<ChallengesProps> = ({ module, language }) => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        // Maybe we can create an api for the challenges
        const loopsChallenges = [
            {
                question: "Write a loop that prints numbers from 1 to 5.",
                code: "// Your code here",
                answer: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
                hint: "Use a 'for' loop with a counter variable starting at 1 and ending at 5."
            },
            {
                question: "Create a while loop that prints even numbers from 2 to 10.",
                code: "// Your code here",
                answer: "let num = 2;\nwhile (num <= 10) {\n  console.log(num);\n  num += 2;\n}",
                hint: "Initialize a variable with 2, use a while loop, and increment by 2 in each iteration."
            }
        ];

        const conditionalsChallenges = [
            {
                question: "Write an if-else statement that checks if a number is positive, negative, or zero.",
                code: "function checkNumber(num) {\n  // Your code here\n}",
                answer: "function checkNumber(num) {\n  if (num > 0) {\n    return 'Positive';\n  } else if (num < 0) {\n    return 'Negative';\n  } else {\n    return 'Zero';\n  }\n}",
                hint: "Use 'if' to check for positive, 'else if' for negative, and 'else' for zero."
            },
            {
                question: "Create a switch statement that returns the day of the week based on a number (1-7).",
                code: "function getDayOfWeek(day) {\n  // Your code here\n}",
                answer: "function getDayOfWeek(day) {\n  switch (day) {\n    case 1: return 'Monday';\n    case 2: return 'Tuesday';\n    case 3: return 'Wednesday';\n    case 4: return 'Thursday';\n    case 5: return 'Friday';\n    case 6: return 'Saturday';\n    case 7: return 'Sunday';\n    default: return 'Invalid day';\n  }\n}",
                hint: "Use a switch statement with cases for each day number, and a default case for invalid inputs."
            }
        ];

        setChallenges(module === 'loops' ? loopsChallenges : conditionalsChallenges);
        setCurrentChallenge(0);
        setUserAnswer('');
        setFeedback('');
        setShowHint(false);
    }, [module, language]);

    const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserAnswer(e.target.value);
    };

    const checkAnswer = () => {
        const currentChallengeObj = challenges[currentChallenge];
        if (userAnswer.trim() === currentChallengeObj.answer.trim()) {
            setFeedback('Correct! Well done!');
        } else {
            setFeedback('Not quite right. Try again or check the hint.');
        }
    };

    const nextChallenge = () => {
        if (currentChallenge < challenges.length - 1) {
            setCurrentChallenge(currentChallenge + 1);
            setUserAnswer('');
            setFeedback('');
            setShowHint(false);
        }
    };

    const toggleHint = () => {
        setShowHint(!showHint);
    };

    if (challenges.length === 0) {
        return <div>Loading challenges...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Coding Challenge</h2>
            <p className="mb-4">{challenges[currentChallenge].question}</p>
            <textarea
                value={userAnswer}
                onChange={handleAnswerChange}
                className="w-full h-48 p-4 font-mono text-sm bg-gray-800 text-white rounded-md mb-4"
                placeholder={challenges[currentChallenge].code}
            />
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={checkAnswer}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Submit Answer
                </button>
                <button
                    onClick={toggleHint}
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                    <HelpCircle size={20} />
                    <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                </button>
            </div>
            {feedback && (
                <div className={`p-4 rounded-md mb-4 ${feedback.includes('Correct') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {feedback.includes('Correct') ? <CheckCircle className="inline mr-2" size={20} /> : <XCircle className="inline mr-2" size={20} />}
                    {feedback}
                </div>
            )}
            {showHint && (
                <div className="p-4 bg-blue-100 text-blue-800 rounded-md mb-4">
                    <strong>Hint:</strong> {challenges[currentChallenge].hint}
                </div>
            )}
            {currentChallenge < challenges.length - 1 && (
                <button
                    onClick={nextChallenge}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                    Next Challenge
                </button>
            )}
        </div>
    );
};

export default Challenges;