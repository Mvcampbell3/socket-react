import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Chat from './components/Chat';

function App() {

  const [room, setRoom] = useState('');

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact render={props => <Home {...props} setRoom={setRoom} />}></Route>
          <Route path='/chat' exact render={props => <Chat {...props} room={room} />}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
