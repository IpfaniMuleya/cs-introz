import React, { useState, useEffect } from 'react';
import { Award, Star } from 'lucide-react';

const ProgressTracker: React.FC = () => {
    const [level, setLevel] = useState(1);
    const [experience, setExperience] = useState(0);
    const [achievements, setAchievements] = useState<string[]>([]);

    const EXP_THRESHOLD = 100;
    const ACHIEVEMENTS = [
        { level: 2, name: 'Loop Novice' },
        { level: 3, name: 'Conditional Master' },
    ];

    // Simulating progress updates every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setExperience((prev) => {
                const newExp = prev + 10;
                if (newExp >= EXP_THRESHOLD) {
                    setLevel((prevLevel) => prevLevel + 1);
                    return 0;
                }
                return newExp;
            });
        }, 30000);

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);

    // Update achievements when level changes
    useEffect(() => {
        const unlockedAchievements = ACHIEVEMENTS.filter(
            (achievement) => level >= achievement.level && !achievements.includes(achievement.name)
        ).map((achievement) => achievement.name);

        if (unlockedAchievements.length > 0) {
            setAchievements((prev) => [...prev, ...unlockedAchievements]);
        }
    }, [level, achievements]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600 flex items-center">
                <Award className="mr-2" size={24} />
                Progress Tracker
            </h2>
            <div className="mb-4">
                <p className="text-lg font-semibold">Level: {level}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                    <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${(experience / EXP_THRESHOLD) * 100}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Experience: {experience}/{EXP_THRESHOLD}</p>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                {achievements.length > 0 ? (
                    <ul className="space-y-2">
                        {achievements.map((achievement, index) => (
                            <li key={index} className="flex items-center">
                                <Star className="mr-2 text-yellow-400" size={20} />
                                <span>{achievement}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No achievements unlocked yet. Keep learning!</p>
                )}
            </div>
        </div>
    );
};

export default ProgressTracker;
