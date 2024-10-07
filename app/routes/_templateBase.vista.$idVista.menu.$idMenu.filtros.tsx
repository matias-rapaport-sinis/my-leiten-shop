import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useState } from "react";
import SeleccionMultiple from "~/components/SeleccionMultiple";
import SeleccionUnica from "~/components/SeleccionUnica";
import { getAtributosLoader } from "~/loaders/getAtributosLoader";

export const loader = getAtributosLoader; 

export default function Temple(){
    const { data } = useLoaderData<{ data }>();
    const {idVista, idMenu, idFiltros} = useParams();
    const [filterSelected, setFilterSelected] = useState<{ key: string, value: any }[]>([]);
    const navigate = useNavigate();


    const updateNavigation = (filters: { key: string, value: any }[]) => {
        const listOfFiltros = JSON.stringify(filters); 
        navigate(`productos/${listOfFiltros}`);
    };

    const handleChangeAdd = (filtros: { key: string, value: any }) => {
        setFilterSelected(prev => {
            const newFilters = [...prev, filtros];
            console.log(newFilters);
            updateNavigation(newFilters);
            return newFilters;
        });
    };
    
    const handleChangeRemove = (key: string) => {
        setFilterSelected(prev => {
            const newFilters = prev.filter(item => item.key !== key);
            console.log(newFilters);
            updateNavigation(newFilters);
            return newFilters;
        });
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
                                opciones={item["opciones"]} 
                                handleChangeAdd={handleChangeAdd}
                                handleChangeRemove={handleChangeRemove}
                                />
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
