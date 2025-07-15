import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, mobile, address } = formData;

    if (!name || !email || !password || !mobile || !address) {
      return setMessage("All fields are required.");
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8080/api/register", formData);
      navigation('/login');
      setMessage("✅ Registration successful!");
      setFormData({ name: "", email: "", password: "", mobile: "", address: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-red-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

        {message && (
          <div className="text-center text-sm text-red-600 font-medium">{message}</div>
        )}

        {["name", "email", "password", "mobile", "address"].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 font-medium mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
