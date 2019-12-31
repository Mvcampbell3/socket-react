import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Chat from './components/Chat';

import io from 'socket.io-client';

function App() {

  useEffect(() => {
    const socket = io('localhost:3001');

    socket.on('useable data', (data) => {
      console.log(data)
    })

  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/chat' component={Chat}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
