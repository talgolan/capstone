import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
// import Navbar from './Navbar'
// import Footer from './Footer'
import { fetchCurrentUser } from '../redux/auth'
import Conditions from './Conditions';
import DailyCheckin from './DailyCheckin';
import SingleCondition from './SingleCondition';
/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
  componentDidMount() {
    this.props.fetchInitialData()
  }
  render() {
    return (
      <Router>
        <div>
          <h1>This is the root</h1>
          {/* <Navbar /> */}
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/dailycheckin' components={DailyCheckin} />
          <Route exact path='/conditions' component={Conditions} />
          <Route path='/conditions/:id' component={SingleCondition} />
          {/* <Footer /> */}
        </div>
      </Router>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchCurrentUser())
  }
})

export default connect(mapState, mapDispatch)(Root)
