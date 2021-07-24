import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import HomePage from './HomePage';
import ListView from './ListView';
import DetailedView from './DetailedView';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/resources" component={ListView} />
          <Route exact={true} path="/resources/:id" component={DetailedView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;