import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const book = res.data.data;
        setBookName(book.bookName);
        setBookAuthor(book.bookAuthor);
        setBookPrice(book.bookPrice);
        setPreview(`http://localhost:8080${book.bookImage}`);
      } catch (err) {
        console.error("Failed to fetch book:", err);
        setError("Failed to load book.");
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!bookName || !bookAuthor || !bookPrice) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("bookName", bookName);
    formData.append("bookAuthor", bookAuthor);
    formData.append("bookPrice", bookPrice);
    if (bookImage) {
      formData.append("bookImage", bookImage);
    }

    try {
      await axios.put(`http://localhost:8080/api/books/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Book updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update book.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg border border-gray-300 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Edit Book</h2>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Book Name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Author:</label>
          <input
            type="text"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price:</label>
          <input
            type="number"
            value={bookPrice}
            onChange={(e) => setBookPrice(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Image:</label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-auto mb-3 rounded shadow"
            />
          )}
          <input
            type="file"
            onChange={(e) => setBookImage(e.target.files[0])}
            accept="image/*"
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
