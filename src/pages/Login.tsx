import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-black p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <div className="inline-block w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
            <span className="text-black font-bold text-2xl">H</span>
          </div>
          <h1 className="text-3xl font-bold">Sign in to Hulk-Hub</h1>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-white text-black font-semibold py-2 px-4 rounded-full border border-gray-700 hover:bg-gray-200 transition-colors">
            Sign in with Google
          </button>
          <button className="w-full bg-white text-black font-semibold py-2 px-4 rounded-full border border-gray-700 hover:bg-gray-200 transition-colors">
            Sign in with Apple
          </button>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-4 text-gray-500">or</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Phone, email, or username"
              className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="w-full bg-white text-black font-bold py-3 px-4 rounded-full hover:bg-gray-200 transition-colors">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="#" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        <div className="mt-6 text-center text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;