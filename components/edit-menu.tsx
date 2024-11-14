"use client";

import React from 'react'
import { updateMenu } from '@/lib/actions'
import { useFormState } from 'react-dom'
import { SubmitButtonMenu } from './buttons';
import type { Menu } from '@prisma/client';

const UpdateMenu = ({ data }: { data: Menu }) => {
  const [state, formAction] = useFormState(updateMenu.bind(null, data.id), null);


  return (
    <form action={formAction}>
      <div className='mb-4 pt-2'>
        <input
          type="text"
          name="nama"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="Nama..."
          defaultValue={data.nama}
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.Error?.nama}</p>
        </div>
      </div>

      <div className='mb-4 pt-2'>
        <input
          type="file"
          name="image"
          className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full"
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.Error?.image}</p>
        </div>
      </div>


      <div className='mb-4 pt-2'>
        <input
          type='number'
          name="harga"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="Harga..."
          defaultValue={data.harga}

        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.Error?.harga}</p>
        </div>
      </div>

      <div className='mb-4 pt-2'>
        <input
          type="text"
          name="keterangan"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="Keterangan..."
          defaultValue={data.keterangan}

        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.Error?.keterangan}</p>
        </div>
      </div>

      <div className='mb-4 pt-4'>
        <SubmitButtonMenu label="update" />
      </div>

    </form>
  )
}

export default UpdateMenu