import React from "react";
import './playList.style.css';
import { TrackList } from "../tracklist/trackList.component";

export class PlayList extends React.Component {
    constructor (props) {
        super(props);
        this.handleOnChange= this.handleOnChange.bind(this)
    }

    handleOnChange(e) {
        const newName= e.target.value
        this.props.onNameChange(newName)
    }

    render() {
        return (
            <div className="Playlist">
                <input defaultValue={"New Playlist"} onChange={this.handleOnChange}/>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true }/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}