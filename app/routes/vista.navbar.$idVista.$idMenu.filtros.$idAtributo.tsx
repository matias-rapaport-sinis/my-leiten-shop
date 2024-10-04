import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";
import SeleccionMultiple from "~/components/SeleccionMultiple";
import SeleccionUnica from "~/components/SeleccionUnica";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { idAtributo } = params;

    try {
        const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetAtributos?IdVista=1&Id=CLS0001`, {
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
        console.log(data);
        return json({ data });

    } catch (error) {
        console.error('Error fetching URL:', error);
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
};

export default function NavbarVista() {
    const { data} = useLoaderData<{ data }>();

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        Esto es tus filtros     
                        {data["$values"].map((item, index)=>(
                            item.accion === "SeleccionMultiple" ? 
                            <SeleccionMultiple key={index} nombre={item["nombre"]} opciones={item["opciones"]} />
                            :
                            (item.accion === "SeleccionUnica" ?
                                <SeleccionUnica key={index} nombre={item["nombre"]} opciones={item["opciones"]} />
                                :
                                <p>{item.accion}</p>
                            )
                        ))}
                    </div>
                    <div className="col-9">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}