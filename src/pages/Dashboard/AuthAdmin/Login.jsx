import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Login() {
  
  const navigate = useNavigate();


  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="w-[350px] bg-white shadow p-6 rounded"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
