import React from 'react'
import './CoinRow.css'
import {deleteDec, colorDec, numberF} from './App'//El numberF sirve para formatear los numeros
import Graph from './Graph'

export default function CoinRow({coin, index}) {//Se traen las propiedades de coin e index 
  return (
    <tr>
      {/* se trae el valor actual de cada moneda en dolares */}
      <td>{index}</td>
      {/* se trae el valor de 24 horas */}
      <td>
        <div className='coin_image_container'>
          {/* se trae la imagen, el nombre de la moneda */}
          <img src={coin.image} alt={coin.name} title={coin.name}/>
        </div>
      </td>
      {/* se trae la función del formato de numero y se pone el valor del dolar */}
      <td>{numberF.format(coin.current_price)} US$</td>
      {/* capitalización del mercado */}
      <td className={colorDec(coin.market_cap_change_percentage_24h)}>{deleteDec(coin.market_cap_change_percentage_24h, 2)}%</td>
      <td>{numberF.format(coin.total_volume)}US$</td>
      <td>{numberF.format(coin.market_cap)}US$</td>
      {/* se trae el grafico, se le pasa la moneda, los dias, el color y el porcentaje de los 7 ultimo dia */}
      <td><Graph coin={coin.id} days={7} color={colorDec(coin.market_cap_change_percentage_24h)}/></td>
    </tr>
  )
}