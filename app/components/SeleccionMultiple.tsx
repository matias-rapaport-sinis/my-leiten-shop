
import  { useState } from 'react';

export default function SeleccionMultiple({ nombre, opciones, index }) {
    
    const [options, setOptions] = useState([]);

    const handleChange = (e, keySelected, valueSelected) => {
        const isChecked = e.target.checked;
        if (isChecked === false) {
            setOptions(options.filter(({key, value}) => key !== keySelected && value !== valueSelected));
        } else {
            setOptions([...options, {key: keySelected, value: valueSelected}]);
        }
    };

    return (
        <div className="container" key={`seleccionMultiple-${index}`}>
            <div className="row">
                <div className="col">
                    <h4>{nombre}</h4>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex flex-column" >
                    {opciones["$values"].map((valor, index) => (
                        <label key={`seleccionMultiple-${index}-${index}`}>
                            <input type="checkbox"   value={valor.texto} name="1" onChange={(e)=>{handleChange(e, valor.id, valor.texto)}} />
                            {valor.texto}
                        </label>
                    ))}
                </div>
            </div>

        </div>
    )
}
