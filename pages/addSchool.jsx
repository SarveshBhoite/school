'use client';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Toast from '@/components/Toast';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [toast, setToast] = useState({ open: false, type: 'success', title: '', message: '' });
  const [preview, setPreview] = useState(null);

  const imageFile = watch('image');

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const url = URL.createObjectURL(imageFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
  }, [imageFile]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);
    formData.append('email_id', data.email_id);
    formData.append('image', data.image[0]);

    const res = await fetch('/api/schools', { method: 'POST', body: formData });
    if (res.ok) {
      setToast({ open: true, type: 'success', title: 'School added', message: 'Your record was saved.' });
      reset();
      setPreview(null);
    } else {
      const err = await res.json().catch(() => ({}));
      setToast({ open: true, type: 'error', title: 'Failed', message: err.error || 'Please try again.' });
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="card p-6">
          <h1 className="text-2xl font-bold text-slate-900">Add School</h1>
          <p className="mt-1 text-sm text-slate-600">Fill the details and upload a school image.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">School Name</label>
              <input className="input" placeholder="e.g., Sunrise Public School" {...register('name', { required: true })}/>
              {errors.name && <p className="mt-1 text-xs text-red-600">Name is required</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
              <input className="input" placeholder="123, MG Road" {...register('address', { required: true })}/>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">City</label>
              <input className="input" placeholder="Pune" {...register('city', { required: true })}/>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">State</label>
              <input className="input" placeholder="Maharashtra" {...register('state', { required: true })}/>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Contact</label>
              <input className="input" type="number" placeholder="10-digit number"
                     {...register('contact', { required: true, minLength: 10, maxLength: 10 })}/>
              {errors.contact && <p className="mt-1 text-xs text-red-600">Enter a valid 10-digit number</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input className="input" type="email" placeholder="school@email.com"
                     {...register('email_id', { required: true, pattern: /^\S+@\S+$/i })}/>
              {errors.email_id && <p className="mt-1 text-xs text-red-600">Enter a valid email</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Image</label>
              <input className="input file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-white
                                hover:file:bg-blue-700"
                     type="file" accept="image/*" {...register('image', { required: true })}/>
              {errors.image && <p className="mt-1 text-xs text-red-600">Image is required</p>}
              {preview && <img src={preview} alt="Preview" className="mt-3 h-48 w-full rounded-lg object-cover border" />}
            </div>

            <div className="sm:col-span-2 flex justify-end">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </main>

      <Toast
        open={toast.open}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast(t => ({ ...t, open: false }))}
      />
    </>
  );
}
