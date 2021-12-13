
import './App.css';
import React from 'react';
import {Searchbar} from '../searchbar/searchbar.component'
import { SearchResult } from '../searchresult/searchResult.component'
import { PlayList } from '../playlist/playList.component';
import Spotify from '../../utils/spotify';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchResult: [],
      playListName: 'my playlist',
      playListTracks: []
    };
    this.addTracks = this.addTracks.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search=this.search.bind(this)
  }

  addTracks(track) {
      let tracks= this.state.playListTracks
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track)

    this.setState({
      playListTracks: tracks
    })
  }    

  removeTrack(track) {
    const rest = this.state.playListTracks.filter(savedTrack => savedTrack.id !== track.id);
        this.setState({
      playListTracks: rest
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playListName:name
    })
  }

  savePlaylist() {
    const trackURIs = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playListName, trackURIs).then(() => {
      this.setState({
        playListName: 'New Playlist',
        playListTracks:[]
      })
    })
  }

  search(str) {
    Spotify.search(str).then(searchResult => {
      this.setState({
         searchResult: searchResult
       })
     })
    
}

  render(){
  return (
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
        <Searchbar onSearch={this.search }/>
    <div className="App-playlist">
          <SearchResult searchResult={this.state.searchResult} onAdd={ this.addTracks}/>
        
          <PlayList
            name={this.state.playListName}
            onRemove={this.removeTrack}
            playlistTracks={this.state.playListTracks}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist }/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
