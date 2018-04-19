
import React, { Component } from 'react'
import { Trash } from 'grommet-icons'
import localAPI from '../util/localAPI'

class TrashButton extends Component {
  trash = (itin_id) => {
    return localAPI.deleteItin(itin_id).then(() => {
      this.props.history.push('/viewall')
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    const theme = {
      icon: {
        color: 'white'
      }
    }
    return (
      <div className="trashDiv">
        <button className="trashButt" onClick={() => this.trash(this.props.itin_id)}><Trash theme={theme} /></button>
      </div>
    )
  }
}

export default TrashButton
