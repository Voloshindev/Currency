import React, { Component } from 'react'
import MainWindow from "../MainWindow/MainWindow"
import Alerts from "../Alerts/Alerts"
import "./App.css"

class App extends Component {

  constructor(props) {
    super(props);
    this.allCurrencies = ['BTC', 'USD', 'ETH', 'RUB', 'JPY', 'EUR'];

    let ins = localStorage.getItem('in');
    try {
      ins = {name: ins};
    } catch {
      ins = {name: 'BTC'};
    }

    let outs = localStorage.getItem('out');
    try {
      outs = JSON.parse(outs);
      outs.forEach((elem, ind, arr) => {
        arr[ind] = [elem, 0];
      });
      outs = new Map(outs);
    } catch(e) {
      outs =  new Map([['RUB', 0]])
    }

    let alerts = {};
    Object.defineProperty(alerts, 'free', {configurable: true, writable: true, value: 0});

    this.state = {
      in: ins,
      out: outs,
      alerts
    };
  }

  updateData = data => {
    data.then(data => {
      this.setState({out: new Map(Object.entries(data))}, this.updateLocalStorageOut);
    }, () => {
      this.showAlert('Ошибка получения данных.', 3000)
    })
  };

  addCurrency = name => {
    this.setState({out: this.state.out.set(name, this.state.out.get(name) || 0)}, this.updateLocalStorageOut)
  };

  deleteCurrency = name => {
    let m = this.state.out;
    if (m.size > 1) {
      m.delete(name);
      this.setState({out: m}, this.updateLocalStorageOut)
    }
  };

  updateLocalStorageOut = () => { localStorage.setItem('out', JSON.stringify(Array.from(this.state.out.keys()))) };

  changeMainCurrencyName = name => {
    this.setState({in: {name}}, () => localStorage.setItem('in', name));
  };

  showAlert = (text, ms) => {
    let { alerts } = this.state;
    alerts[alerts.free++] = {text, ms};
    this.setState({alerts})
  };

  closeAlert = key => {
    let alerts = this.state.alerts;
    delete alerts[key];
    this.setState({alerts})
  };

  render() {
    return (
      <div className="App">
        <MainWindow
          in={this.state.in}
          out={this.state.out}
          updateData={this.updateData}
          allCurrencies={this.allCurrencies}
          addCurrency = {this.addCurrency}
          deleteCurrency = {this.deleteCurrency}
          changeMainCurrencyValue = {this.changeMainCurrencyValue}
          changeMainCurrencyName = {this.changeMainCurrencyName}
        />
        <Alerts alerts={this.state.alerts} close={this.closeAlert}/>
      </div>
    )
  }
}

export default App;