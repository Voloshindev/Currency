import React  from 'react'
import Alert from "../Alert/Alert"
import "./Alerts.css"

function Alerts(props) {
  if (Object.keys(props.alerts).length === 0) return null;
  return(
    <div className="Alerts">
      {Object.entries(props.alerts).map(([key, elem]) => <Alert
        ms={elem.ms}
        close={() => props.close(key)}
      >
        {elem.text}
      </Alert>)}
    </div>
  )
}

export default Alerts