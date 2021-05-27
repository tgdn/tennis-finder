import Link from "next/link";

export default function Navbar() {
  return (
    <header className="relative block md:items-center md:justify-center md:flex md:pt-5">
      <div className="flex items-center justify-between mt-5 mb-3">
        {/* logo */}
        <div className="md:absolute md:left-0 md:top-6">
          <nav className="text-lg">
            <Link href="/">
              <a className="p-1 -ml-1">Tennis Finder</a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
