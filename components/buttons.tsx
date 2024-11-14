'use client';

import Link from 'next/link';
import { IoAddSharp, IoPencil, IoTrashOutline } from 'react-icons/io5';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { deleteEmployee, deleteImage } from '@/lib/actions';

export const CreateEmployee = () => {
  return (
    <div className="mb-2 w-full text-right">
      <Link
        href="/employee/create"
        className="btn btn-ghost bg-yellow-200 hover:bg-yellow-300"
      >
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
      className="hover-bg-gray-100 rounded-sm border p-1"
    >
      <IoPencil size={20} />
    </Link>
  );
};

export const DeleteEmployee = ({ id }: { id: string }) => {
  const DeleteEmployeeWithId = deleteEmployee.bind(null, id);

  return (
    <form action={DeleteEmployeeWithId}>
      <button className="hover-bg-gray-100 rounded-sm border p-1">
        <IoTrashOutline size={20} />
      </button>
    </form>
  );
};

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  const className = clsx(
    'text-white bg-yellow-200 hover:bg-yellow-300 font-medium rounded-lg text-sm w-80 px-5 py-3 text-center',
    {
      'opacity-50 cursor-progress': pending,
    },
  );

  return (
    <button type="submit" className={className} disabled={pending}>
      {label === 'save' ? (
        <span>{pending ? 'Saving...' : 'Save'}</span>
      ) : (
        <span>{pending ? 'Updating...' : 'Update'}</span>
      )}
    </button>
  );
};

export const SubmitButtonMenu = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={clsx(
        'w-full rounded-sm bg-yellow-200 px-6 py-2.5 text-base font-medium text-white hover:bg-yellow-300',
        {
          'cursor-progress opacity-50': pending,
        },
      )}
      type="submit"
      disabled={pending}
    >
      {label === 'upload' ? (
        <>{pending ? 'Uploading...' : 'Upload'}</>
      ) : (
        <>{pending ? 'Updating...' : 'Update'}</>
      )}
    </button>
  );
};

export const EditMenu = ({ id }: { id: string }) => {
  return (
    <Link
      href={`menu/edit/${id}`}
      className="py-3 text-sm bg-gray-50 rounded-bl-md w-full hover:bg-gray-100 text-center"
    >
      Edit
    </Link>
  );
};

export const DeleteMenu = ({ id }: { id: string }) => {
  const deleteImageWithId = deleteImage.bind(null, id);
  return (
    <form
      action={deleteImageWithId}
      className="py-3 text-sm bg-gray-50 rounded-bl-md w-full hover:bg-gray-100 text-center"
    >
      <DeleteBtn />
    </form>
  );
};

const DeleteBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Deleting...' : 'Delete'}
    </button>
  );
};
