import { useParams } from "@remix-run/react";
import { json } from "@remix-run/react";
import type { LoaderFunctionArgs} from "@remix-run/node";

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    console.log(params.id);
    try{
        const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetMenu/IdVista/1/IdMenu/2`, {
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
        return json({ user: data });

    }catch(error){
        console.error(`Error fetching url :`, error);
        return null;
    }
    
    //const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.idUser}`);
    // Return the data using the `json` helper
};


export default function templeteBasic() {
    const { idVista, idMenu } = useParams();

    return (
        <div className="container-fluid">
            {/* <NavbarComponent  /> */}
            <div className="row">
                <div className="col">
                    Recibi este idVista : {idVista || "vacio"}
                    Recivi este idMenu : {idMenu || "vacio"}
                </div>
            </div>
        </div>
    );
}
