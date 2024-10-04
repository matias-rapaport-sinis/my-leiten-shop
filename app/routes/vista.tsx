import { useLoaderData, useParams } from "@remix-run/react";
import NavbarComponent from "~/components/Navbar";
import { json} from "@remix-run/react";
import type { LoaderFunctionArgs} from "@remix-run/node";

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

export default function templeteBasic() {
    const { idVista, idMenu } = useParams();
    const {data} = useLoaderData();

    return (
        <div className="container-fluid">
            <NavbarComponent  />
            <div className="row">
                <div className="col">
                    Recibi este idVista : {idVista || "vacio"}
                    Recivi este idMenu : {idMenu || "vacio"}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h3> {data.Title} </h3>
                    <pre>
                        {data.MenuItems.map((item, index)=>(
                            <p key={`menu-${index}`} > {item.Title} </p>
                        ))}
                    </pre>
                </div>
            </div>
        </div>
    );
}
