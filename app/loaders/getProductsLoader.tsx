import { json, LoaderFunctionArgs } from "@remix-run/node";

export const getProductsLoader = async ({ params }: LoaderFunctionArgs) => {
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