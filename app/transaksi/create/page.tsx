import { getImages } from "@/lib/data"; 
import ClientComponent from "@/components/ClientComponent"; 

export default async function Home() {
    const images = await getImages();

    return (
        <div>
            <ClientComponent
                images={images} // Pastikan tipe data images sesuai dengan yang diterima ClientComponent
            />
        </div>
    );
}

