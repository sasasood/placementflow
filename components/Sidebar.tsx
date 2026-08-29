"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/companies", label: "Companies" },
  { href: "/applications", label: "Applications" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 border-r min-h-screen px-4 py-6 flex flex-col gap-2">
      <span className="font-bold text-lg mb-4 px-2">PlacementFlow</span>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-3 py-2 rounded ${
            pathname === link.href
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}