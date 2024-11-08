import React from 'react';
import LearningModule from './LearningModule';

interface NotesProps {
    activeModule: 'loops' | 'conditionals';
}

const Notes: React.FC<NotesProps> = ({ activeModule }) => {
    const notesContent = {
        loops: {
            title: "Loops",
            description:
                "Loops are programming constructs that allow you to repeat a block of code multiple times. They are used to automate repetitive tasks.",
            items: [
                {
                    name: "For Loop",
                    description: "Executes a block of code for a specific number of iterations.",
                },
                {
                    name: "While Loop",
                    description: "Continues execution as long as a condition is true.",
                },
            ],
        },
        conditionals: {
            title: "Conditionals",
            description:
                "Conditional statements allow your program to make decisions based on conditions.",
            items: [
                {
                    name: "If Statements",
                    description: "Executes a block of code if a condition is true.",
                },
                {
                    name: "Else Statements",
                    description: "Executes a block of code if a condition is false.",
                },
                {
                    name: "Elif Statements",
                    description:
                        "Allows checking multiple conditions in sequence.",
                },
            ],
        },
    };

    const currentContent = notesContent[activeModule];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Quick Notes Section */}
            <div className="mb-12 flex justify-center">
                <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-indigo-600 mb-4 text-center">
                        Quick Notes
                    </h2>
                    {/* Learning Module */}
                    <LearningModule module={activeModule} />
                </div>
            </div>

            {/* Notes Section */}
            <div className="w-full max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-indigo-600 mb-4">
                    {currentContent.title}
                </h1>
                <p className="mb-4">{currentContent.description}</p>
                <ul className="list-disc pl-6">
                    {currentContent.items.map((item, index) => (
                        <li key={index} className="mb-2">
                            <strong>{item.name}:</strong> {item.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Notes;
