import React from "react";
import Logo from "../../assets/logo.png"; 

const Footer = () => {
  return (
    <footer className="bg-darkGrey text-white py-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className="h-12" />
          <span className="text-2xl font-bold">Our Training Platform</span>
        </div>

        {/* About Us Section */}
        <div className="flex flex-col items-start">
          <h4 className="text-lg font-semibold mb-2">About Us</h4>
          <p className="text-sm max-w-xs">
            We are dedicated to providing high-quality online training programs to help you develop your skills and advance your career.
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-end">
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="text-sm">Email: info@trainingplatform.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm mt-5">
        &copy; {new Date().getFullYear()} Our Training Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
