import { getImages } from "@/lib/data"; // Pastikan ini mengarah ke data yang benar
import ClientComponent from "@/components/ClientComponent"; // Pastikan path ini benar

export default async function Home() {
    // Ambil data dari Prisma
    const images = await getImages();

    // Pastikan images memiliki struktur data yang sesuai
    return (
        <div>
            {/* Kirim data ke Client Component */}
            <ClientComponent
                images={images} // Pastikan tipe data images sesuai dengan yang diterima ClientComponent
            />
        </div>
    );
}

