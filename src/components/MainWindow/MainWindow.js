import React, {Component} from 'react'
import Currencies from "../Currencies/Currencies"
import RefreshButton from "../RefreshButton/RefreshButton"
import AddNewCurrencyButton from "../AddNewCurrencyButton/AddNewCurrencyButton";
import NewCurrency from "../NewCurrency/NewCurrency";
import Currency from "../Currency/Currency"
import "./MainWindow.css"

class MainWindow extends Component {

  constructor(props) {
    super(props);
    this.state = {inNew: false, outNew: false}
  };

  render() {
    return(
      <div className="MainWindow">
        {this.state.inNew ? <NewCurrency selected={this.props.in.name} firstButtonText="Изменить" secondButtonText="Отменить" allCurrencies={this.props.allCurrencies} addCurrency={this.props.changeMainCurrencyName} deleteNewCurrency={()=>this.setState({inNew: false})}/> : <Currency name={this.props.in.name} value="1" deleteCurrency={()=>this.setState({inNew: true})} buttonText="Изменить" onChange={(e) => this.props.changeMainCurrencyValue(e.target.value)}/> }
        <hr/>
        <Currencies currencies={this.props.out} deleteCurrency={this.props.deleteCurrency}/>
        {this.state.outNew ? <NewCurrency firstButtonText="Добавить" secondButtonText="Отменить" allCurrencies={this.props.allCurrencies} addCurrency={this.props.addCurrency} deleteNewCurrency={()=>this.setState({outNew: false})}/> : <AddNewCurrencyButton changeState={()=>this.setState({outNew: true})}/>}
        <hr/>
        <RefreshButton
          params={{fsym: this.props.in.name, tsyms: Array.from(this.props.out.keys())}}
          updateData={this.props.updateData}
          disabled={this.state.inNew}
        />
      </div>
    )
  }
}

export default MainWindow;