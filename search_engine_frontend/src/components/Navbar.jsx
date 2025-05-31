import { Link } from "react-router-dom";
import { UserIcon, PencilSquareIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 transition duration-300 hover:scale-105"
      >
        SmartSearch AI
      </Link>

      <div className="flex gap-6 items-center text-gray-700">
        <Link
          to="/about"
          className="flex items-center gap-1 group relative transition duration-200 hover:text-blue-600"
        >
          <InformationCircleIcon className="h-5 w-5" />
          <span className="group-hover:underline">About</span>
        </Link>

        <Link
          to="/login"
          className="flex items-center gap-1 group relative transition duration-200 hover:text-blue-600"
        >
          <UserIcon className="h-5 w-5" />
          <span className="group-hover:underline">Login</span>
        </Link>

        <Link
          to="/register"
          className="flex items-center gap-1 group relative transition duration-200 hover:text-blue-600"
        >
          <PencilSquareIcon className="h-5 w-5" />
          <span className="group-hover:underline">Register</span>
        </Link>
      </div>
    </nav>
  );
}
