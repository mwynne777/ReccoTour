import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import "./App.css";
import { AutoComplete, Avatar, List } from 'antd';
import 'antd/dist/antd.css';
import emptyAvatar from "./images/emptyAvatar.png"

const { Option } = AutoComplete;

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      autofillNames: [],
      autofillArtists: [],
      autofillOptions: [],
      selectedArtists: [],
      relatedArtists: []
    };
    this.findRelatedArtists = this.findRelatedArtists.bind(this);
    this.findRelatedArtistsAPICall = this.findRelatedArtistsAPICall.bind(this);
    this.getAvatarFromArtist = this.getAvatarFromArtist.bind(this);
    this.setState = this.setState.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
  }

  getAutocomplete(value) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/search",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
      },
      data: {
        q: value,
        type: "artist",
        limit: 3
      },
      success: data => {
        this.setState({
          autofillNames: data.artists.items.map((item) => item.name),
          autofillArtists: data.artists.items
        });
      }
    });
  }

  renderOption(a) {
    var imgSrc;
    if(a.images.length > 0) {
      imgSrc = a.images[0].url;
    } else {
      imgSrc = emptyAvatar;
    }
    return (
      <Option key={a.id} text={a.name}>
        <div><Avatar src={imgSrc}/><div style={{lineHeight: "30px", display: "inline-block", marginLeft: "5px"}}>{a.name}</div></div>
      </Option>
    );
  }

  artistSelected(value) {
    var artistSelected = this.state.autofillArtists.filter(function (e)  {return e.id === value});
    this.setState({
      selectedArtists: this.state.selectedArtists.concat(artistSelected)
    });
  }

  findRelatedArtistsAPICall(id) {
    // Make a call using the token
    return $.ajax({
      url: "https://api.spotify.com/v1/artists/" + id + "/related-artists",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
      },
      success: data => {
        var relatedArtists = data.artists;
        return relatedArtists;
      }
    });
  }

  findRelatedArtists() {
    var apiCalls = [];
    for(let i = 0; i < this.state.selectedArtists.length; i++) {
      let id = this.state.selectedArtists[i].id;
      apiCalls[i] = this.findRelatedArtistsAPICall(id);
    }
    $.when.apply($, apiCalls)
    .then(function () {
      console.log(arguments);
      var relatedArtists = [];
      for(var i = 0; i < arguments.length; i++) {
        relatedArtists = relatedArtists.concat(arguments[i][0].artists.map((a)=>a.name));
      }
      this.setState({
        relatedArtists: [...new Set(relatedArtists)]
      });
    }.bind(this));
  }

  getAvatarFromArtist(a) {
    if(a.images.length > 0) {
      return a.images[0].url;
    }
    return emptyAvatar;
  }

  render() {
    return (
      <div className="App">
        {!this.state.token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {this.state.token && (
          <div>
            <AutoComplete 
              onChange={(value) => this.getAutocomplete(value)}
              onSelect={(value, option) => this.artistSelected(value, option)} 
              autoFocus
              allowClear
              dataSource={this.state.autofillArtists.map(this.renderOption)}
              placeholder="input here"
              optionLabelProp="text"
            >
            </AutoComplete>
            <div className="list-container">
              <List
                dataSource={this.state.selectedArtists}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={ <Avatar src={this.getAvatarFromArtist(item)} /> }
                      title={item.name}
                      description={item.genres.join(', ')}
                    />
                    <div>Content</div>
                  </List.Item>
                )}
              />
            </div>
            <button onClick={this.findRelatedArtists}>Find Related Artists</button>
            <button onClick={() => console.log(this.state.relatedArtists/*.map((a) => a.name)*/)}>Log Related Artists</button>
          </div>
          )}
      </div>
    );
  }
}

export default App;