import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* soft background shapes */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,#dbeafe_0%,transparent_70%)]" />
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Manage schools with ease
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Add new schools with images, and browse them in a clean, responsive grid.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/addSchool" className="btn btn-primary">
                Add a School
              </Link>
              <Link href="/showSchools" className="btn btn-ghost">
                View Schools
              </Link>
            </div>
          </div>

          {/* feature cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="card p-5">
              <h3 className="font-semibold text-slate-900">Validated Forms</h3>
              <p className="mt-1 text-sm text-slate-600">Email + contact checks with crisp error states.</p>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-slate-900">Image Uploads</h3>
              <p className="mt-1 text-sm text-slate-600">Files stored locally; paths saved in MySQL.</p>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-slate-900">Responsive Grid</h3>
              <p className="mt-1 text-sm text-slate-600">Elegant, ecommerce-like listing layout.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
