// // pages/api/menu/[id]/edit.js
// import { getImagesById, updateImageById } from '@/lib/data'

// export default async function handler(req, res) {
//   const { id } = req.query

//   if (req.method === 'GET') {
//     const data = await getImagesById(id)
//     if (!data) {
//       return res.status(404).json({ error: 'Menu item not found' })
//     }
//     res.status(200).json(data)
//   } else if (req.method === 'PUT') {
//     const { name, description, price, image } = req.body
//     const updatedData = await updateImageById(id, { name, description, price, image })
//     res.status(200).json(updatedData)
//   } else {
//     res.status(405).json({ error: 'Method not allowed' })
//   }
// }