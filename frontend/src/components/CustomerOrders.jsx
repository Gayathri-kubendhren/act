import React, { useState } from "react";
import { LayoutGrid, Table2, Image, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustomerOrders() {
  const [view, setView] = useState("dashboard"); // 'dashboard' | 'table'
  const navigate = useNavigate();

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
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <button
            onClick={() => setView("dashboard")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 border transition text-xs sm:text-sm ${
              view === "dashboard"
                ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutGrid size={16} /> Dashboard
          </button>

          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 border transition text-xs sm:text-sm ${
              view === "table"
                ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Table2 size={16} /> Table
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[70vh]">
        {view === "dashboard" ? (
          <div className="flex max-w-sm flex-col items-center px-4 text-center">
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
          <div className="flex max-w-sm flex-col items-center px-4 text-center">
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
        )}
      </div>
    </div>
  );
}
