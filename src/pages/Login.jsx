import { api } from "@/api/api";
import { axiosInterceptor } from "@/axios/interceptor";
import { routes } from "@/routes/routes";
import { loginSchema } from "@/validation/zod";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();


  async function handleSubmit() {
    try {
      setLoading(true);
      const result = loginSchema.safeParse(user);
      if (!result.success) {
        setErrors(result.error.issues[0].message);
        return;
      }
      const response = await axiosInterceptor.post(api.login, user);
      const token = response.data?.token;
      localStorage.setItem("token", token);
      nav(routes.HOME);
    } catch (error) {
      setErrors(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-zinc-400 mt-2">
            Sign in to access your NotifyOps dashboard.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Email Address
            </label>
            <input
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              placeholder="john@example.com"
              className="w-full h-12 px-4 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">Password</label>
            <input
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              placeholder="••••••••"
              className="w-full h-12 px-4 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 transition"
            />
          </div>
         <p className="text-white font-medium text-xs"> New here ? <span className="font-bold text-sm text-blue-600 cursor-pointer underline" onClick={() => nav(routes.REGISTER)}>Register</span> </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            className="w-full h-12 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition cursor-pointer"
            onClick={handleSubmit}
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
