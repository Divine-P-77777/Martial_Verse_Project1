
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#1a1a1a] text-white">
     <img src="/panda.gif" className="w-[300px] h-[300px] rounded-2xl overflow-hidden mb-4" alt="" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      <Link to="/" className="text-yellow-400 hover:underline">
        Go back home
      </Link>
    </div>
  );
}
