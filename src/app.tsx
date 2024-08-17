import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "@/layout/dashboard";
import Dashboard from "@/pages/dashboard";
import AddUser from "@/pages/add-user";
import AddProduct from "@/pages/add-product";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<h1>Home</h1>} />
                <Route path="/sign-up" element={<h1>Home</h1>} />

                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="add-user" element={<AddUser />} />

                    <Route path="add-product" element={<AddProduct />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
