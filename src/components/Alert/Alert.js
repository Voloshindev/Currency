import React, { Component } from 'react'
import "./Alert.css"

class Alert extends Component {

  componentDidMount() {
    if (this.props.ms !== null)
      setTimeout(this.props.close, this.props.ms);
  }

  render() {
    return <div className="App-Alert Alert">
      {this.props.children}
      <div className="Alert-closeButton" onClick={this.props.close}>
        &#10006;
      </div>
    </div>
  }
}

export default Alert