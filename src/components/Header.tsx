import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-indigo-600 text-white py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold">
                        &lt;CS Introz&gt;
                    </h1>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="hover:text-indigo-200">Home</Link></li>
                        <li><Link to="/about" className="hover:text-indigo-200">About</Link></li>
                        <li><Link to="/contact" className="hover:text-indigo-200">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;