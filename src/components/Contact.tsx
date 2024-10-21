import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock-up logic to send the form data to a server
        console.log('Form submitted:', { name, email, message });
        // Resets form fields
        setName('');
        setEmail('');
        setMessage('');
        alert('Thank you for your message! We will get back to you soon.');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-indigo-600">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <p className="mb-4">
                        We'd love to hear from you! Whether you have questions about our courses, need technical support, or simply want to share your feedback, our team is here to assist.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Mail size={20} className="text-indigo-600 mr-2" />
                            <span>support@csintroz.com</span>
                        </div>
                        <div className="flex items-center">
                            <MessageSquare size={20} className="text-indigo-600 mr-2" />
                            <span>Live chat available Mon-Fri, 9am-5pm SAST</span>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-1">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Send size={20} className="mr-2" />
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;