'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <>
      {showNotification && (
        <div className="fixed top-4 right-4 bg-purple-300 border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 animate-bounce">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📧</span>
            <span className="font-bold">MESSAGE SENT!</span>
          </div>
          <p className="mt-2">Thanks for reaching out! ✨</p>
        </div>
      )}

      <div className="bg-white border-2 border-black p-6 space-y-4">
        <div>
          <label className="font-bold block mb-2">YOUR NAME</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="John Doe"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Mail size={20} />
            <label className="font-bold">YOUR EMAIL</label>
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="font-bold block mb-2">MESSAGE</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 h-32 resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-300 border-2 border-black px-6 py-3 font-bold hover:bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors"
        >
          SUBMIT ✨
        </button>
      </div>
    </>
  );
};

export default ContactForm;