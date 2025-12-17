import React, { useState, useEffect } from "react";
import { LayoutGrid, Table2, Image, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function CreateTable() {
  const [view, setView] = useState("dashboard"); // 'dashboard' | 'table'
  const [openModal, setOpenModal] = useState(false); // 🔹 popup state
  const navigate = useNavigate();
  const location = useLocation();

  const { editMode, orderData } = location.state || {};

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    product: "",
    quantity: 1,
    unitPrice: "",
    status: "Pending",
    createdBy: "",
  });

  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);
 
  useEffect(() => {
    setOpenModal(true);
  }, []);
  
  


  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (editMode && orderData) {
      setForm({
        firstName: orderData.firstName || "",
        lastName: orderData.lastName || "",
        email: orderData.email || "",
        phone: orderData.phone || "",
        street: orderData.street || "",
        city: orderData.city || "",
        state: orderData.state || "",
        postal: orderData.postal || "",
        country: orderData.country || "",
        product: orderData.product || "",
        quantity: orderData.quantity || 1,
        unitPrice: orderData.unitPrice || "",
        status: orderData.status || "Pending",
        createdBy: orderData.createdBy || "",
      });
      setOpenModal(true);
    }
  }, [editMode, orderData]);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:4000/api/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white px-4 py-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          Customer Orders
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          View and manage customer orders and details
        </p>

        {/* Tabs */}
        <div className="mt-4 flex gap-2 text-sm">
          <button
            onClick={() => setView("dashboard")}
            className={`flex items-center gap-2 px-3 py-1.5 border rounded ${
              view === "dashboard"
                ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                : ""
            }`}
          >
            <LayoutGrid size={16} /> Dashboard
          </button>

          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-2 px-3 py-1.5 border rounded ${
              view === "table"
                ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                : ""
            }`}
          >
            <Table2 size={16} /> Table
          </button>
        </div>
      </div>

      {/* Empty UI (background only, no button now) */}
      <div >
        {view === "dashboard" ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="mb-4 rounded-full border border-gray-200 p-4 sm:p-5">
              <Image className="text-gray-400" size={28} />
            </div>

            <h2 className="text-sm sm:text-base font-medium text-gray-700">
              Dashboard Not Configured
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Configure your dashboard to start viewing analytics
            </p>

            <button
              onClick={() => navigate("/configured")}
              className="mt-4 w-full sm:w-auto rounded-md bg-emerald-500 px-4 py-2 text-xs sm:text-sm text-white hover:bg-emerald-600 transition"
            >
              Configure dashboard
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="mb-4 rounded-full border border-gray-200 p-4 sm:p-5">
              <Table2 className="text-gray-400" size={28} />
            </div>

            <h2 className="text-sm sm:text-base font-medium text-gray-700 ">
              No Orders Yet
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Click Create Order and enter your order information
            </p>

            <button
              onClick={() => navigate("/create-table")}
              className="mt-4 flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-xs sm:text-sm text-white hover:bg-emerald-600 transition"
            >
              <Plus size={16} /> Create order
            </button>
          </div>
        )}
      </div>


      {/* ================= POPUP MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-3xl rounded-lg p-5 relative mt-44 mb-32">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editMode ? "Edit Order" : "Create order"}
              </h2>
              <button onClick={() => setOpenModal(false)}>✕</button>
            </div>

            {/* ================= Customer Information ================= */}
            <h3 className="text-sm font-semibold mb-2">
              Customer Information
            </h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <input
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className={`border px-3 py-2 rounded ${
                  errors.firstName && "border-red-500"
                }`}
                placeholder="First name *"
              />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`border px-3 py-2 rounded ${
                  errors.email && "border-red-500"
                }`}
                placeholder="Email id *"
              />
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className={`border px-3 py-2 rounded ${
                  errors.lastName && "border-red-500"
                }`}
                placeholder="Last name *"
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`border px-3 py-2 rounded ${
                  errors.phone && "border-red-500"
                }`}
                placeholder="Phone number *"
              />
              <input
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                className={`border px-3 py-2 rounded col-span-2 ${
                  errors.street && "border-red-500"
                }`}
                placeholder="Street address *"
              />
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className={`border px-3 py-2 rounded ${
                  errors.city && "border-red-500"
                }`}
                placeholder="City *"
              />
              <input
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className={`border px-3 py-2 rounded ${
                  errors.state && "border-red-500"
                }`}
                placeholder="State / Province *"
              />
              <input
                value={form.postal}
                onChange={(e) => setForm({ ...form, postal: e.target.value })}
                className={`border px-3 py-2 rounded ${
                  errors.postal && "border-red-500"
                }`}
                placeholder="Postal code *"
              />
              <select
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className={`border px-3 py-2 rounded ${
                  errors.country && "border-red-500"
                }`}
              >
                <option value="">Country *</option>
                <option>United States</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Singapore</option>
                <option>Hong Kong</option>
              </select>
            </div>

            {/* ================= Order Information ================= */}
            <h3 className="text-sm font-semibold mt-5 mb-2">
              Order Information
            </h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <select
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                className={`border px-3 py-2 rounded col-span-2 ${
                  errors.product && "border-red-500"
                }`}
              >
                <option value="">Choose product *</option>
                <option>Fiber Internet 300 Mbps</option>
                <option>5GUnlimited Mobile Plan</option>
                <option>Fiber Internet 1 Gbps</option>
                <option>Business Internet 500 Mbps</option>
                <option>VoIP Corporate Package</option>
              </select>

              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: Number(e.target.value) })
                }
                className="border px-3 py-2 rounded"
                placeholder="Quantity"
              />

              <div
                className={`flex border rounded px-2 items-center ${
                  errors.unitPrice && "border-red-500"
                }`}
              >
                <span className="text-gray-500 mr-1">$</span>
                <input
                  type="number"
                  value={form.unitPrice}
                  onChange={(e) =>
                    setForm({ ...form, unitPrice: e.target.value })
                  }
                  className="w-full py-2 outline-none"
                  placeholder="Unit price *"
                />
              </div>

              <input
                value={`$ ${form.quantity * form.unitPrice || 0}`}
                disabled
                className="border px-3 py-2 rounded bg-gray-100"
                placeholder="Total amount *"
              />

              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="border px-3 py-2 rounded"
              >
                <option>Pending</option>
                <option>In progress</option>
                <option>Completed</option>
              </select>

              <select
                value={form.createdBy}
                onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
                className={`border px-3 py-2 rounded col-span-2 ${
                  errors.createdBy && "border-red-500"
                }`}
              >
                <option value="">Created by *</option>
                <option>Mr. Michael Harris</option>
                <option>Mr. Ryan Cooper</option>
                <option>Ms. Olivia Carter</option>
                <option>Mr. Lucas Martin</option>
              </select>
            </div>

            {/* ================= Footer ================= */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  const newErrors = {};
                  Object.keys(form).forEach((k) => {
                    if (!form[k]) newErrors[k] = true;
                  });
                  setErrors(newErrors);

                  if (Object.keys(newErrors).length === 0) {
                    if (editMode) {
                      await axios.put(
                        `http://localhost:4000/api/orders/${orderData._id}`,
                        form
                      );
                    } else {
                      await axios.post("http://localhost:4000/api/orders", form);
                    }

                    setOpenModal(false);
                    navigate("/", {
                      state: { toast: editMode ? "updated" : "created" },
                    });
                  }
                }}
                className="px-4 py-2 bg-emerald-500 text-white rounded"
              >
                {editMode ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= END POPUP ================= */}
    </div>
  );
}
