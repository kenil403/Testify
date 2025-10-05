import React from 'react';
import { ChevronLeftIcon } from '../components/icons/Icons';

const ContactUsPage = ({ navigate }) => (
    <div className="container mx-auto max-w-4xl">
        <button type="button" onClick={() => navigate('home')} className="p-2 rounded-full hover:bg-slate-200 transition-colors mb-8">
            <ChevronLeftIcon />
        </button>
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us & Feedback</h1>
        <div className="bg-white p-10 rounded-lg shadow-lg">
            <form>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                        <input type="text" id="name" className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-green-500" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Your Email</label>
                        <input type="email" id="email" className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-green-500" />
                    </div>
                </div>
                <div className="mb-6">
                     <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Feedback / Message</label>
                     <textarea id="message" rows="5" className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-green-500"></textarea>
                </div>
                <div className="text-left">
                    <button type="submit" className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                        Submit Feedback
                    </button>
                </div>
            </form>
        </div>
    </div>
);

export default ContactUsPage;
