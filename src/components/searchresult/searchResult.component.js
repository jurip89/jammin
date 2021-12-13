import React from "react";
import './searchresult.style.css';
import { TrackList } from "../tracklist/trackList.component";

export class SearchResult extends React.Component {
    
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList onAdd={this.props.onAdd} isRemoval={false} tracks={this.props.searchResult }/>

            </div>
        )
    }
}