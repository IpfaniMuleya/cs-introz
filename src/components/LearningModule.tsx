import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface LearningModuleProps {
    module: 'loops' | 'conditionals';
}

const LearningModule: React.FC<LearningModuleProps> = ({ module }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [content, setContent] = useState<string[]>([]);

    useEffect(() => {
        // Content for loops and conditionals
        const loopsContent = [
            "A loop is a programming construct that repeats a block of code multiple times.",
            "The 'for' loop is used when you know how many times you want to repeat a block of code.",
            "The 'while' loop is used when you want to repeat a block of code as long as a condition is true.",
            "Loops are essential for iterating over arrays, processing data, and automating repetitive tasks."
        ];

        const conditionalsContent = [
            "Conditional statements allow your program to make decisions based on certain conditions.",
            "The 'if' statement executes a block of code if a specified condition is true.",
            "The 'else' statement provides an alternative block of code to execute when the 'if' condition is false.",
            "The 'switch' statement is used to select one of many code blocks to be executed."
        ];

        // Content based on the current module
        setContent(module === 'loops' ? loopsContent : conditionalsContent);
        setCurrentStep(0);
        setIsPlaying(false);
    }, [module]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentStep((prevStep) => (prevStep + 1) % content.length);
            }, 3000); // Automatically move to the next step every 3 seconds
        }
        return () => clearInterval(interval); // Cleanup interval on unmount or when autoplay stops
    }, [isPlaying, content]);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const goToPreviousStep = () => {
        setCurrentStep((prevStep) => (prevStep - 1 + content.length) % content.length);
    };
    const goToNextStep = () => {
        setCurrentStep((prevStep) => (prevStep + 1) % content.length);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            {/* Heading */}
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
                {module === 'loops' ? 'Loops' : 'Conditionals'}
            </h2>

            {/* Content Display */}
            <div className="h-40 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                <p className="text-lg text-center px-4">{content[currentStep]}</p>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
                <button
                    onClick={goToPreviousStep}
                    className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                    aria-label="Previous Step"
                >
                    <SkipBack size={24} />
                </button>
                <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                    onClick={goToNextStep}
                    className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                    aria-label="Next Step"
                >
                    <SkipForward size={24} />
                </button>
            </div>
        </div>
    );
};

export default LearningModule;
