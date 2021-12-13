import React from "react";
import './tracklist.style.css'
import { Track } from "../Track/track.component";

export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => {
                    return <Track
                       onAdd={this.props.onAdd}
                        track={track}
                        id={track.id}
                        onRemove={this.props.onRemove}
                        isRemoval={this.props.isRemoval}
                    />
                })
                }
                </div>
        )
    }
}