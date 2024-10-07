import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData, useParams } from "@remix-run/react"
import { getProductsLoader } from "~/loaders/getProductsLoader";


export const loader = getProductsLoader; 

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