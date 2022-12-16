import './Card.css'
import {colorDec} from './App'
import Graph from './Graph'

export default function Card({price, porcentaje, img, coinId, cur}) {//Se asignan las propiedades que espera recibir desde la API
    return (
        <div className="card">
            {/* se llama la propiedad de img que es la imagen de la criptomoneda */}
            <img src={img} alt="" />

            <div className="con-main">
                <div className="con-title">
                    {/* se le pasa la función para saber el color si es positivo o es negativo, el porcentaje y el price */}
                    <h2 className={`price ${colorDec(porcentaje)}`}> {price} </h2>
                    {/* se ejecuta la función del porcentaje y la del color si es negativo o positivo y se muestra el simbolo de porcentaje */}
                    <h4 className={`porcentaje ${colorDec(porcentaje)}`}>{porcentaje}%</h4>
                </div>
                {/* ponemos las propiedades coin, currrency y el color */}
                <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)}/>
            </div>
        </div>
    )
}