import * as React from 'react';
// import Button from 'antd/lib/button';
// import 'antd/lib/button/style/css';
import { Button } from 'antd';
import { Card } from 'antd';
import { Modal } from 'antd';
import './App.css';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
          <Card>
            <Button type="dashed">Dashed</Button>
            <Button type="danger">Danger</Button>
          </Card>
          <Modal />
        </div>
      </div>
    );
  }
}

export default App;
