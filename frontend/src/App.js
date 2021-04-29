import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import StockManagement from './StockManagement';
import News from './News';
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
          <Route path="/stockmanagement">
            <StockManagement></StockManagement>
          </Route>
          <Route path="/news">
            <News></News>
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
