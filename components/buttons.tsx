"use client";

import Link from "next/link";
import { IoAddSharp, IoPencil, IoTrashOutline } from "react-icons/io5";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { deleteEmployee } from "@/lib/actions";

export const CreateEmployee = () => {
    return (
        <div className="mb-2 w-full text-right">
            <Link
              href="/employee/create"
              className="btn btn-ghost bg-yellow-200 hover:bg-yellow-300">
            <IoAddSharp size={20} />

              Create
            </Link>
          </div>

       
    );
};

export const EditEmployee = ({ id }: { id: string }) => {
    return (
        <Link
            href={`/employee/edit/${id}`}
            className="rounded-sm border p-1 hover-bg-gray-100">
            <IoPencil size={20} />
        </Link>
    );
};

export const DeleteEmployee = ({ id }: { id: string }) => {
    const DeleteEmployeeWithId = deleteEmployee.bind(null, id);

    return (
        <form action={DeleteEmployeeWithId}>
            <button className="rounded-sm border p-1 hover-bg-gray-100">
                <IoTrashOutline size={20} />
            </button>
        </form>

    );
};

export const SubmitButton = ({ label }: { label: string }) => {
    const { pending } = useFormStatus();

    const className = clsx(
        "text-white bg-yellow-200 hover:bg-yellow-300 font-medium rounded-lg text-sm w-80 px-5 py-3 text-center",
        {
            "opacity-50 cursor-progress": pending,
        }
    );

    return (
        <button type="submit" className={className} disabled={pending}>
            {label === "save" ? (
                <span>{pending ? "Saving..." : "Save"}</span>
            ) : (
                <span>{pending ? "Updating..." : "Update"}</span>
            )}
        </button>
    );
};