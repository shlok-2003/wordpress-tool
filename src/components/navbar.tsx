import { Link } from "react-router-dom";
import { IoMdSettings } from "@/icons";

export default function Navbar() {
    return (
        <header className="w-full h-16 bg-blue-600 flex flex-row px-10 justify-between items-center">
            <Link to="/dashboard">
                <h1 className="text-white text-2xl max-md:text-xl font-medium">
                    Dashboard
                </h1>
            </Link>

            <div className="flex flex-row gap-5 max-sm:gap-2 items-center [&>*]:text-white">
                <IoMdSettings className="size-6" />
                <Link
                    to="/sign-in"
                    className="text-white uppercase max-md:text-sm font-medium"
                >
                    Sign In
                </Link>
                <Link
                    to="/sign-up"
                    className="text-white uppercase max-md:text-sm font-medium"
                >
                    Sign Up
                </Link>
            </div>
        </header>
    );
}
