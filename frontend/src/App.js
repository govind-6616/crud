import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./comp/home";
import Create from "./comp/Create";
import Update from "./comp/Update";

const App2=()=>{
    return(
        
     <BrowserRouter>
     <>
     <Switch>
     <Route path="/" exact component={Home}/>
     <Route path="/create" exact component={Create}/>
     <Route path="/update/:id" exact component={Update}/>
     </Switch>
     </>
     </BrowserRouter>
        
    )

}
export default App2;