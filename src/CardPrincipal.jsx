
import './CardPrincipal.css'
import { FaPlay } from "react-icons/fa";
import { deleteDec, colorDec } from './App'//Importa las funciones de cambiar de color y de eliminar los decimales restantes
import Graph from './Graph'

export default function CardPrincipal({ json: { id, symbol, current_price, image,               price_change_percentage_1h_in_currency, price_change_percentage_24h_in_currency, price_change_percentage_7d_in_currency, price_change_percentage_30d_in_currency, price_change_percentage_1y_in_currency }, cur= 'usd'}) {//Se llama el json el cual es una lista de propiedades las cuales se sacan de la API, se llama el cur(divisa) y se le indica que por defecto siempre sera usd
    return (
        <>
            <article className="cripto-first">
                <div className="cripto-first">
                    {/* se llama la propiedad de la imagen de la divisa */}
                    <img src={image} alt="Icono de la cripto" />

                    {/*  se pasa las propiedades del  el current price y el cur */}
                    <h2>{symbol} - {current_price} {cur}</h2>

                    {/* recibe los valores de las propiedades de la función de cambio de color si es negativo o positivo y la información del mes y la función para que muestre el valor con dos decimales y que sea un porcentaje */}
                    <h2><FaPlay className={`icon-arrow ${colorDec(price_change_percentage_30d_in_currency)}`}/>{deleteDec(price_change_percentage_30d_in_currency, 2)}%</h2>
                </div>

                {/* se trae el grafico se pone el id */}
                <div className="graphic">
                    <Graph type={0} coin={id} currency={cur}/>
                </div>

                <div className="capitalization"> 
                    <h2>Capitalización</h2>

                    <table className="capitalization-table">
                        <thead>
                            <tr>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>1m</th>
                                <th>1y</th>
                            </tr>
                        </thead>

                        {/* se le pasa la propiedad de el porcentaje de 1 hora más los decimales que se quieren mostrar y el simbolo de porcentaje, también el de 1 dia, la de 7 dias, la de 1 mes y la de un año */}
                        <tbody>
                            <tr>
                                <td className={colorDec(price_change_percentage_1h_in_currency)}>{deleteDec(price_change_percentage_1h_in_currency, 2)} %</td>
                                <td className={colorDec(price_change_percentage_24h_in_currency)}>{deleteDec(price_change_percentage_24h_in_currency, 2)} %</td>
                                <td className={colorDec(price_change_percentage_7d_in_currency)}>{deleteDec(price_change_percentage_7d_in_currency, 2)} %</td>
                                <td className={colorDec(price_change_percentage_30d_in_currency)}>{deleteDec(price_change_percentage_30d_in_currency, 2)} %</td>
                                <td className={colorDec(price_change_percentage_1y_in_currency)}>{deleteDec(price_change_percentage_1y_in_currency, 2)} %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </>
    )
}