//Compara las monedas

import React, {useState, useRef} from 'react'//El useRef ayuda a tomar refencia de losdatos a traer de la API
import './Convert.css'
import {deleteDec} from './App'

export default function InputConvert({coin, sel="btc", fun, other, text, type = 1, result = 0}) {//Se le pasa los props que se usaron en convert.jsx

  const selRef = useRef(null)//Se el pasa una constante para definir el useRef que tendra un valor nulo
  const [selVal, setSelVal] = useState(sel)

  return (
    <>
      <div className='input'>
        {/* Si el prop type es  igual a 0 se le pasa el input y se le pone una función de tipo texto en 
        donde se pasa un parse int para que se convierta en 0. Si es diferente a 0 se le pasa otro input 
        se le pasa la función de deleteDec para que elimine los decimales restantes */}
        {(type == 0) ? <input type="number" placeholder="0" onChange={e => {text(parseInt(e.target.value))}}/> : <input type="number" placeholder="0" value={deleteDec(result, 4)} readOnly={true}/>}
        {/* readOnly es una propiedad de react html que pasa valores booleanos para mostrar si el valor 
        es falso o verdadero */}

        <div className='select'>
          <img src="" alt="" />

          {/* se pasa información para que detecte la moneda que se esta eligiendo */}
          <select value={selVal} ref={selRef} onChange={() => {
            setSelVal(selRef.current.value)
            fun(selRef.current.value)
          }}>

          {/* Se usa el .map para que traiga el simbolo y si es simbolo es igual al valor traera con la 
          llave que sera el id de la moneda el siembolo y si no es traerael nombre */}
          {coin.map((co) => {
            if(co.symbol === selVal) {
              selRef.current.previousSibling.src = co.image
              return <option value={co.symbol} key={co.id}>{co.symbol}</option>
            } else if (co.symbol != other) {
              return <option value={co.symbol} key={co.id}>{co.name}</option>
            }
          })}
          </select>
        </div>
      </div>
    </>
  )
}