import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Homepage from './pages/homepage';
import TicketCreationPage from "./pages/ticketCreationPage";
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import MyTickets from "./pages/myTickets";
import Navbar from "./components/navbar";


function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact>
              <Homepage />
            </Route>
            <Route path="/createTicket">
            <Navbar>
                <TicketCreationPage />
              </Navbar>
            </Route>
            <Route path="/login">
              <Navbar>
                <Login />
              </Navbar>
            </Route>
            <Route path="/register">
              <Navbar>
                <Register />
              </Navbar>
            </Route>
            <Route path="/myTickets">
              <Navbar>
                <MyTickets />
              </Navbar>
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
  