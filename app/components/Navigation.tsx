import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 md:px-8">
      <div className="bg-amber-200 py-2 px-4 rounded-xs">
        <Link href="/">Forum</Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Hjem</Link>
        </li>
        <li>
          <Link href="/profil">Profil</Link>
        </li>
      </ul>
    </nav>
  );
}
