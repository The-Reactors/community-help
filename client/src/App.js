import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Homepage from './pages/homepage';
import TicketCreationPage from "./pages/ticketCreationPage";

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
          </Switch>
        </Router>
    </div>
  );
}

export default App;
  