'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [insult, setInsult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Please enter a message first!');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setInsult('');
    
    try {
      const response = await fetch('/api/insult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message.trim() }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate insult');
      }
      
      setInsult(data.insult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewInsult = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/insult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message.trim() }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate insult');
      }
      
      setInsult(data.insult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">
              🔥 Insult Generator 🔥
            </h1>
            <p className="text-xl text-gray-300">
              Enter your message and get a witty comeback!
            </p>
            <p className="text-sm text-gray-400 mt-2">
              (Family-friendly roasts only)
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-white mb-3">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Type anything here... if you dare!"
                  rows={4}
                  maxLength={500}
                />
                <div className="text-right text-sm text-gray-400 mt-1">
                  {message.length}/500
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Insult...
                  </span>
                ) : (
                  'Get Roasted! 🔥'
                )}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                <p className="text-red-200 text-center">{error}</p>
              </div>
            )}

            {/* Insult Display */}
            {insult && (
              <div className="mt-8 space-y-4">
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <span className="text-2xl mr-2">💀</span>
                    Your Roast:
                  </h3>
                  <p className="text-lg text-gray-100 leading-relaxed font-medium">
                    {insult}
                  </p>
                </div>
                
                <button
                  onClick={handleNewInsult}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100"
                >
                  {isLoading ? 'Generating...' : 'Give Me Another! 🔄'}
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Remember: It's all in good fun! 😄
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}