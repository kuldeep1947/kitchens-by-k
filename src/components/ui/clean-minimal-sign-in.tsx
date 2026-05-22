"use client"

import * as React from "react"
import { useState } from "react";
import { LogIn, Lock, Mail, Phone, UserPlus, User, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignIn2 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validateInput = (value: string) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^[6-9]\d{9}$/.test(value);
    return isEmail || isPhone;
  };

  const handleSignIn = () => {
    if (!identifier || !password) {
      setError("Please enter both email/mobile and password.");
      return;
    }
    if (!validateInput(identifier)) {
      setError("Please enter a valid email or 10-digit mobile number.");
      return;
    }
    const stored = localStorage.getItem("kbk_user");
    if (!stored) {
      setError("No account found. Please create an account first.");
      return;
    }
    const user = JSON.parse(stored);
    if ((identifier !== user.email && identifier !== user.mobile) || password !== user.password) {
      setError("Invalid credentials. Please try again.");
      return;
    }
    setError("");
    login({ name: user.firstName + " " + user.lastName, email: user.email });
    const redirect = searchParams.get("redirect");
    navigate(redirect || "/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-slate-950 rounded-xl z-1">
      <div className="w-full max-w-sm bg-gradient-to-b from-emerald-50/50 to-white dark:from-slate-800/50 dark:to-slate-900 rounded-3xl shadow-xl shadow-opacity-10 p-8 flex flex-col items-center border border-emerald-100 dark:border-slate-700 text-black dark:text-white">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 mb-6 shadow-lg shadow-opacity-5">
          <LogIn className="w-7 h-7 text-emerald-700 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Welcome back
        </h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm mb-6 text-center">
          Sign in with your email or mobile number
        </p>
        <div className="w-full flex flex-col gap-3 mb-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              placeholder="Email or mobile number"
              type="text"
              value={identifier}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 bg-gray-50 dark:bg-slate-800 text-black dark:text-white text-sm"
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 bg-gray-50 dark:bg-slate-800 text-black dark:text-white text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="w-full flex justify-between items-center">
            {error && (
              <div className="text-sm text-red-500 text-left">{error}</div>
            )}
            <button className="text-xs hover:underline font-medium text-slate-600 dark:text-slate-400 ml-auto">
              Forgot password?
            </button>
          </div>
        </div>
        <button
          onClick={handleSignIn}
          className="w-full bg-gradient-to-b from-slate-700 to-slate-900 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 font-medium py-2 rounded-xl shadow hover:brightness-105 cursor-pointer transition mb-4 mt-2"
        >
          Sign In
        </button>
        <div className="flex items-center w-full my-2">
          <div className="flex-grow border-t border-dashed border-gray-200 dark:border-slate-700"></div>
          <span className="mx-2 text-xs text-gray-400 dark:text-slate-500">Or sign in with</span>
          <div className="flex-grow border-t border-dashed border-gray-200 dark:border-slate-700"></div>
        </div>
        <div className="flex gap-3 w-full justify-center mt-2">
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition grow">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition grow">
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition grow">
            <img
              src="https://www.svgrepo.com/show/511330/apple-173.svg"
              alt="Apple"
              className="w-6 h-6"
            />
          </button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = () => {
    if (!firstName || !lastName || !email || !mobile || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    localStorage.setItem("kbk_user", JSON.stringify({ firstName, lastName, email, mobile, password }));
    login({ name: firstName + " " + lastName, email });
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-slate-950 rounded-xl z-1">
      <div className="w-full max-w-sm bg-gradient-to-b from-emerald-50/50 to-white dark:from-slate-800/50 dark:to-slate-900 rounded-3xl shadow-xl shadow-opacity-10 p-8 flex flex-col items-center border border-emerald-100 dark:border-slate-700 text-black dark:text-white">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 mb-6 shadow-lg shadow-opacity-5">
          <UserPlus className="w-7 h-7 text-emerald-700 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Create Account
        </h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm mb-6 text-center">
          Join Kitchens by K and start ordering fresh meals
        </p>
        <div className="w-full flex flex-col gap-3 mb-2">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="w-4 h-4" />
              </span>
              <input
                placeholder="First name"
                type="text"
                value={firstName}
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 bg-gray-50 dark:bg-slate-800 text-black dark:text-white text-sm"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="relative flex-1">
              <input
                placeholder="Last name"
                type="text"
                value={lastName}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 bg-gray-50 dark:bg-slate-800 text-black dark:text-white text-sm"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 bg-gray-50 dark:bg-slate-800 text-black dark:text-white text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Phone className="w-4 h-4" />
            </span>
            <input
              placeholder="Mobile number"
              type="tel"
              value={mobile}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 bg-gray-50 dark:bg-slate-800 text-black dark:text-white text-sm"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 bg-gray-50 dark:bg-slate-800 text-black dark:text-white text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && (
            <div className="text-sm text-red-500 text-left">{error}</div>
          )}
        </div>
        <button
          onClick={handleSignUp}
          className="w-full bg-gradient-to-b from-slate-700 to-slate-900 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 font-medium py-2 rounded-xl shadow hover:brightness-105 cursor-pointer transition mb-4 mt-2"
        >
          Create Account
        </button>
        <div className="flex items-center w-full my-2">
          <div className="flex-grow border-t border-dashed border-gray-200 dark:border-slate-700"></div>
          <span className="mx-2 text-xs text-gray-400 dark:text-slate-500">Or sign up with</span>
          <div className="flex-grow border-t border-dashed border-gray-200 dark:border-slate-700"></div>
        </div>
        <div className="flex gap-3 w-full justify-center mt-2">
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition grow">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition grow">
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition grow">
            <img
              src="https://www.svgrepo.com/show/511330/apple-173.svg"
              alt="Apple"
              className="w-6 h-6"
            />
          </button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export { SignIn2, SignUp };
