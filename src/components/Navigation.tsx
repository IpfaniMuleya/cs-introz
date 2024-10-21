import React from 'react';
import { BookOpen, GitBranch } from 'lucide-react';

interface NavigationProps {
    activeModule: 'loops' | 'conditionals';
    setActiveModule: (module: 'loops' | 'conditionals') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeModule, setActiveModule }) => {
    return (
        <nav className="flex space-x-4 mb-8">
            <button
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    activeModule === 'loops'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
                onClick={() => setActiveModule('loops')}
            >
                <GitBranch size={20} />
                <span>Loops</span>
            </button>
            <button
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    activeModule === 'conditionals'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
                onClick={() => setActiveModule('conditionals')}
            >
                <BookOpen size={20} />
                <span>Conditionals</span>
            </button>
        </nav>
    );
};

export default Navigation;