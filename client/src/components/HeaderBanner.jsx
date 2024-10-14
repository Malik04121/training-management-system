// HeaderBanner.jsx
import React from 'react';

const HeaderBanner = () => {
  return (
    <div className="relative bg-black min-h-screen flex items-center">
      {/* Background image */}
      <img
        src="path/to/your/image.jpg" 
        alt="Banner background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay for the diagonal shape */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center px-4 lg:px-8">
        {/* Text Section */}
        <div className="lg:w-1/2 text-white">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Bring your <span className="italic text-pink-400">goals</span> into
            <span className="italic text-pink-400"> focus</span>
          </h1>
          <p className="text-lg lg:text-xl mb-8">
            edX offers online courses and programs that prepare you for every career moment
          </p>

          {/* Search Bar */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search our 4000+ courses"
              className="px-4 py-2 w-full max-w-md rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button className="bg-orange-600 text-white px-6 py-2 rounded shadow-lg hover:bg-orange-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 hidden lg:block">
          <img
            src="path/to/person-image.jpg" 
            alt="Person"
            className="w-full h-auto object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderBanner;