import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface CodeEditorProps {
    language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language }) => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    useEffect(() => {
        // Sets the initial code based on the selected language
        const initialCode = getInitialCode(language);
        setCode(initialCode);
    }, [language]);

    const getInitialCode = (lang: string) => {
        switch (lang) {
            case 'javascript':
                return 'function greet(name) {\n  console.log("Hello, " + name + "!");\n}\n\ngreet("World");';
            case 'python':
                return 'def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("World")';
            case 'cpp':
                return '#include <iostream>\n\nvoid greet(std::string name) {\n    std::cout << "Hello, " << name << "!" << std::endl;\n}\n\nint main() {\n    greet("World");\n    return 0;\n}';
            default:
                return '// Start coding here';
        }
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(e.target.value);
    };

    const runCode = () => {
        // We could send the code to a backend for execution
        // I just simulate output
        setOutput(`Running ${language} code...\n${code}\n\nOutput:\nHello, World!`);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Code Editor</h2>
            <textarea
                value={code}
                onChange={handleCodeChange}
                className="w-full h-64 p-4 font-mono text-sm bg-gray-800 text-white rounded-md mb-4"
            />
            <div className="flex justify-between items-center">
                <button
                    onClick={runCode}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    <Play size={20} />
                    <span>Run Code</span>
                </button>
                <span className="text-gray-600">Language: {language}</span>
            </div>
            {output && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Output:</h3>
                    <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">{output}</pre>
                </div>
            )}
        </div>
    );
};

export default CodeEditor;