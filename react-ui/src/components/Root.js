import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Conditions from "./Conditions";
import Medications from "./Medications";
import { fetchCurrentUser } from "../redux/auth";
import DailyCheckin from "./DailyCheckin";
import SingleCondition from "./SingleCondition";
import Documents from "./Documents"
import SingleDocument from './SingleDocument'
import Profile from "./Profile"
import AllDoctors from "./AllDoctors"
import SingleDoctor from "./SingleDoctor";
import SingleMedication from "./SingleMedication";
import Navbar from "./Navbar";
import BarChartCondition from './BarChartCondition'
import LineChart from '../components/lineChart/LineChartCondition';
import AdminDashboard from './AdminDashboard';
import PageNotFound from './PageNotFound'


/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
  async componentDidMount() {
    try {
      await this.props.fetchInitialData();
    } catch (e) {
      console.log(e)
    }
  }
  render() {
    const { isLoggedIn, currentUser } = this.props;

    return (
      <>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />

        {isLoggedIn && (
          < Navbar />
        )}
        {/* This is on purpose since Switch only renders the first matched component and we don't need to render all of them at the same time except for Navbar */}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path='/' component={Home} />
            <Route exact path='/dailycheckin' component={DailyCheckin} />
            <Route exact path='/conditions' component={Conditions} />
            <Route exact path='/conditions/:id' component={SingleCondition} />
            <Route exact path="/medications" component={Medications} />
            <Route exact path="/medications/:id" component={SingleMedication} />
            <Route exact path="/doctors" component={AllDoctors} />
            <Route exact path="/doctors/:id" component={SingleDoctor} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/documents" component={Documents} />
            <Route exact path="/documents/:id" component={SingleDocument} />
            <Route exact path='/chart' component={BarChartCondition} />
            <Route exact path='/linechart' component={LineChart} />
            {/* Only for admin's eyes */}
            {currentUser.isAdmin && (
              <Route exact path='/admindashboard' component={AdminDashboard} />
            )}
            <Route component={PageNotFound} />
          </Switch>
        )}
      </ >
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.currentUser.id,
    currentUser: state.currentUser
  };
};
const mapDispatch = (dispatch) => ({
  fetchInitialData: () => {
    dispatch(fetchCurrentUser());
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Root));
