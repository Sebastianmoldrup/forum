import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 md:px-8">
      <div className="bg-amber-200 py-2 px-4 rounded-xs">
        <Link href="/">Forum</Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <a href="">Grupper</a>
        </li>
        <li>
          <a href="">Profil</a>
        </li>
      </ul>
    </nav>
  );
}
