import React, { Component } from 'react';
import Note from './note'
import ListNotes from './list-notes'
import Filter from './filter'
import Sort from './sort'
import '../styles/app.css';
import {generateUID} from '../utils/api'
import {Container, Row, Col} from 'react-bootstrap'

class App extends Component {
  state = {
    currentNote: null,
    notes: [],
    filteredNotes: [],
    view: false,
  }

  changeCurrentNote = (note) =>{
    this.setState({ currentNote: note })
    this.toggleView()
  }

  deleteNote = (note) =>{
    this.setState((state) => ({ 
      notes: state.notes.filter(noteIterator => (noteIterator.id !== note.id)),
    }))
    this.setState({ currentNote: null, filteredNotes: this.state.notes })
  }

  saveNote = (note) =>{
    this.setState((state) => { state.notes.concat([note]) })
    this.setState({ currentNote: note, filteredNotes: this.state.notes })
    this.toggleView()
  }

  addNew = () =>{
    const note = {id: generateUID(), heading: '', value: ' '}
    this.setState((state) => ({ notes: state.notes.concat([note]) }))
    this.setState({ currentNote: note, filteredNotes: this.state.notes })
    this.toggleView()
  }

  updateFilteredNotes = (filteredNotes) => {
    this.setState({
      filteredNotes
    })
  }

  toggleView = () => {
    this.setState({
      view: !this.state.view
    })
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          Diary App
        </div>
        
        <Container>
          <Row>
            <Col>
              <Sort notes={this.state.notes} updateFilteredNotes={this.updateFilteredNotes}/>
            </Col>
            <Col>
              <button className='add-note btn' onClick={this.addNew}>Add Note</button>
            </Col>
            <Col>
              <Filter notes={this.state.notes} filteredNotes={this.state.filteredNotes} updateFilteredNotes={this.updateFilteredNotes}/>
            </Col>
          </Row>
        </Container>
        
        <ListNotes notes={this.state.filteredNotes} changeCurrentNote={this.changeCurrentNote} deleteNote={this.deleteNote} />
        {( this.state.currentNote !== null && this.state.view ) && ( <Note note={this.state.currentNote} saveNote={this.saveNote}/> )}
      </div>
    );
  }
}

export default App;