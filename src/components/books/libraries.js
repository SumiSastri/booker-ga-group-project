import React from 'react'
import axios from 'axios'

import LibrariesMap from './librariesMap'
import Auth from '../../lib/auth'

class Libraries extends React.Component {
  constructor() {
    super()

    this.state = {
      center: {
        lat: 51.515447,
        lng: -0.071510
      }
    }
  }

  componentDidMount() {
    {Auth.getPayload().sub && this.getUserLocation()}
    axios.get('/api/libraries')
      .then(res => {
        this.setState({ libraries: res.data })
      })
      .catch(err => console.log(err))
  }

  displayLibraryInfo() {
    this.state.libraries
  }

  getUserLocation() {
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => {
        const center = { lat: res.data.location.lat,
          lng: res.data.location.lng }
        this.setState({ center: center })
      })
  }


  render() {
    if (!this.state.libraries) return null
    const { center, libraries } = this.state
    return (
      <div>
        <LibrariesMap
          center={center}
          libraries={libraries}
          currentUserId={Auth.getPayload().sub}
        />
      </div>
    )
  }
}

export default Libraries
