import { CheckSquare, LogOut } from "lucide-react";

function Navbar({ onLogout }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3A202D] bg-[#120B10]/95 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* BRAND */}
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E11D72] text-white shadow-lg shadow-[#E11D72]/20">
            <CheckSquare size={23} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#FDF2F8]">
              TaskFlow
            </h1>

            <p className="hidden text-xs text-[#B9A3AE] sm:block">
              Organize. Focus. Complete.
            </p>
          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-xl border border-[#3A202D] px-3 py-2 text-sm font-semibold text-[#B9A3AE] transition hover:border-[#831843] hover:bg-[#831843]/20 hover:text-[#F472B6]"
        >
          <LogOut size={17} />

          <span className="hidden sm:inline">
            Logout
          </span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;