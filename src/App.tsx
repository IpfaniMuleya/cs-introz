import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import LearningModule from './components/LearningModule';
import CodeEditor from './components/CodeEditor';
import Challenges from './components/Challenges';
import Quiz from './components/Quiz';
import ProgressTracker from './components/ProgressTracker';
import LanguageSelector from './components/LanguageSelector';
import About from './components/About';
import Contact from './components/Contact';

const App: React.FC = () => {
    const [activeModule, setActiveModule] = useState<'loops' | 'conditionals'>('loops');
    const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');

    const Home = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
                <LearningModule module={activeModule} language={selectedLanguage} />
                <CodeEditor language={selectedLanguage} />
                <Challenges module={activeModule} language={selectedLanguage} />
                <Quiz module={activeModule} language={selectedLanguage} />
            </div>
            <div className="space-y-8">
                <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                />
                <ProgressTracker />
            </div>
        </div>
    );

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;