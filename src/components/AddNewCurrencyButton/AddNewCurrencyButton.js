import React from 'react'
import "./AddNewCurrencyButton.css"

function AddNewCurrencyButton(props) {
  return(
    <button
      className="MainWindow-AddNewCurrencyButton AddNewCurrencyButton Currency Currencies-Currency Currency_color_green"
      onClick={props.changeState}
    >
      Добавить новую валюту
    </button>
  )
}

export default AddNewCurrencyButton;