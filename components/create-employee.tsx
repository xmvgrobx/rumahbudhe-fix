"use client"

import React from 'react';
import { saveEmployee } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/buttons';


const CreateEmployee = () => {
    const [state, formAction] = useFormState(saveEmployee, null);

    return (
        <div className="mx-auto mt-5 max-w-md">
            <div>
                <form action={formAction}>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-800"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Full Name..."
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
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Email..."
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
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Phone Number..."
                        />
                        <div id="phone-error" aria-live="polite" aria-atomic="true">
                            <p className="mt-2 text-sm text-red-500">{state?.Error?.phone}</p>
                        </div>
                    </div>
                    <div id="message-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.message}</p>
                    </div>

                    <SubmitButton label="save" />

                    {/* <button className="btn btn-primary">Save</button> */}
                </form>
            </div>
        </div>
    );
};

export default CreateEmployee;

// {/* <SubmitButton label="save" /> */}
