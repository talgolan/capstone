import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Medications from "./Medications";
// import Navbar from './Navbar'
// import Footer from './Footer'
import { fetchCurrentUser } from "../redux/auth";
import Navbar from "./Navbar";
import Footer from "./Footer";

/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar />
        </div>
        <div>
          <h1>This is the root</h1>

          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/medications" component={Medications} />
          {/* <Footer /> */}
        </div>
        <div>
          <Footer />
        </div>
      </Router>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null;

const mapDispatch = (dispatch) => ({
  fetchInitialData: () => {
    dispatch(fetchCurrentUser());
  },
});

export default connect(mapState, mapDispatch)(Root);
