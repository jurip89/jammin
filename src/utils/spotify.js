
let accessToken;

const clientID = '754256a6293c4a30ab43f1d8c6cfe9c2'

const redirectURI = "http://gianfranco-fini.surge.sh/"

const Spotify = {
    getAccessToken() {
        if (accessToken) {
          return accessToken
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiryMatch = window.location.href.match(/expires_in=([^&]*)/);
         if(accessTokenMatch && expiryMatch){
             accessToken = accessTokenMatch[1];
             const expiresIn = Number(expiryMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location= `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    },
    search(str) {
        const token = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${str}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                uri: track.uri,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name
            }))
        }) 
    },
    savePlaylist(name, uris) {
        if (!name || !uris.length) {
            return;
        }
        const token = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${token}` };
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers: headers }).then(res => {
            return res.json()
        }).then(jsonRes => {
            userId = jsonRes.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name:name})
            }).then(res => {
                return res.json();
            }).then(jsonRes => {
                const playlistId = jsonRes.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris:uris})
                })
            })
        })
    }
}


export default Spotify