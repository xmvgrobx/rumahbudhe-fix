"use client"

import React from 'react';
import { updateEmployee } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/buttons';
import type { Employee } from '@prisma/client';

const UpdateEmployee = ({ employee }: { employee: Employee }) => {
 const UpdateEmployeeWithId = updateEmployee.bind(null, employee.id)
  const [state, formAction] = useFormState(UpdateEmployeeWithId, null);


  return (
    <div className="mx-auto mt-5 max-w-md">
      <div>
        <form action={formAction}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Full Name..."
              defaultValue={employee.name}
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Email..."
              defaultValue={employee.email}
            />
            <div id="email-error" aria-live="polite" aria-atomic="true">
              <p className="mt-2 text-sm text-red-500">{state?.Error?.email}</p>
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-900"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Phone Number..."
              defaultValue={employee.phone}
            />
            <div id="phone-error" aria-live="polite" aria-atomic="true">
              <p className="mt-2 text-sm text-red-500">{state?.Error?.phone}</p>
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="shift"
              className="block text-sm font-medium text-gray-900"
            >
              Jadwal Shift
            </label>
            <input
              type="text"
              name="shift"
              id="shift"
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Shift..."
              defaultValue={employee.shift}
            />
            <div id="shift-error" aria-live="polite" aria-atomic="true">
              <p className="mt-2 text-sm text-red-500">{state?.Error?.shift}</p>
            </div>
          </div>
          <div id="message-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.message}</p>
          </div>

          <SubmitButton label="save" />

        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;

