import React from 'react'
import "./Currency.css"

function Currency(props) {
  return(
    <div className="Currency Currencies-Currency">
      <div className="Currency-CurrencyName Currency-CurrencyElem">{props.name}</div>
      <input className="CurrencyInput Currency-CurrencyElem Currency-CurrencyInput" value={props.value}/>
      <button className="Currency-CurrencyElem Currency-CurrencyButton" onClick={() => props.deleteCurrency(props.name)}>{props.buttonText}</button>
    </div>
  )
}

export default Currency;