import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import OtherPage from "./Pages/OtherPage";
import Fib from "./components/Fib";
class App extends Component {
  render() {
    return (
      <Router>
        <header>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route exact path="/otherpage" component={OtherPage} />
        </div>
      </Router>
    );
  }
}
export default App;
