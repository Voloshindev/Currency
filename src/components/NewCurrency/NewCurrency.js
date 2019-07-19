import React, { Component } from 'react'
import "./NewCurrency.css"

class NewCurrency extends Component {

  constructor(props) {
    super(props);
    this.state = { value: this.props.selected || "BTC" };
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextProps.selected && nextProps.selected !== this.state.value)
      this.setState({value: this.props.selected})
  }

  handleChange = e => {
    this.setState({value: e.target.value})
  };

  render() {
    return(
      <div className="NewCurrency Currency Currencies-Currency Currency_color_yellow">
        <select value={this.state.value} onChange={this.handleChange} className="Currency-CurrencyElem">
          {this.props.allCurrencies.map(name => <option key={name}>{name}</option>)}
        </select>
        <button onClick={() => {this.props.addCurrency(this.state.value); this.props.deleteNewCurrency()}} className="Currency-AddButton Currency-CurrencyElem">
          {this.props.firstButtonText}
        </button>
        <button onClick={this.props.deleteNewCurrency} className="Currency-DeleteButton Currency-CurrencyElem">
          {this.props.secondButtonText}
        </button>
      </div>
    )
  }
}

export default NewCurrency;