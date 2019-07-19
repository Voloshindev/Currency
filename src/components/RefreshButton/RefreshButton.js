import React, { Component } from 'react'
import "./RefreshButton.css"

class RefreshButton extends Component {

  request = null;

  componentDidMount() {
    if (!this.props.disabled)
      this.handle()
  };

  componentDidUpdate(prevProps) {
    if (((prevProps.params.fsym !== this.props.params.fsym) || (prevProps.params.tsyms.length !== this.props.params.tsyms.length)) && !this.props.disabled) {
      this.handle();
    }
  }

  createURL = (params) => {
    const URL = "https://min-api.cryptocompare.com/data/price";
    let resWithParams = URL + "?";
    resWithParams += Object.keys(params).map(e => `${e}=${params[e]}`).join('&');
    return resWithParams;
  };

  refreshFetch = async (url) => {
    try {
      return await (await fetch(url)).json();
    } catch (e) {
      throw Error("Ошибка");
    }
  };

  refresh = (url) => {
    let self = this;
    if (this.request) {
      this.request.abort();
    }

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function() {
        self.request = null;
        resolve(JSON.parse(this.responseText));
      });

      xhr.addEventListener('error', () => {
        reject('Error');
      });

      xhr.open("GET", url, true);
      xhr.send();
      this.request = xhr;
    })
  };

  handle = () => {
    this.props.updateData(this.refreshFetch(this.createURL(this.props.params)))
  };

  render() {
    return <button
      onClick={this.handle}
      className={`MainWindow-AddNewCurrencyButton AddNewCurrencyButton Currency Currencies-Currency ${this.props.disabled ? 'RefreshButton_disabled' : 'Currency_color_blue'}`}>Обновить</button>
  }
}

export default RefreshButton;