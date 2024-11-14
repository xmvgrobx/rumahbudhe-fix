import UpdateMenu from '@/components/edit-menu'
import { getImagesById } from '@/lib/data'
import { notFound } from 'next/navigation'


const UpdateMenuPage = async ({params}:{params:{id:string}}) => {
    const id = params.id;
    const data = await getImagesById(params.id)
   
    if (!data) {return notFound();}


  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100'>
    <div className='bg-white rounded-sm shadow p-8'>
        <h1 className='text-2xl font-bold mb-5'>Update Menu</h1>
            <UpdateMenu data={data}/>
    </div>
</div>  )
}

export default UpdateMenuPage