import { useState } from "react";


export default function SeleccionDeRango({ nombre, opciones, index, handleChangeAdd, handleChangeRemove }) {

    

    return (
        <div className="container" key={`seleccionUnica-${index}`}>
            <div className="row">
                <div className="col">
                    <h4>{nombre}</h4>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex flex-column" >
                    <label>
                        {opciones["$values"][1].texto}
                        <input
                            type="number"
                            onChange={(e) => (handleOnChangeMinValue(e, opciones["$values"][1].id))}
                            name={`grupo-${opciones["$id"]}`}
                        />
                    </label>
                    <label>
                        {opciones["$values"][0].texto}
                        <input
                            type="number"
                            onBlur={(e) => (handleOnChangeMaxValue(e, opciones["$values"][0].id))}
                            name={`grupo-${opciones["$id"]}`}
                        />
                    </label>
                    </div>
            </div>

        </div>
    )
}