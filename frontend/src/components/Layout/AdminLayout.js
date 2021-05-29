import React from "react";
import {
  Route,
  Switch,
  withRouter,
  
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";



import AddForm from "../../pages/item/form/AddForm";
import EditForm from "../../pages/item/form/EditForm";
import item from "../../pages/item";

function AdminLayout(props) {
  var classes = useStyles();

  // global

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
         
            <div className={classes.fakeToolbar}  />
              <Switch>
              <Route path="/admin/item/add" component={AddForm} />
                <Route path="/admin/item/edit/:id" component={EditForm} />

                <Route exact path="/admin/item/" component={item} />

              </Switch>
        </>
    </div>
  );
}

export default withRouter(AdminLayout);
