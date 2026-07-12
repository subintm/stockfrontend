import React, { useState } from "react";

function AdminDashboard() {


  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [prouctList, setProductList] = useState([]);
  const [Store, setStores] = useState([]);
  const tocken = localStorage.getItem('token');
  const [form, setForm] = useState({
    name: "",
    sku: "",
    location: "",
    product: "",
    fromStore: "",
    toStore: "",
    quantity: "",
  });

  const handleproductSubmit = (form) => {
    try {
      if (!form.name || !form.sku) {
        alert("Please fill all fields");
        return;
      }

      const result = await axios.post(`${API_URL}/api/product/addproduct`, form, {
        headers: {
          'Authorization': `Bearer ${tocken}`
        }
      })
      if (result.data.success) {
        alert(result.data.message);
      }
      setProductList(products);
    } catch (err) {
      console.log(err);
    }

  }

  const getProductList = () => {
    try {
      const result = await axios.get(`${API_URL}/api/product/getproduct`, {
        headers: {
          'Authorization': `Bearer ${tocken}`
        }
      })
      result.data.success ? alert(result.data.message) : alert(result.data.message);
      setProductList(products);
    } catch (err) {
      console.log(err);
    }


  }

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete Product?")) return;

    try {
      const result = await axios.delete(
        `${API_URL}/api/product/deleteproduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(result.data.message);

      if (result.data.success) {
        getProductList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async () => {
    try {
      const result = await axios.put(
        `${API_URL}/api/product/updateproduct/${selectedData._id}`,
        {
          name: form.name,
          sku: form.sku,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(result.data.message);

      if (result.data.success) {
        getProductList();
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStoreSubmit = async () => {
    try {
      const result = await axios.post(
        `${API_URL}/api/store/addstore`,
        {
          name: form.name,
          location: form.location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(result.data.message);

      if (result.data.success) {
        getStoreList();
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStore = async (id) => {
    if (!window.confirm("Delete Store?")) return;

    try {
      const result = await axios.delete(
        `${API_URL}/api/store/deletestore/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(result.data.message);

      if (result.data.success) {
        getStoreList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getStoreList = async () => {
    try {
      const result = await axios.get(
        `${API_URL}/api/store/getstores`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.success) {
        setStores(result.data.stores);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const transferStock = async () => {
    try {
      const result = await axios.post(
        `${API_URL}/api/stock/updateStocks`,
        {
          product: form.product,
          fromStore: form.fromStore,
          toStore: form.toStore,
          quantity: form.quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(result.data.message);

      if (result.data.success) {
        getStock();
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getStock = () => {
    try {
      const result = await axios.get(`${API_URL}/api/stock/getstock`, {
        headers: {
          'Authorization': `Bearer ${tocken}`
        }
      })
      result.data.success ? alert(result.data.message) : alert(result.data.message);
    } catch (err) {
      console.log(err);
    }

    setStockList(stock);
  }


  useEffect(() => {
    getProductList();
    getStoreList();
    getStockList();
  }, []);




  const openModal = (type, data = null) => {
    setModalType(type);
    setSelectedData(data);

    if (data) {
      setForm({
        name: data.name || "",
        sku: data.sku || "",
        location: data.location || "",
        product: data.product || "",
        fromStore: "",
        toStore: "",
        quantity: data.qty || "",
      });
    } else {
      setForm({
        name: "",
        sku: "",
        location: "",
        product: "",
        fromStore: "",
        toStore: "",
        quantity: "",
      });
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setSelectedData(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div className="actions">
        <button onClick={() => openModal("addProduct")}>
          Add Product
        </button>

        <button onClick={() => openModal("addStore")}>
          Create Store
        </button>

        <button onClick={() => openModal("adjustStock")}>
          Adjust Stock
        </button>

        <button onClick={() => openModal("transferStock")}>
          Transfer Stock
        </button>
      </div>

      <div className="card">
        <h2>Products</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th width="180">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.sku}</td>

                <td>
                  <button onClick={() => openModal("editProduct", item)}>
                    Edit
                  </button>

                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Stores</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th width="180">Action</th>
            </tr>
          </thead>

          <tbody>
            {stores.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>

                <td>{item.location}</td>

                <td>
                  <button onClick={() => openModal("editStore", item)}>
                    Edit
                  </button>

                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Current Stock</h2>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Store</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {stocks.map((item) => (
              <tr key={item.id}>
                <td>{item.product}</td>
                <td>{item.store}</td>
                <td>{item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

            <span className="close" onClick={closeModal}>
              ×
            </span>


            {(modalType === "addProduct" ||
              modalType === "editProduct") && (
                <>
                  <h2>
                    {modalType === "addProduct"
                      ? "Add Product"
                      : "Edit Product"}
                  </h2>

                  <input
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                  />

                  <input
                    name="sku"
                    placeholder="SKU"
                    value={form.sku}
                    onChange={handleChange}
                  />

                  <button>
                    {modalType === "addProduct"
                      ? "Save"
                      : "Update"}
                  </button>
                </>
              )}

            {/* Add/Edit Store */}

            {(modalType === "addStore" ||
              modalType === "editStore") && (
                <>
                  <h2>
                    {modalType === "addStore"
                      ? "Create Store"
                      : "Edit Store"}
                  </h2>

                  <input
                    name="name"
                    placeholder="Store Name"
                    value={form.name}
                    onChange={handleChange}
                  />

                  <input
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                  />

                  <button>
                    {modalType === "addStore"
                      ? "Save"
                      : "Update"}
                  </button>
                </>
              )}

            {/* Adjust Stock */}

            {modalType === "adjustStock" && (
              <>
                <h2>Adjust Stock</h2>

                <select
                  name="product"
                  value={form.product}
                  onChange={handleChange}
                >
                  <option value="">Select Product</option>

                  {products.map((p) => (
                    <option key={p.id}>{p.name}</option>
                  ))}
                </select>

                <select
                  name="fromStore"
                  value={form.fromStore}
                  onChange={handleChange}
                >
                  <option value="">Select Store</option>

                  {stores.map((s) => (
                    <option key={s.id}>{s.name}</option>
                  ))}
                </select>

                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity (+/-)"
                  value={form.quantity}
                  onChange={handleChange}
                />

                <button>Update Stock</button>
              </>
            )}

            {/* Transfer */}

            {modalType === "transferStock" && (
              <>
                <h2>Transfer Stock</h2>

                <select
                  name="product"
                  value={form.product}
                  onChange={handleChange}
                >
                  <option value="">Select Product</option>

                  {products.map((p) => (
                    <option key={p.id}>{p.name}</option>
                  ))}
                </select>

                <select
                  name="fromStore"
                  value={form.fromStore}
                  onChange={handleChange}
                >
                  <option value="">From Store</option>

                  {stores.map((s) => (
                    <option key={s.id}>{s.name}</option>
                  ))}
                </select>

                <select
                  name="toStore"
                  value={form.toStore}
                  onChange={handleChange}
                >
                  <option value="">To Store</option>

                  {stores.map((s) => (
                    <option key={s.id}>{s.name}</option>
                  ))}
                </select>

                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={handleChange}
                />

                <button>Transfer</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminDashboard;