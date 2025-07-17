import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Filter states
  const [searchName, setSearchName] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/allbooks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(res.data.data);
        setFilteredBooks(res.data.data); // set initial filtered data
      } catch (err) {
        console.error("API error:", err);
        setError("Unauthorized or failed to load books.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [navigate]);

  useEffect(() => {
    const filtered = books.filter((book) => {
      const matchesName = book.bookName
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesAuthor = book.bookAuthor
        .toLowerCase()
        .includes(searchAuthor.toLowerCase());
      const matchesMin = minPrice === "" || book.bookPrice >= Number(minPrice);
      const matchesMax = maxPrice === "" || book.bookPrice <= Number(maxPrice);

      return matchesName && matchesAuthor && matchesMin && matchesMax;
    });

    setFilteredBooks(filtered);
  }, [searchName, searchAuthor, minPrice, maxPrice, books]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/deletebooks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Book deleted successfully!");
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete book.");
    }
  };

  const handleEdit = (bookId) => {
    navigate(`/edit/${bookId}`);
  };

  if (loading) {
    return (
      <p className="text-center mt-12 text-lg font-medium text-gray-700">
        🔐 Verifying token...
      </p>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📚 Book Dashboard</h2>
        <button
          onClick={() => navigate('/addbook')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          ➕ Add Book
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Book Name"
          className="px-3 py-2 border rounded-md"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Author"
          className="px-3 py-2 border rounded-md"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="px-3 py-2 border rounded-md"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="px-3 py-2 border rounded-md"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

      {filteredBooks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border">Image</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border">Author</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border">Price</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border">Edit</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredBooks.map((book) => (
                <tr key={book._id}>
                  <td className="px-4 py-3 border">
                    <img
                      src={`http://localhost:8080${book.bookImage}`}
                      alt="book"
                      className="w-16 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-3 border">{book.bookName}</td>
                  <td className="px-4 py-3 border">{book.bookAuthor}</td>
                  <td className="px-4 py-3 border">₹{book.bookPrice}</td>
                  <td className="px-4 py-3 border">
                    <button
                      onClick={() => handleEdit(book._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-3 border">
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-6">No books available.</p>
      )}
    </div>
  );
};

export default Dashboard;
