import { Switch } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/main.scss";
import "rsuite/dist/rsuite.min.css";
import Signin from "./pages/Signin";
import PrivateRoute from "./component/PrivateRoute";
import PublicRoute from "./component/PublicRoute";

function App() {
  return (
    <>
      <Switch>
        <PublicRoute path="/signin">
          <Signin />
        </PublicRoute>

        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default App;
