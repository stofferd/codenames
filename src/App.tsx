import "./App.css";
import { Route, Router, Switch } from "react-router-dom";
import Game from "./Components/Game";
import Home from "./pages/Home";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path={["/:id"]} component={Game} />
      </Switch>
    </Router>
  );
}

export default App;
