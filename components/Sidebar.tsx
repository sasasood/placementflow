"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearToken } from "@/lib/api";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/companies", label: "Companies" },
  { href: "/applications", label: "Applications" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.push("/login");
  }

  return (
    <aside className="w-56 border-r min-h-screen px-4 py-6 flex flex-col gap-2">
      <span className="font-bold text-lg mb-4 px-2">PlacementFlow</span>

      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-3 py-2 rounded ${
            pathname.startsWith(link.href)
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {link.label}
        </Link>
      ))}

      <button
        onClick={handleLogout}
        className="mt-auto px-3 py-2 rounded text-left text-red-500 hover:bg-gray-100"
      >
        Logout
      </button>
    </aside>
  );
}