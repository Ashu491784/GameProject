import { database, ref, onValue, set, remove } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ItemName: "",
    price: "",
    rate: "",
    downloading: "",
  });

  // 🔹 Load Items from Firebase (Realtime listener)
  useEffect(() => {
    const itemsRef = ref(database, "Items");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedItems = Object.values(data);
        setItems(loadedItems);
      } else {
        setItems([]);
      }
      setLoading(false);
    });
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submit (Add Item)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.ItemName) {
        setError("Item name is required!");
        setLoading(false);
        return;
      }
      const itemRef = ref(database, `Items/${formData.ItemName}`);
      set(itemRef, formData);

      setFormData({
        ItemName: "",
        price: "",
        rate: "",
        downloading: "",
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // 🔹 Delete Item
  const handleDelete = (itemName) => {
    const itemRef = ref(database, `Items/${itemName}`);
    remove(itemRef);
  };

  return (
    <div className="mt-6 p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-200 dark:text-white">
          Item Management
        </h1>
        <div className="flex gap-3">
          <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
            Home
          </button>
        </div>
      </div>

      {/* 🔹 Add Item Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
      >
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="ItemName"
            placeholder="Item Name"
            value={formData.ItemName}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
          />
          <input
            type="text"
            name="rate"
            placeholder="Rate"
            value={formData.rate}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
          />
          <input
            type="text"
            name="downloading"
            placeholder="Downloading"
            value={formData.downloading}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Add Item"}
        </button>
      </form>

      {/* 🔹 Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Downloading
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index} className="border-b dark:border-gray-600">
                  <td className="px-6 py-4">{item.ItemName}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">{item.rate}</td>
                  <td className="px-6 py-4">{item.downloading}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(item.ItemName)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-300"
                >
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemPage;
