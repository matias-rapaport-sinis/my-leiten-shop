
export const getImageLoader = async (product: { id: string }) => {
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
};