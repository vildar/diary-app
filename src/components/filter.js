import React, {Component} from 'react'
import {Collapse} from 'react-collapse'
import {getWeek} from '../utils/api'
import '../styles/app.css'

class Filter extends Component{
    state = {
        isButtonCollapseOpen: false,
        yearFilter: 2020,
        monthFilter: 1,
        weekFilter: 1,
    }

    handleFilterOff = () => {
        const notes = this.props.notes
        this.props.updateFilteredNotes(notes)
    }

    onClick = () => {
        this.setState({
            isButtonCollapseOpen: !this.state.isButtonCollapseOpen
        })
    }

    handleYearChange = (e) => {
        this.setState({yearFilter: e.target.value});
    }

    handleMonthChange = (e) => {
        this.setState({monthFilter: e.target.value});
    }

    handleWeekChange = (e) => {
        this.setState({weekFilter: e.target.value});
    }

    filterYear = () => {
        let notes = this.props.notes
        let filteredNotes = notes.filter((note) => parseInt(note.date.split('-')[0], 10) == this.state.yearFilter)
        this.props.updateFilteredNotes(filteredNotes)
    }

    filterMonth = () => {
        let notes = this.props.notes    
        let filteredNotes = notes.filter((note) => parseInt(note.date.split('-')[1], 10) == this.state.monthFilter)
        this.props.updateFilteredNotes(filteredNotes)
    }

    filterWeek = () => {
        let notes = this.props.notes, date
        
        notes.forEach((note) => {
            date = new Date(note.date)
            note.weekNumber = getWeek(date)
        })

        let filteredNotes = notes.filter((note) => parseInt(note.weekNumber, 10) == this.state.weekFilter)
        this.props.updateFilteredNotes(filteredNotes)
    }

    render(){
        let isButtonCollapseOpen = this.state.isButtonCollapseOpen

        return(
            <>
                <button className="btn" onClick={this.onClick}>Filter</button>
                <button className="btn" onClick={this.handleFilterOff}>Filter Off</button>
                <Collapse isOpened={isButtonCollapseOpen}>
                    <div className="filter">
                        <input type="number" min="2020" max="2100" placeholder="YYYY" value={this.state.yearFilter} onChange={(e) => this.handleYearChange(e)}/>
                        <button className="filter-btn" onClick={() => this.filterYear()}>Filter by year</button>
                    </div>
                    
                    <div className="filter">
                        <input type="number" min="1" max="12" placeholder="MM" value={this.state.monthFilter} onChange={(e) => this.handleMonthChange(e)}/>
                        <button className="filter-btn" onClick={() => this.filterMonth()}>Filter by month</button>
                    </div>
                    
                    <div className="filter">
                        <input type="number" min="1" max="52" placeholder="WW" value={this.state.weekFilter} onChange={(e) => this.handleWeekChange(e)}/>
                        <button className="filter-btn" onClick={() => this.filterWeek()}>Filter by week</button>
                    </div>
                </Collapse>
            </>
        )
    }

}

export default Filter