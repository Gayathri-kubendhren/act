import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Image,
  Table2,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  Search,
  Check,
  X,
} from "lucide-react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const [showToast, setShowToast] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
const [view, setView] = useState("dashboard"); // dashboard | table

  

  /* ================= FORM ================= */
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
    status: "",
    createdBy: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= FETCH ================= */
  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:4000/api/orders");
    setOrders(res.data);
  };
const [deleteOrderNo, setDeleteOrderNo] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= EDIT ================= */
  const openEdit = (order) => {
    setForm({
      firstName: order.firstName || "",
      lastName: order.lastName || "",
      email: order.email || "",
      phone: order.phone || "",
      street: order.street || "",
      city: order.city || "",
      state: order.state || "",
      postal: order.postal || "",
      country: order.country || "",
      product: order.product,
      quantity: order.quantity,
      unitPrice: order.unitPrice,
      status: order.status,
      createdBy: order.createdBy,
    });
    setEditId(order._id);
    setOpenModal(true);
    setOpenMenu(null);
  };

  const updateOrder = async () => {
    await axios.put(`http://localhost:4000/api/orders/${editId}`, form);
    setOpenModal(false);
    fetchOrders();
    setShowToast("updated");
    setTimeout(() => setShowToast(""), 3000);
  };

  /* ================= DELETE ================= */
  const confirmDelete = async () => {
    await axios.delete(`http://localhost:4000/api/orders/${deleteId}`);
    setDeleteId(null);
    fetchOrders();
    setShowToast("deleted");
    setTimeout(() => setShowToast(""), 3000);
  };

  /* ================= SEARCH ================= */
 const filtered = orders.filter((o) => {
  if (!search.trim()) return true;

  const query = search.toLowerCase();

  const orderId = `ORD-${String(orders.indexOf(o) + 1).padStart(4, "0")}`
    .toLowerCase();

  return (
    `${o.firstName} ${o.lastName}`.toLowerCase().includes(query) ||
    (o.email || "").toLowerCase().includes(query) ||
    (o.phone || "").toLowerCase().includes(query) ||
    (o.product || "").toLowerCase().includes(query) ||
    (o.status || "").toLowerCase().includes(query) ||
    (o.createdBy || "").toLowerCase().includes(query) ||
    orderId.includes(query)   // ✅ ORDER ID SEARCH
  );
});


  return (
    <div className="w-full min-h-screen bg-white px-6 py-5">
      {/* ================= HEADER ================= */}
      <div className="mb-5">
        <h1 className="text-lg font-semibold">Customer Orders</h1>
        <p className="text-sm text-gray-500">
          View and manage customer orders and details
        </p>

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

      {/* ================= DASHBOARD VIEW ================= */}
      {view === "dashboard" && (
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
              onClick={() =>
  navigate("/configured", { state: { orders } })
}

              className="mt-4 w-full sm:w-auto rounded-md bg-emerald-500 px-4 py-2 text-xs sm:text-sm text-white hover:bg-emerald-600 transition"
            >
              Configure dashboard
            </button>
          </div>
        
      )}

      {/* ================= TABLE VIEW ================= */}
     
{view === "table" && (
  <>
    {/* ================= EMPTY STATE ================= */}
    {filtered.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
       <div className="mb-4 rounded-full border border-gray-200 p-4 sm:p-5">
              <Table2 className="text-gray-400" size={28} />
            </div>

            <h2 className="text-sm sm:text-base font-medium text-gray-700">
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
    ) : (
      <>
        {/* ================= TOP BAR ================= */}
        <div className="flex justify-between items-center mb-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
          if (e.key === "Enter") {
          e.preventDefault();
          }
          }}
              className="border pl-9 pr-3 py-2 rounded-md text-sm w-64"
            />
          </div>

          <button
            type="button" 
            onClick={() => navigate("/create-table")}
            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-md text-sm"
          >
            <Plus size={16} /> Create order
          </button>
        </div>

        
        {/* ================= TABLE ================= */}
<div className="border rounded-md overflow-x-auto relative">
  <table className="min-w-[2000px] w-full text-sm">
    <thead className="bg-gray-50">
      <tr>
        <th className="p-3 w-[70px] sticky left-0 bg-gray-50 z-10">
          S.no
        </th>
        <th className="p-3 w-[130px]  left-[70px] bg-gray-50 z-10">
          Customer ID
        </th>
        <th className="p-3 text-left font-medium">Customer Name</th>
        <th className="p-3 text-left font-medium">Email</th>
        <th className="p-3 text-left font-medium">Phone</th>
        <th className="p-3 text-left font-medium">Address</th>
        <th className="p-3 text-left font-medium">Order ID</th>
        <th className="p-3 text-left font-medium">Order Date</th>
        <th className="p-3 text-left font-medium">Product</th>
        <th className="p-3 text-left font-medium">Quantity</th>
        <th className="p-3 text-left font-medium">Unit Price</th>
        <th className="p-3 text-left font-medium">Total Amount</th>
        <th className="p-3 text-left font-medium">Status</th>
        <th className="p-3 text-left font-medium">Created By</th>
        <th className="p-3 text-left font-medium sticky right-0 bg-gray-50 z-10">
          
        </th>
      </tr>
    </thead>

    <tbody>
      {filtered.map((o, i) => (
        <tr key={o._id} className="border-t">
          {/* S.NO – STICKY */}
          <td className="p-3 w-[70px] sticky left-0 bg-white z-10">
          {i + 1}
          </td>

          {/* CUSTOMER ID – AUTO */}
          <td className="p-3 w-[130px] left-[70px] bg-white z-10">
          CUST-{String(i + 1).padStart(4, "0")}
          </td>

          <td className="p-3">
            {o.firstName} {o.lastName}
          </td>

          <td className="p-3">{o.email}</td>
          <td className="p-3  w-[130px]">{o.phone}</td>

          <td className="p-3  w-[210px]">
            {o.street}, {o.city}, {o.state}, {o.country} - {o.postal}
          </td>

          {/* ORDER ID */}
          <td className="p-3">
            ORD-{String(i + 1).padStart(4, "0")}
          </td>

          <td className="p-3">
            {new Date(o.createdAt).toLocaleString()}
          </td>

          <td className="p-3">{o.product}</td>
          <td className="p-3">{o.quantity}</td>
          <td className="p-3">$ {o.unitPrice}</td>
          <td className="p-3">$ {o.quantity * o.unitPrice}</td>
          <td className="p-3">{o.status}</td>
          <td className="p-3">{o.createdBy}</td>

          {/* ACTION – STICKY */}
          <td className="p-3 sticky right-0 bg-white z-10 relative">
            <MoreVertical
              size={16}
              className="cursor-pointer"
              onClick={() =>
                setOpenMenu(openMenu === o._id ? null : o._id)
              }
            />

            {openMenu === o._id && (
              <div className="absolute right-6 top-6 bg-white border rounded shadow text-sm z-20">
                <button
                  onClick={() => openEdit(o)}
                  className="flex gap-2 px-4 py-2 hover:bg-gray-50 w-full"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
              onClick={() => {
              setDeleteId(o._id);
              setDeleteOrderNo(`ORD-${String(i + 1).padStart(4, "0")}`);
              setOpenMenu(null);
             }}
          className="flex gap-2 px-4 py-2 hover:bg-gray-50 w-full text-red-600"
>
  <Trash2 size={14} /> Delete
</button>

              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </>
    )}
  </>
)}

      {/* ================= EDIT MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded p-5 max-h-[90vh] overflow-y-auto">
            <h3 className="font-semibold mb-4">Edit Order</h3>

            {/* Customer Information */}
            <h3 className="text-sm font-semibold mb-2">
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <input value={form.firstName} onChange={(e)=>setForm({...form,firstName:e.target.value})} className="border px-3 py-2 rounded" placeholder="First name"/>
              <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="border px-3 py-2 rounded" placeholder="Email"/>
              <input value={form.lastName} onChange={(e)=>setForm({...form,lastName:e.target.value})} className="border px-3 py-2 rounded" placeholder="Last name"/>
              <input value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="border px-3 py-2 rounded" placeholder="Phone"/>
              <input value={form.street} onChange={(e)=>setForm({...form,street:e.target.value})} className="border px-3 py-2 rounded col-span-2" placeholder="Street"/>
              <input value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})} className="border px-3 py-2 rounded" placeholder="City"/>
              <input value={form.state} onChange={(e)=>setForm({...form,state:e.target.value})} className="border px-3 py-2 rounded" placeholder="State"/>
              <input value={form.postal} onChange={(e)=>setForm({...form,postal:e.target.value})} className="border px-3 py-2 rounded" placeholder="Postal"/>
              <select value={form.country} onChange={(e)=>setForm({...form,country:e.target.value})} className="border px-3 py-2 rounded col-span-2">
                <option value="">Country</option>
                <option>United States</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Singapore</option>
                <option>Hong Kong</option>
              </select>
            </div>

            {/* Order Information */}
            <h3 className="text-sm font-semibold mt-5 mb-2">
              Order Information
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <select value={form.product} onChange={(e)=>setForm({...form,product:e.target.value})} className="border px-3 py-2 rounded col-span-2">
              <option>Fiber Internet 300 Mbps</option>
              <option>Business Interent 500 Mbps</option>
              <option>Fiber Inernet 1 Gbps</option>
              <option>5G Unlimited Mobile Plan</option>
              <option>VoIP Corporate Package</option>
              </select>
              <input type="number" value={form.quantity} onChange={(e)=>setForm({...form,quantity:Number(e.target.value)})} className="border px-3 py-2 rounded"/>
              <input type="number" value={form.unitPrice} onChange={(e)=>setForm({...form,unitPrice:e.target.value})} className="border px-3 py-2 rounded"/>
              <input disabled value={`$ ${form.quantity * form.unitPrice || 0}`} className="border px-3 py-2 rounded bg-gray-100"/>
              <select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})} className="border px-3 py-2 rounded">
                <option>Pending</option>
                <option>In progress</option>
                <option>Completed</option>
              </select>
              <select value={form.createdBy} onChange={(e)=>setForm({...form,createdBy:e.target.value})} className="border px-3 py-2 rounded col-span-2">
                    <option>Mr.Lucas Martin</option>
                    <option>Mr.Ryan Cooper</option>
                    <option>Mr.Olivia Carter</option>
                    <option>Mr.Michael Harris</option>
                    
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={()=>setOpenModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={updateOrder} className="px-4 py-2 bg-emerald-500 text-white rounded">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRM ================= */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded p-5">
            <h3 className="font-semibold mb-2">Delete</h3>
            <p className="text-sm mb-4">
  Are you sure you want to delete the{" "}
  <span className="font-semibold text-gray-900">
    {deleteOrderNo}
  </span>
  ?
</p>


            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-emerald-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TOAST ================= */}
      {showToast && (
        <div className="fixed top-5 right-5 flex gap-2 items-center bg-emerald-100 border border-emerald-300 px-4 py-3 rounded shadow">
          <Check size={18} className="text-emerald-600" />
          <span className="text-sm">
            {showToast === "updated"
              ? "All set! Your changes have been saved successfully!"
              : "Done! Your item has been removed"}
          </span>
          <X
            size={16}
            className="cursor-pointer"
            onClick={() => setShowToast("")}
          />
        </div>
      )}
    </div>
  );
}
