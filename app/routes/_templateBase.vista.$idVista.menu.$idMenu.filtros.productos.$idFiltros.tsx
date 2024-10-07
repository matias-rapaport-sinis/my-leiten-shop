import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData, useParams } from "@remix-run/react"


export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { idVista, idMenu } = params;

    const arrayFilter = [{
        "key": "string",
        "value": "string"
    }]


    try {
        const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetProductos?IdVista=1`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '12345'
            },
            body: JSON.stringify(arrayFilter)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok333');
        }

        const products = await response.json();
        // Second fetch to get images for each product
        const productsWithImages = await Promise.all(products['$values'].map(async (product: { id: string }) => {
            try {
                console.log(product);
                const imageResponse = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetImagen/Id/${product.id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': '12345'
                    }
                });

                if (!imageResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                const imageBlob = await imageResponse.blob();
                const imageArrayBuffer = await imageBlob.arrayBuffer();
                const imageBase64 = btoa(
                    new Uint8Array(imageArrayBuffer)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
                return { ...product, image: imageUrl };
            } catch (error) {
                console.error('Error fetching image:', error);
                return { ...product, image: null };
            }
        }));
        return json({ data: productsWithImages });

    } catch (error) {
        console.error('Error fetching URL:', error);
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
};

export default function Filtros() {
    const { idVista, idMenu, idFiltros } = useParams();
    const { data } = useLoaderData<{ data }>();

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {data.map((item, index) => (
                    <div className="col" key={`productCard-${index}`}>
                        <div key={`cardProduct-${index}-${item["$id"]}`} className="card" style={{ width: "18rem" }}>
                            <img src={item.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.nombre}</h5>
                                <p className="card-text">{item.texto}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}