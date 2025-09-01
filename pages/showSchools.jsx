'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch('/api/schools').then(r => r.json()).then(setSchools);
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">School Listings</h1>
          <p className="text-sm text-slate-600">Clean, responsive, ecommerce-style grid.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {schools.map(s => (
            <article key={s.id} className="card overflow-hidden">
              <img src={s.image} alt={s.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">{s.name}</h3>
                <p className="mt-1 text-slate-700">{s.address}</p>
                <p className="text-sm text-slate-500">{s.city}</p>
              </div>
            </article>
          ))}
        </div>

        {schools.length === 0 && (
          <p className="mt-8 text-center text-slate-500">No schools added yet.</p>
        )}
      </main>
    </>
  );
}
