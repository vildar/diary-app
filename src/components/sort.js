import React, {Component} from 'react'
import '../styles/app.css'

class Sort extends Component{
    sortNote = (order) => {
        const notes = this.props.notes
        if(order === 'newest'){
            notes.sort(function(a,b){
            let dateA = new Date(a.date), dateB = new Date(b.date)
            if (dateA - dateB === 0){
                return -1
            }
            return dateB - dateA;
            });
        } else if(order === 'oldest'){
            notes.sort(function(a,b){
            let dateA = new Date(a.date), dateB = new Date(b.date)
            if (dateA - dateB === 0){
                return -1
            }
            return dateA - dateB;
            });
        }
        this.props.updateFilteredNotes(notes)
    }

    render(){
        return(
            <>
                <button className="sort-btn btn" onClick={() => this.sortNote('newest')}>Sort by Newest</button>
                <button className="sort-btn btn" onClick={() => this.sortNote('oldest')}>Sort by Oldest</button>
            </>
        )
    }
}

export default Sort