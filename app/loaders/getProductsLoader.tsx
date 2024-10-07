import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getImageLoader } from "./getImageLoader";

export const getProductsLoader = async ({ params }: LoaderFunctionArgs) => {

    const { idVista, idMenu } = params;

    const arrayFilter = [{
        "key": "string",
        "value": "string"
    }]

    console.log(idVista, idMenu);
    try {
        const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetProductos?IdVista=${idVista}`, {
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
        const productsWithImages = await Promise.all(products['$values'].map(async (product: { id: string }) => (getImageLoader(product))));
        
        return json({ data: productsWithImages });

    } catch (error) {
        console.error('Error fetching URL:', error);
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
};