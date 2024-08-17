import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "@/layout/dashboard";
import Dashboard from "@/pages/dashboard";
import AddUser from "@/pages/add-user";
import AddProduct from "@/pages/add-product";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/sign-up" element={<h1>Home</h1>} />

                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="add-user" element={<AddUser />} />

                    <Route path="add-product" element={<AddProduct />} />

                </Route>
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    );
}
