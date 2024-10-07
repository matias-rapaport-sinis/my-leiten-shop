import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import NavbarBaseComponent from "~/components/NavbarBase";

type Data = {
    Title: string;
    MenuItems: Array<{ id: number; name: string; }>;
};


export const loader = async ({ params }: LoaderFunctionArgs) => {
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
        return json({ data });

    } catch (error) {
        console.error('Error fetching URL:', error);
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
};


export default function TemplateBaseUNo(){
    const { data } = useLoaderData<{ data: Data }>();

    return (
        <div>
            <Outlet />
        </div>
    );
};