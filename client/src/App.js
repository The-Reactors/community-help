import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Homepage from './pages/homepage';
import TicketCreationPage from "./pages/ticketCreationPage";
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import LandingPage from "./pages/login/landingPage";

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact>
              <Homepage />
            </Route>
            <Route path="/createTicket">
              <TicketCreationPage/>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/landingPage">
              <LandingPage/>
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
  