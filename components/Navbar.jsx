import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">School Manager</h1>
        <div className="space-x-6">
          <Link href="/" className="hover:text-gray-200 transition">Home</Link>
          <Link href="/addSchool" className="hover:text-gray-200 transition">Add School</Link>
          <Link href="/showSchools" className="hover:text-gray-200 transition">Show Schools</Link>
        </div>
      </div>
    </nav>
  );
}
