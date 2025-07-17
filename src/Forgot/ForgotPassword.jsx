import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // Step 1: send OTP, Step 2: reset password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');

  const sendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/send-otp', { email });
      setMsg("✅ OTP sent to your email.");
      setStep(2);
    } catch (error) {
      setMsg("❌ Error sending OTP. Please try again.");
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMsg("❌ Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/reset-password', {
        email,
        otp,
        newPassword
      });

      if (res.data.msg.includes("successful")) {
        setMsg("✅ Password reset successful. Please login.");
        setStep(1);
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMsg("❌ " + res.data.msg);
      }
    } catch (error) {
      setMsg("❌ Invalid OTP or failed to reset password.");
    }
  };

 return (
  <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 transition-colors duration-300">
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        Forgot Password
      </h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your registered email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            onClick={sendOtp}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md"
          >
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-300"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-300"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-300"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            onClick={resetPassword}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md"
          >
            Reset Password
          </button>
        </>
      )}

      {msg && <p className="text-center text-sm text-gray-700 dark:text-gray-300">{msg}</p>}
    </div>
  </div>
);

}
