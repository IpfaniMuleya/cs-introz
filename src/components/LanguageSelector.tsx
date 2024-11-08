import React from 'react';
import { Code } from 'lucide-react';

const LanguageSelector: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600 flex items-center">
                <Code className="mr-2" size={24} />
                Language
            </h2>
            <div className="flex flex-col space-y-2">
                <button
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white cursor-default"
                    disabled
                >
                    Python
                </button>
            </div>
        </div>
    );
};

export default LanguageSelector;
