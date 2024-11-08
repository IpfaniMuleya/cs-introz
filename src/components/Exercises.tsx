import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import Challenges from './Challenges';
import Quiz from './Quiz';

const Exercises: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'loops' | 'conditionals'>('loops');

    // W3 Python exercises
    const exercises = {
        loops: {
            for: 'https://www.w3schools.com/python/exercise.asp?x=xrcise_for_loops1',
            while: 'https://www.w3schools.com/python/exercise.asp?x=xrcise_while_loops1',
        },
        conditionals: {
            ifElse: 'https://www.w3schools.com/python/exercise.asp?x=xrcise_conditions1',
        },
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Python Exercises</h1>
            <p className="mb-6 text-center">Choose a section and explore specific Python exercises.</p>

            {/* Main Navigation: Loops and Conditionals */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setActiveSection('loops')}
                    className={`px-4 py-2 rounded-md transition ${
                        activeSection === 'loops'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-indigo-600 hover:bg-indigo-100'
                    }`}
                >
                    Loops
                </button>
                <button
                    onClick={() => setActiveSection('conditionals')}
                    className={`px-4 py-2 rounded-md transition ${
                        activeSection === 'conditionals'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-indigo-600 hover:bg-indigo-100'
                    }`}
                >
                    Conditionals
                </button>
            </div>

            {/* Centered Exercises */}
            <div className="flex justify-center items-center flex-wrap gap-6 mb-8">
                {activeSection === 'loops' && (
                    <>
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500 mb-2">For Loop</h2>
                            <a
                                href={exercises.loops.for}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Open For Loop Exercise
                            </a>
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500 mb-2">While Loop</h2>
                            <a
                                href={exercises.loops.while}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Open While Loop Exercise
                            </a>
                        </div>
                    </>
                )}
                {activeSection === 'conditionals' && (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-indigo-500 mb-2">If-Else</h2>
                        <a
                            href={exercises.conditionals.ifElse}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Open If-Else Exercise
                        </a>
                    </div>
                )}
            </div>

            {/* Inline Layout for Code Editor, Challenges, and Quiz */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Code Editor */}
                <div>
                    <h2 className="text-lg font-semibold text-indigo-500 mb-2 text-center">Code Editor</h2>
                    <div>
                        <CodeEditor language="python" />
                    </div>
                </div>

                {/* Challenges */}
                <div>
                    <h2 className="text-lg font-semibold text-indigo-500 mb-2 text-center">Challenges</h2>
                    <div>
                        <Challenges module={activeSection} language="python" />
                    </div>
                </div>

                {/* Quiz */}
                <div>
                    <h2 className="text-lg font-semibold text-indigo-500 mb-2 text-center">Quiz</h2>
                    <div>
                        <Quiz module={activeSection} language="python" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exercises;
