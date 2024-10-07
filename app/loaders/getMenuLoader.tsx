import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getImageLoader } from "./getImageLoader";

export const getMenuLoader = async ({ params }: LoaderFunctionArgs) => {
    const { idVista, idMenu } = params;

    try {
        const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetMenu/IdVista/${idVista}/IdMenu/${idMenu}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '12345'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const menuList = data.MenuItems;
        
        const menuWithImages = await Promise.all(menuList.map(async (item) => {
            if (item.hasOwnProperty('MenuItems')) {
                item.MenuItems = await Promise.all(item.MenuItems.map(async (subItem) => {
                    const image = await getImageLoader({ id: subItem.id });
                    return { ...subItem, image };
                }));
            }
            return item;
        }));

        return json({ data });

    } catch (error) {
        console.error('Error fetching URL:', error);
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
};