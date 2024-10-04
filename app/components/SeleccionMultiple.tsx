export default function SeleccionMultiple({ nombre, opciones }) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h4>{nombre}</h4>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex flex-column" >
                    {opciones["$values"].map((valor, index) => (
                        <label>
                            <input type="checkbox" value={valor.texto} name="1" />
                            {valor.texto}
                        </label>
                    ))}
                </div>
            </div>

        </div>
    )
}