import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

declare global {
    interface Window {
        Sk: any;
    }
}

const CodeEditor: React.FC = () => {
    const [code, setCode] = useState<string>(`print("Hello, World!")`);
    const [output, setOutput] = useState<string>('');
    const [skulptReady, setSkulptReady] = useState<boolean>(false);

    useEffect(() => {
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

    const runCode = () => {
        if (!skulptReady) {
            setOutput('Skulpt is still loading...');
            return;
        }
        setOutput('');

        const outf = (text: string) => {
            setOutput(prevOutput => prevOutput + text);
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
                await window.Sk.importMainWithBody('<stdin>', false, code, true);
            } catch (err: any) {
                setOutput(err.toString());
            }
        })();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Python Code Editor</h2>
            <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm bg-gray-800 text-white rounded-md mb-4"
            />
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={runCode}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    <Play size={20} />
                    <span>Run Code</span>
                </button>
                <span className="text-gray-600">Language: Python</span>
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
