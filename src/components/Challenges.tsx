import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

declare global {
    interface Window {
        Sk: any;
    }
}

interface ChallengesProps {
    module: 'loops' | 'conditionals';
}

interface Challenge {
    question: string;
    code: string;
    expectedOutput: string;
    hint: string;
    answer: string;
}

const Challenges: React.FC<ChallengesProps> = ({ module }) => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [userCode, setUserCode] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [skulptReady, setSkulptReady] = useState<boolean>(false);
    const [output, setOutput] = useState<string>('');
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        // Load Skulpt for Python code execution
        const loadSkulpt = () => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js';
            script.async = true;
            script.onload = () => {
                const scriptStdlib = document.createElement('script');
                scriptStdlib.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js';
                scriptStdlib.async = true;
                scriptStdlib.onload = () => {
                    setSkulptReady(true);
                };
                document.body.appendChild(scriptStdlib);
            };
            document.body.appendChild(script);
        };

        loadSkulpt();
    }, []);

    useEffect(() => {
        // Define challenges based on the selected module
        const loopsChallenges: Challenge[] = [
            {
                question: 'Write a loop that prints numbers from 1 to 5.',
                code: '# Your code here',
                expectedOutput: '1\n2\n3\n4\n5\n',
                hint: "Use a 'for' loop with the 'range' function starting at 1 and ending at 6.",
                answer: `for i in range(1, 6):
    print(i)`
            },
            {
                question: 'Create a loop that prints even numbers from 2 to 10.',
                code: '# Your code here',
                expectedOutput: '2\n4\n6\n8\n10\n',
                hint: "Use a 'for' loop with 'range(2, 11, 2)'.",
                answer: `for i in range(2, 11, 2):
    print(i)`
            }
        ];

        const conditionalsChallenges: Challenge[] = [
            {
                question: 'Write a function that checks if a number is positive, negative, or zero.',
                code: `def check_number(num):
    # Your code here

check_number(5)
check_number(-3)
check_number(0)`,
                expectedOutput: 'Positive\nNegative\nZero\n',
                hint: "Use 'if', 'elif', and 'else' statements inside the function.",
                answer: `def check_number(num):
    if num > 0:
        print("Positive")
    elif num < 0:
        print("Negative")
    else:
        print("Zero")

check_number(5)
check_number(-3)
check_number(0)`
            },
            {
                question: 'Create a program that asks for a grade and prints "Pass" if the grade is 50 or more, otherwise "Fail".',
                code: `grade = int(input("Enter your grade: "))
# Your code here`,
                expectedOutput: 'Pass\nFail\n',
                hint: "Use an 'if' statement to compare the grade to 50.",
                answer: `grades = [70, 40]  # Simulated inputs

for grade in grades:
    if grade >= 50:
        print("Pass")
    else:
        print("Fail")`
            }
        ];

        const selectedChallenges = module === 'loops' ? loopsChallenges : conditionalsChallenges;
        setChallenges(selectedChallenges);
        setCurrentChallenge(0);
        setUserCode(selectedChallenges[0].code);
        setFeedback('');
        setShowHint(false);
        setOutput('');
        setShowAnswer(false);
    }, [module]);

    const runCode = () => {
        if (!skulptReady) {
            setFeedback('Skulpt is still loading...');
            return;
        }

        setFeedback('');
        setOutput('');

        const currentChallengeObj = challenges[currentChallenge];

        let outputText = ''; // Local variable to collect output

        const outf = (text: string) => {
            outputText += text;
        };

        const builtinRead = (x: string) => {
            if (
                window.Sk.builtinFiles === undefined ||
                window.Sk.builtinFiles['files'][x] === undefined
            ) {
                throw `File not found: '${x}'`;
            }
            return window.Sk.builtinFiles['files'][x];
        };

        window.Sk.configure({ output: outf, read: builtinRead });

        (async () => {
            try {
                // Handle input if necessary
                if (currentChallengeObj.question.includes('input')) {
                    const inputs = ['70', '40']; // Simulated inputs
                    let inputIndex = 0;
                    window.Sk.configure({
                        output: outf,
                        read: builtinRead,
                        inputfun: () => {
                            return inputs[inputIndex++];
                        },
                    });
                }

                await window.Sk.importMainWithBody('<stdin>', false, userCode, true);
                setOutput(outputText); // Update the state with the collected output

                // Compare the output using the local variable
                if (outputText.trim() === currentChallengeObj.expectedOutput.trim()) {
                    setFeedback('Correct! Well done!');
                } else {
                    setFeedback('Not quite right. Try again or check the hint.');
                }
            } catch (err: any) {
                setFeedback(`Error: ${err.toString()}`);
            }
        })();
    };

    const nextChallenge = () => {
        if (currentChallenge < challenges.length - 1) {
            const nextChallengeObj = challenges[currentChallenge + 1];
            setCurrentChallenge(currentChallenge + 1);
            setUserCode(nextChallengeObj.code);
            setFeedback('');
            setShowHint(false);
            setOutput('');
            setShowAnswer(false);
        }
    };

    const toggleHint = () => {
        setShowHint(!showHint);
    };

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    if (challenges.length === 0) {
        return <div>Loading challenges...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Coding Challenge</h2>
            <p className="mb-4">{challenges[currentChallenge].question}</p>
            <AceEditor
                mode="python"
                theme="github"
                name="code-editor"
                onChange={setUserCode}
                value={userCode}
                editorProps={{ $blockScrolling: true }}
                width="100%"
                height="200px"
                fontSize={14}
                setOptions={{
                    useWorker: false,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
            />
            <div className="flex justify-between items-center mb-4 mt-4">
                <button
                    onClick={runCode}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Run Code
                </button>
                <div className="flex space-x-2">
                    <button
                        onClick={toggleHint}
                        className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                        <HelpCircle size={20} />
                        <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                    </button>
                    <button
                        onClick={toggleAnswer}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        <CheckCircle size={20} />
                        <span>{showAnswer ? 'Hide Answer' : 'Show Answer'}</span>
                    </button>
                </div>
            </div>
            {feedback && (
                <div
                    className={`p-4 rounded-md mb-4 ${
                        feedback.includes('Correct')
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                >
                    {feedback.includes('Correct') ? (
                        <CheckCircle className="inline mr-2" size={20} />
                    ) : (
                        <XCircle className="inline mr-2" size={20} />
                    )}
                    {feedback}
                </div>
            )}
            {output && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Output:</h3>
                    <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">{output}</pre>
                </div>
            )}
            {showHint && (
                <div className="p-4 bg-blue-100 text-blue-800 rounded-md mb-4">
                    <strong>Hint:</strong> {challenges[currentChallenge].hint}
                </div>
            )}
            {showAnswer && (
                <div className="p-4 bg-gray-100 text-gray-800 rounded-md mb-4">
                    <strong>Answer:</strong>
                    <pre className="mt-2 whitespace-pre-wrap">{challenges[currentChallenge].answer}</pre>
                </div>
            )}
            {currentChallenge < challenges.length - 1 && feedback.includes('Correct') && (
                <button
                    onClick={nextChallenge}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Next Challenge
                </button>
            )}
        </div>
    );
};

export default Challenges;
