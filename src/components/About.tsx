import React from 'react';
import { BookOpen, Code, Users } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="container mx-auto px-4 flex items-center justify-center">
                <h1 className="text-3xl font-bold mb-6 text-indigo-600">About CS Introz</h1>
            </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="mb-4">
                            CS Introz is an innovative online platform designed to help beginners master loops and
                            conditional statements through interactive learning experiences. Our mission is to make
                            looping and conditionals accessible, engaging, and fun for everyone.
                        </p>
                        <p className="mb-4">
                            Founded in 2024 by a team of passionate developers and fellow students, CS Introz aims to
                            bridge the gap between traditional coding tutorials and hands-on practice. We believe the
                            best way to learn programming is by doing, which is why our platform focuses on interactive
                            exercises and real-time feedback.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <BookOpen size={24} className="text-indigo-600 mr-4 mt-1"/>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Learn at Your Own Pace</h2>
                                <p>Our self-paced modules allow you to learn comfortably, whether you're a complete
                                    beginner or looking to refresh your skills.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Code size={24} className="text-indigo-600 mr-4 mt-1"/>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Interactive Coding Environment</h2>
                                <p>Practice what you learn immediately with our built-in code editor and see the results
                                    in real-time.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Users size={24} className="text-indigo-600 mr-4 mt-1"/>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Supportive Community</h2>
                                <p>Join a community of learners, share your progress, and get help when you need it.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
            };

            export default About;