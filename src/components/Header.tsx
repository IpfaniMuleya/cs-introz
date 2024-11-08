import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-indigo-600 text-white py-4 sticky top-0 z-50">
            <div className="container mx-auto px-4 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold">
                        &lt;CS Introz&gt;
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
