import React, { Component } from 'react'
import '../styles/note.css'
import {Card} from 'react-bootstrap'

class Note extends Component{

  componentWillReceiveProps(nextProps) {
    const newProps = nextProps
    this.textInput.value = newProps.note.heading
    this.textAreaInput.value = newProps.note.value
    this.dateInput.value = newProps.note.date
  }

  save = (note) => {
    note.heading = this.textInput.value
    note.value = this.textAreaInput.value
    note.date = this.dateInput.value
    note.time = new Date().getTime()
    this.props.saveNote(note)
  }

  render(){
    const { note } = this.props
    return(
      <div className="note-card">
        <Card className="card">
          <Card.Body>
            <form>
              <Card.Title>
                <input defaultValue={ note.heading } type='text' placeholder='Note Title' ref={(input) => { this.textInput = input }} required/>
              </Card.Title>
              <Card.Text>
                <textarea defaultValue={ note.value } maxLength="250" ref={(input) => { this.textAreaInput = input}} required/>
              </Card.Text>
              <Card.Text>
                <input defaultValue={ note.date } type="date" ref={(input) => { this.dateInput = input}} required/>
              </Card.Text>
            </form>
          </Card.Body>
          <Card.Body>
            <button className="btn" onClick={() => this.save(note)}>Add</button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Note
