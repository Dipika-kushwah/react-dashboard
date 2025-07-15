import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigation = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const res = await axios.post('http://localhost:8080/api/login', {
        email,
        password
      });

      if (res?.data?.data?.token) {
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        setMsg("✅ Login successful!");
        navigation('/dashboard');
      } else {
        navigation('/login');
        setMsg("❌ " + res.data.msg);
      }
    } catch (error) {
      setMsg("❌ Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-yellow-100 to-red-200 flex flex-col items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Login
        </button>

        {msg && (
          <p className="text-center text-sm text-gray-700">{msg}</p>
        )}

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/" className="text-red-500 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
