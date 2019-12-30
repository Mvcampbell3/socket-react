import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Chat from './components/Chat';

function App() {
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
