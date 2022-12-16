//COMPARACIÓN DE MONEDAS

import InputConvert from './InputConvert'
import './Convert.css'
import { FaExchangeAlt } from "react-icons/fa";
import {useState, useEffect} from 'react'//Importación desde la libreria de react


export default function Convert() {//Definir los estados
    const [coin, setCoin] = useState([])//El primero almacena todas las monedas
    const [selCoin1, setSelCoin1] = useState('btc')//Ayuda a leer la moneda seleccionada en el imput 1 y se le pasa el valor preseleccionado bitcoin
    const [selCoin2, setSelCoin2] = useState('eth')//En el tercero se pone como valor preseleccionado etherium
    const [mainTxt, setMainTxt] = useState(0)//El cuarto estado se pone el imput por defecto en un valor 0
    const [res, setRes] = useState(0)

    const getData = async () => {//Consumo de la API con getData y se define la constante response y se le pide que espere a que cargue la información y se copia el link de la API
       const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
       
       const json = await response.json() //Se guarda en una constante json

       setCoin(json)//Se guarda en su estado (setCoin) el json
    }

    useEffect(() => {//Se usa useEffect para que carguen la pagina cuando carguen los datos
        getData()
    }, [])

    useEffect(() => {//Se crean dos variables, se llama la propiedad coin y se utiliza el forEach donde se pasan las propiedades para que determine lo que se tenga seleccionado en cada input y se compare con el otro input
        let a, b
        coin.forEach(({symbol, current_price}) => {
            //Se utiliza un condicional para que en ambos inputs no aparezca la misma moneda y se puedan comparar ambas, en la primera varaible se almacena el numero que ingresa el usuario y lo multiplica por el precio actual, si no es se almacena el precio actual y no se modifica el valor. y si la primera variable tiene un valor diferente de 0 se dividira la variable 1 sobre la 2(las propiedades), 
            if (symbol == selCoin1) {
                a = mainTxt * current_price
            } else {
                b = current_price
            }
        })

        a ? setRes(a / b) : setRes(0)
    }, [mainTxt, selCoin1, selCoin2])

    return (
        <div className='contenedor'>
            <h2>Comparación de Monedas</h2>

            <div className='input-convert'>
                <InputConvert coin={coin} fun={setSelCoin1} other={selCoin2} text={setMainTxt} type={0}/>

                <FaExchangeAlt className="icono" />

                <InputConvert coin={coin} sel="eth" fun={setSelCoin2} other={selCoin1} result={res}/>
            </div>
        </div>
    )
}