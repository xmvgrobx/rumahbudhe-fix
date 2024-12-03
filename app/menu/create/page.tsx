import CreateMenu from '@/components/menu/create-menu';
import React from 'react'

const CreateMenuPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100'>
        <div className='bg-white rounded-sm shadow p-8'>
            <h1 className='text-2xl font-bold mb-5'>Upload Menu</h1>
                <CreateMenu/>
        </div>
    </div>
  )
}

export default CreateMenuPage;