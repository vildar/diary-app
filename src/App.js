import React, { Component } from 'react';
// import {Collapse} from 'react-collapse'
import Note from './note'
import ListNotes from './list-notes'
import Filter from './filter'
import Sort from './sort'
import './app.css';
import {getWeek, generateUID} from './utils/api'
import {Container, Row, Col} from 'react-bootstrap'

class App extends Component {
  state = {
    currentNote: null,
    notes: [],
    filteredNotes: [],
    // isButtonCollapseOpen: false,
    // yearFilter: 2020,
    // monthFilter: 1,
    // weekFilter: 1,
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

  // sortNote = (order) => {
  //   const notes = this.state.notes
  //   if(order === 'newest'){
  //     notes.sort(function(a,b){
  //       let dateA = new Date(a.date), dateB = new Date(b.date)
  //       if (dateA - dateB === 0){
  //         return -1
  //       }
  //       return dateB - dateA;
  //     });
  //   } else if(order === 'oldest'){
  //     notes.sort(function(a,b){
  //       let dateA = new Date(a.date), dateB = new Date(b.date)
  //       if (dateA - dateB === 0){
  //         return -1
  //       }
  //       return dateA - dateB;
  //     });
  //   }
  //   this.setState({
  //     notes
  //   })
  // }

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

  // handleFilterOff = () => {
  //   const notes = this.state.notes
  //   this.setState({filteredNotes: notes})
  // }

  // onClick = () => {
  //   this.setState({
  //     isButtonCollapseOpen: !this.state.isButtonCollapseOpen
  //   })
  // }

  // handleYearChange = (e) => {
  //   this.setState({yearFilter: e.target.value});
  // }

  // handleMonthChange = (e) => {
  //   this.setState({monthFilter: e.target.value});
  // }

  // handleWeekChange = (e) => {
  //   this.setState({weekFilter: e.target.value});
  // }

  // filterYear = () => {
  //   let notes = this.state.notes
  //   let filteredNotes = notes.filter((note) => parseInt(note.date.split('-')[0], 10) == this.state.yearFilter)
  //   this.setState({ filteredNotes })
  // }

  // filterMonth = () => {
  //   let notes = this.state.notes    
  //   let filteredNotes = notes.filter((note) => parseInt(note.date.split('-')[1], 10) == this.state.monthFilter)
  //   this.setState({ filteredNotes })
  // }

  // filterWeek = () => {
  //   let notes = this.state.notes, date
    
  //   notes.forEach((note) => {
  //     date = new Date(note.date)
  //     note.weekNumber = getWeek(date)
  //   })

  //   let filteredNotes = notes.filter((note) => parseInt(note.weekNumber, 10) == this.state.weekFilter)
  //   this.setState({ filteredNotes })
  // }

  render() {
    // let isButtonCollapseOpen = this.state.isButtonCollapseOpen

    return (
      <div className="App">
        <div className="header">
          Diary App
        </div>
        <Container>
          <Row>
            <Col>
              <Sort notes={this.state.notes} updateFilteredNotes={this.updateFilteredNotes}/>
              {/* <button className="sort-btn btn" onClick={() => this.sortNote('newest')}>Sort by Newest</button>
              <button className="sort-btn btn" onClick={() => this.sortNote('oldest')}>Sort by Oldest</button> */}
            </Col>
            <Col>
              <button className='add-note btn' onClick={this.addNew}>Add Note</button>
              {/* <button className='add-note btn' onClick={this.setState({view: !this.state.view})}>Toggle Notes</button> */}
            </Col>
            <Col>
              <Filter notes={this.state.notes} filteredNotes={this.state.filteredNotes} updateFilteredNotes={this.updateFilteredNotes}/>
              {/* <button className="btn" onClick={this.onClick}>Filter</button>
              <button className="btn" onClick={this.handleFilterOff}>Filter Off</button>
                <Collapse isOpened={isButtonCollapseOpen}>
                    <div class="filter">
                      <input type="number" min="2020" max="2100" placeholder="YYYY" value={this.state.yearFilter} onChange={(e) => this.handleYearChange(e)}/>
                      <button className="filter-btn" onClick={() => this.filterYear()}>Filter by year</button>
                    </div>
                    
                    <div class="filter">
                      <input type="number" min="1" max="12" placeholder="MM" value={this.state.monthFilter} onChange={(e) => this.handleMonthChange(e)}/>
                      <button className="filter-btn" onClick={() => this.filterMonth()}>Filter by month</button>
                    </div>
                    
                    <div class="filter">
                      <input type="number" min="1" max="52" placeholder="WW" value={this.state.weekFilter} onChange={(e) => this.handleWeekChange(e)}/>
                      <button className="filter-btn" onClick={() => this.filterWeek()}>Filter by week</button>
                    </div>
                </Collapse> */}
            </Col>
          </Row>
        </Container>
        <div>
          <div>
            <ListNotes notes={this.state.filteredNotes} changeCurrentNote={this.changeCurrentNote} deleteNote={this.deleteNote} />
          </div>
          <div>
            {( this.state.currentNote !== null && this.state.view ) && ( <Note note={this.state.currentNote} saveNote={this.saveNote}/> )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;