import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import SeleccionMultiple from "~/components/SeleccionMultiple";
import SeleccionUnica from "~/components/SeleccionUnica";
import { getAtributosLoader } from "~/loaders/getAtributosLoader";

export const loader = getAtributosLoader; 

export default function Temple(){
    const { data } = useLoaderData<{ data }>();
    const [filterSelected, setFilterSelected] = useState<{ key: string, value: any }[]>([]);

    const handleChangeAdd = (filtros: { key: string, value: any }) => {
        setFilterSelected(prev => {
            const newFilters = [...prev, filtros];
            console.log(newFilters);
            return newFilters;
        });
        console.log("paso");
    };
    
    const handleChangeRemove = (key: string, value: any) => {
        setFilterSelected(prev => {
            const newFilters = prev.filter(item => item.key !== key || item.value !== value);
            console.log(newFilters);
            return newFilters;
        });
        console.log("paso");
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                Esto es tus filtros     2
                    {data["$values"].map((item, index)=>(
                        item.accion === "SeleccionMultiple" ? 
                        <SeleccionMultiple 
                            key={`seleccionMultiple-${index}`} 
                            index={index} 
                            nombre={item["nombre"]} 
                            opciones={item["opciones"]} 
                            handleChangeAdd={handleChangeAdd}
                            handleChangeRemove={handleChangeRemove}
                            />
                        :
                        (item.accion === "SeleccionUnica" ?
                            <SeleccionUnica 
                                key={`seleccionUnica-${index}`} 
                                index={index} 
                                nombre={item["nombre"]} 
                                opciones={item["opciones"]} />
                            :
                            <p key={index}>{item.accion}</p>
                        )
                    ))}
                </div>
                <div className="col-9">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
