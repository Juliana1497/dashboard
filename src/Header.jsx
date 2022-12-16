import React from 'react'
import './Header.css'

export default function Header({currencys, fun, cur}) {//Los props seran 3
    return (
        // se la pasa el value de cur se llama con un DOM el select y retorna el value
        <header className='app-header'>
            <p>Crypto Stadistics</p>

            <div className='select-button'>
            <select value={cur} name="coinSelect" id="coinSelect" onChange={_ => {fun(document.getElementById("coinSelect").value)}}>
                {/* Recorre toda la lista de currencys, la llave sera el index el cual sera la posición en el array y el item sera la moneda */}
            {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
            </div>

            <button className='toogleMode'>
                
            </button>
        </header>
    )
}