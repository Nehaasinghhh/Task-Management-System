import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  CheckSquare,
} from "lucide-react";

import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful!");

      navigate("/");
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#120B10]">

      <div className="flex min-h-screen items-center justify-center px-4 py-10">

        <div className="w-full max-w-md">

          {/* LOGO */}
          <div className="mb-8 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E11D72] text-white shadow-xl shadow-[#E11D72]/20">
              <CheckSquare size={31} />
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#FDF2F8]">
              Create your account
            </h1>

            <p className="mt-2 text-[#B9A3AE]">
              Start organizing your work with TaskFlow
            </p>

          </div>

          {/* CARD */}
          <div className="rounded-3xl border border-[#3A202D] bg-[#1E1219] p-6 shadow-2xl shadow-black/30 sm:p-8">

            <form
              onSubmit={handleRegister}
              className="space-y-5"
            >

              {/* NAME */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-[#FDF2F8]">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8F6C7C]"
                  />

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-[#3A202D] bg-[#120B10] py-3 pl-10 pr-4 text-[#FDF2F8] outline-none transition placeholder:text-[#705463] focus:border-[#E11D72] focus:ring-2 focus:ring-[#E11D72]/20"
                  />

                </div>

              </div>

              {/* EMAIL */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-[#FDF2F8]">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8F6C7C]"
                  />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-[#3A202D] bg-[#120B10] py-3 pl-10 pr-4 text-[#FDF2F8] outline-none transition placeholder:text-[#705463] focus:border-[#E11D72] focus:ring-2 focus:ring-[#E11D72]/20"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-[#FDF2F8]">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8F6C7C]"
                  />

                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-[#3A202D] bg-[#120B10] py-3 pl-10 pr-4 text-[#FDF2F8] outline-none transition placeholder:text-[#705463] focus:border-[#E11D72] focus:ring-2 focus:ring-[#E11D72]/20"
                  />

                </div>

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E11D72] py-3 font-semibold text-white shadow-lg shadow-[#E11D72]/20 transition hover:bg-[#BE185D] active:scale-[0.98]"
              >
                <UserPlus size={18} />
                Create Account
              </button>

            </form>

            <div className="my-6 h-px bg-[#3A202D]" />

            <p className="text-center text-sm text-[#B9A3AE]">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-bold text-[#F472B6] transition hover:text-[#E11D72]"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;