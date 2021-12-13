import React from "react";
import './searchbar.style.css'

export class Searchbar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            str:''
        }
        this.search = this.search.bind(this);
        this.handleStrChange = this.handleStrChange.bind(this)
    }
    search() {
    this.props.onSearch(this.state.str)
    }

    handleStrChange(e) {
        
        this.setState({
            str : e.target.value    
        })
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist"  onChange={this.handleStrChange}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}