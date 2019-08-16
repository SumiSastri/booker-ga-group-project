import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/auth'

class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      userCurrent: ''
    }

    this.logout = this.logout.bind(this)

  }

  logout() {
    Auth.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <nav className="navbar is-info is-fixed-top">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item"><img className="bookerLogo" src="http://www.orjon.com/dev/booker/images/logo/bookerLogo.png"/></Link>
          {!Auth.isAuthenticated() && <Link to="/about" className="navbar-item">About</Link>}
          <Link to="/books" className="navbar-item">Books</Link>
          <Link to="/libraries" className="navbar-item">Libraries</Link>
          {Auth.isAuthenticated() && <Link to="/loans" className="navbar-item">Loans</Link>}
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            {Auth.isAuthenticated() && <Link to="/users" className="navbar-item">My Profile</Link>}
            {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item">Login/Register</Link>}
            {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.logout}>Logout</a>}
          </div>

        </div>

      </nav>
    )
  }
}

export default withRouter(Nav)
