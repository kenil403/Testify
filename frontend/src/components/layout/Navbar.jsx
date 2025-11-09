import { UserIcon } from "../icons/Icons";

export default function Navbar({ navigate, currentPage, currentUser, handleLogout }) {
  const linkStyle =
    "px-3 py-2 rounded-lg text-slate-600 hover:text-green-600 font-medium transition-colors duration-300 cursor-pointer";
  const activeLinkStyle =
    "px-3 py-2 rounded-lg bg-green-100 text-green-700 font-semibold cursor-pointer";

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div
        onClick={() => navigate("home")}
        className="cursor-pointer text-2xl font-bold text-green-600"
      >
        Testify<span className="text-amber-500">.</span>
      </div>

      {/* Links */}
      <div className="hidden md:flex gap-4 items-center">
        <a
          onClick={() => navigate("home")}
          className={currentPage === "home" ? activeLinkStyle : linkStyle}
        >
          Home
        </a>
        <a
          onClick={() => navigate("learn")}
          className={currentPage.startsWith("learn") ? activeLinkStyle : linkStyle}
        >
          Learn
        </a>
        {/* Hide Test link for Admin users */}
        {currentUser?.role !== 'Admin' && (
          <a
            onClick={() => navigate("test-selection")}
            className={currentPage.startsWith("test-") ? activeLinkStyle : linkStyle}
          >
            Test
          </a>
        )}

        {/* Profile / Login Circle */}
        <div
          onClick={() => navigate(currentUser ? "profile" : "auth")}
          className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full cursor-pointer hover:bg-green-700 transition"
        >
          <UserIcon />
        </div>
      </div>
    </nav>
  );
}
