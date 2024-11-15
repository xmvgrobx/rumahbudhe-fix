"use client";
import React from "react";
import { uploadMenu } from "@/lib/actions";
import { useFormState } from "react-dom";
import { SubmitButtonMenu } from "@/components/buttons";

const CreateForm = () => {
  const [state, formAction] = useFormState(uploadMenu, null);

  return (
    <form action={formAction}>
      {/* Alert */}
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <div className="font-medium">{state?.message}</div>
        </div>
      ) : null}

      <div className="mb-4 pt-2">
        <input
          type="text"
          name="nama"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="Nama..."
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.nama}</p>
        </div>
      </div>
      <div className="mb-4 pt-2">
        <input
          type="file"
          name="image"
          className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full"
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.image}</p>
        </div>
      </div>

      <div className="mb-4 pt-2">
        <input
          type="number"
          name="harga"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="Harga..."
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.harga}</p>
        </div>
      </div>

      <div className="mb-4 pt-2">
        <input
          type="text"
          name="keterangan"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="Keterangan..."
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.keterangan}</p>
        </div>
      </div>

      <div className="mb-4 pt-4">
        <SubmitButtonMenu label="upload" />
      </div>
    </form>
  );
};

export default CreateForm;