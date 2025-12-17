
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerOrders from "./components/CustomerOrders";
import Configured from "./components/Configured";
import CreateTable from "./components/CreateTable";
import Orders from "./components/Orders";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/configured" element={<Configured />} />
        <Route path="/create-table" element={<CreateTable />} />
        <Route path="/CustomerOrders" element={<CustomerOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
