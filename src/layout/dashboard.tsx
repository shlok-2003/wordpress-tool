import { Outlet, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

export default function DashboardLayout() {
    return (
        <main className="font-roboto space-y-5">
            <Navbar />

            <div className="flex flex-row gap-5 justify-center items-center flex-wrap">
                <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-lg font-normal uppercase"
                >
                    <Link to="add-user">Add User</Link>
                </Button>

                <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-lg font-normal uppercase"
                >
                    <Link to="add-category">Add Categories</Link>
                </Button>

                <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-lg font-normal uppercase"
                >
                    <Link to="add-attribute">Add Attributes</Link>
                </Button>

                <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-lg font-normal uppercase"
                >
                    <Link to="add-product">Add Products</Link>
                </Button>
            </div>

            <main>
                <Outlet />
            </main>
        </main>
    );
}
