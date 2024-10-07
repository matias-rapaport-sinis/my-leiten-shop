import { useNavigate } from "@remix-run/react"


export default function SeleccionUnica({ nombre, opciones }) {
    const navigate = useNavigate();

    const handleOnChange = (valor) => {
        navigate(`productos/${valor}`)
    }

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
                            <input type="radio" onChange={()=>(handleOnChange(valor.texto))} name={`grupo-${opciones["$id"]}`} value={valor.texto} />
                            {valor.texto}
                        </label>
                    ))}
                </div>
            </div>

        </div>
    )
}