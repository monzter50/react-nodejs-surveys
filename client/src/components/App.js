import React,{useEffect} from "react";
import { BrowserRouter as Router,Route, Switch } from "react-router-dom";
import store from "../redux/store";
import {
    fetchUser,
} from "../redux/actions/index";
import Protected from "./routes/Protected";
import Public from "./routes/Public";
import Dashboard from "./Pages/Dashboard";
import Landing from "./Pages/Landing";
import Payments from './Pages/Payments';
import Page404 from "./Pages/Page404";
import Header from './Pages/Header';


const App = ({match}) =>{
    useEffect(() => {
    store.dispatch(fetchUser());
  }, [match])
 return (
  <Router>
    <Header/>
    <Switch>
      <Protected path="/surveys" exact component={Dashboard}/>
      {/* <Protected path="/surveys/news"  component={Payments}/> */}
      <Public path="/" exact component={Landing}/>
      <Route component={Page404}/>
    </Switch>
  </Router>
)
}

export default App;