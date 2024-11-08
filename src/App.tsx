import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Notes from './components/Notes';
import Exercises from './components/Exercises';
import About from './components/About';
import Contact from './components/Contact';
import Videos from './components/Videos';

const App: React.FC = () => {
    const [activeModule, setActiveModule] = useState<'loops' | 'conditionals'>('loops');

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
                    <Routes>
                        {/* Notes Section */}
                        <Route
                            path="/"
                            element={<Notes activeModule={activeModule} />}
                        />

                        {/* Exercises Section */}
                        <Route
                            path="/exercises"
                            element={<Exercises activeModule={activeModule} />}
                        />

                        {/* Other Sections */}
                        <Route path="/videos" element={<Videos />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
