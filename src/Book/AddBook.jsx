import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔐 Token check on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to access this page.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookName || !bookAuthor || !bookPrice || !bookImage) {
      setError("All fields are required.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("bookName", bookName);
    formData.append("bookAuthor", bookAuthor);
    formData.append("bookPrice", bookPrice);
    formData.append("bookImage", bookImage);

    try {
      const res = await axios.post("http://localhost:8080/api/createBook", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        alert("✅ Book added successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Add book error:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Add New Book</h2>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Book Name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Author:</label>
          <input
            type="text"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price:</label>
          <input
            type="number"
            value={bookPrice}
            onChange={(e) => setBookPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Image:</label>
          <input
            type="file"
            onChange={(e) => setBookImage(e.target.files[0])}
            accept="image/*"
            className="w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
