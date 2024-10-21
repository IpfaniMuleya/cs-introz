import React from 'react';
import { Code } from 'lucide-react';

interface LanguageSelectorProps {
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
                                                               selectedLanguage,
                                                               setSelectedLanguage,
                                                           }) => {
    const languages = ['javascript', 'python', 'cpp'];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600 flex items-center">
                <Code className="mr-2" size={24} />
                Language
            </h2>
            <div className="flex flex-col space-y-2">
                {languages.map((lang) => (
                    <button
                        key={lang}
                        className={`px-4 py-2 rounded-md ${
                            selectedLanguage === lang
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                        onClick={() => setSelectedLanguage(lang)}
                    >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelector;