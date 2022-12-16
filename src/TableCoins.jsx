import React from 'react'
import './TableCoins.css'
import CoinRow from './CoinRow'

export default function TableCoins({coins}) {//Se trae la propiedad coins
  return (
    <table className='table_coins'>
      <thead>
        <tr>
          <td>#</td>
          <td>Moneda</td>
          <td>Precio</td>
          <td>24h</td>
          <td>Vol. total</td>
          <td>Cap. mercado</td>
          <td>Últimos 7 días</td>
        </tr>
      </thead>

      <tbody>
        {/* .map para que recorra  el coin y el index y se le pasan los props donde la llave sera el 
        index y el indice sera +1 para que se vaya sumando y emepiece en 1 */}
        {coins.map((coin, index) => (
          <CoinRow coin={coin} key={index} index={index + 1}/>
        ))}
      </tbody>
    </table>
  )
}