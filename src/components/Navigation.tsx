import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GitBranch, ClipboardList, Monitor, User, Mail } from 'lucide-react';

interface NavigationProps {
    activeModule: 'loops' | 'conditionals';
    setActiveModule: (module: 'loops' | 'conditionals') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeModule, setActiveModule }) => {
    const location = useLocation();

    return (
        <nav className="sticky top-12 z-50 flex justify-center space-x-4 py-4">
            {/* Notes Tab */}
            <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    location.pathname === '/'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
            >
                <GitBranch size={20} />
                <span>Notes</span>
            </Link>

            {/* Loops and Conditionals */}
            <button
                className={`px-4 py-2 rounded-md ${
                    activeModule === 'loops'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
                onClick={() => setActiveModule('loops')}
            >
                Loops
            </button>
            <button
                className={`px-4 py-2 rounded-md ${
                    activeModule === 'conditionals'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
                onClick={() => setActiveModule('conditionals')}
            >
                Conditionals
            </button>

            {/* Exercises Tab */}
            <Link
                to="/exercises"
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    location.pathname === '/exercises'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
            >
                <ClipboardList size={20} />
                <span>Exercises</span>
            </Link>

            {/* Videos Tab */}
            <Link
                to="/videos"
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    location.pathname === '/videos'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
            >
                <Monitor size={20} />
                <span>Videos</span>
            </Link>

            {/* About Tab */}
            <Link
                to="/about"
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    location.pathname === '/about'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
            >
                <User size={20} />
                <span>About</span>
            </Link>

            {/* Contact Tab */}
            <Link
                to="/contact"
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    location.pathname === '/contact'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
            >
                <Mail size={20} />
                <span>Contact</span>
            </Link>
        </nav>
    );
};

export default Navigation;
