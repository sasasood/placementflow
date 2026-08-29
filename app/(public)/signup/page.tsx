"use client";

import { useState } from "react";
import Input from "@/components/Input";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ name, email, password });
    alert(`Welcome ${name}! (Check your browser console for the data)`);
  }

  return (
    <main className="flex flex-col items-center justify-center flex-1 px-4">
      <h1 className="text-2xl font-bold mb-6">Create your account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-black text-white rounded px-4 py-2">
          Sign Up
        </button>
      </form>
    </main>
  );
}