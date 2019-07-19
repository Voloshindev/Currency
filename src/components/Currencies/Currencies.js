import React from 'react'
import Currency from "../Currency/Currency";
import "./Currencies.css"

function Currencies(props) {
  return(
    <>
      {Array.from(
        props.currencies.keys(),
        name => {return <Currency key={name} name={name} value={props.currencies.get(name)} deleteCurrency={props.deleteCurrency} buttonText="Удалить"/>
      })}
    </>
  )
}

export default Currencies;