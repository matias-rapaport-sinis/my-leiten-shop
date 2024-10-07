import { useState } from "react";


export default function SeleccionDeRango({ nombre, opciones, index, handleChangeAdd, handleChangeRemove }) {

    const [maxValue, setMaxValue] = useState(100000);
    const [minValue, setMinValue] = useState(0);

    const handleOnChangeMaxValue = (e, keySelected) => {
        setMaxValue(e.target.value);
        handleChangeRemove(keySelected);
        handleChangeAdd({ key: keySelected, value: e.target.value });
    }

    const handleOnChangeMinValue = (e, keySelected) => {
        setMinValue(e.target.value);
        handleChangeRemove(keySelected);
        handleChangeAdd({ key: keySelected, value: e.target.value });
    }


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
                        {opciones["$values"][1].texto} : {minValue}
                        <input
                            type="range"
                            className="form-range"
                            min="0"
                            max={maxValue}
                            step="1"
                            id="customRange2"
                            onChange={(e) => (handleOnChangeMinValue(e, opciones["$values"][1].id))}
                        />
                    </label>
                    <label>
                        {opciones["$values"][0].texto} : {maxValue}
                        <input
                            type="range"
                            className="form-range"
                            min={minValue}
                            max="10000"
                            step="1"
                            id="customRange3"
                            onChange={(e) => (handleOnChangeMaxValue(e, opciones["$values"][0].id))}
                        />
                    </label>
                </div>
            </div>

        </div>
    )
}