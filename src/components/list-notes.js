import React, {Component} from 'react'
import '../styles/list-notes.css'


class ListNotes extends Component{
  render(){
    const {notes, changeCurrentNote, deleteNote} = this.props
    
    return(
      <div>
        <h2 className="list-heading">Notes List</h2>
        <ol>
          { notes.map((note) => (
            <div className='list-item' key={ note.id }>
              <li>
                <a onClick={ () => changeCurrentNote(note) } >
                  {note.heading}
                </a>
                <button className='btn' onClick={() => deleteNote(note)}>Delete</button>
              </li>
            </div>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListNotes
