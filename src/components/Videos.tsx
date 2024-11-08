import React from 'react';

const Videos: React.FC = () => {
    const videoData = [
        {
            embedUrl: 'https://www.youtube.com/embed/wxds6MAtUQ0',
            title: 'Intro to Programming: Loops',
            isEmbeddable: true
        },
        {
            watchUrl: 'https://www.youtube.com/watch?v=9OkxP-HJ69Q',
            title: 'What Is A Conditional Statement?',
            isEmbeddable: false
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-indigo-600 text-center">Videos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {videoData.map((video, index) => (
                    <div key={index} className="w-full h-auto">
                        {video.isEmbeddable ? (
                            <iframe
                                src={video.embedUrl}
                                title={video.title}
                                className="w-full h-80 border-none rounded-lg shadow-lg"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="flex items-center justify-center w-full h-80 bg-gray-100 rounded-lg shadow-lg">
                                <a
                                    href={video.watchUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline text-lg text-center"
                                >
                                    Watch "{video.title}" on YouTube
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Videos;
