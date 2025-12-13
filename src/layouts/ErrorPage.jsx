import React from 'react';
import Error from '../assets/animated/error';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center  mt-6 text-center ">
            
            <Error></Error>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <div className="mt-6">
        <a
          href="/"
          className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow hover:bg-black transition inline-block"
        >
          ← Back to Home
        </a>
      </div>
        </div>
    );
};

export default ErrorPage;