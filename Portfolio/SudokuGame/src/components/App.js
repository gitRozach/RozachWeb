import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Help extends Component {
  render() {
    return (
      <div>
        <input type="text" label="Help"/> 
      </div>
    );
  }
}
ReactDOM.render(     
  <Help />,
  document.getElementById('Help-modal')        
);