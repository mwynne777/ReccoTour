import React, { useState, useContext } from 'react';
import { AutoComplete as AutoCompleteANTD, Avatar } from 'antd';
import { TourContext } from "../../store/TourStore";
import queryString from 'query-string'
const { Option } = AutoCompleteANTD;

export const AutoComplete = () => {

  const Tour = useContext(TourContext);
  const [autofillArtists, setAutofillArtists] = useState([]);

  const getAutocomplete = (value: any)  => {
    const params = {
      q: value,
      type: "artist",
      limit: 3
    };

    fetch(`https://api.spotify.com/v1/search/?${queryString.stringify(params)}`, {
      method: "GET",
      headers: new Headers({
        'Authorization': 'Bearer ' + Tour.token
      })
    })
    .then((response) => response.json())
    .then((data) => {
      setAutofillArtists(data.artists.items);
    })
    .catch((error) => {
      console.log('Error', error)
    });
  }

    const artistSelected = (value: any) => {
      var artistSelected = autofillArtists.filter(function (e)  {return e.id === value});
      Tour.addSelectedArtist([artistSelected[0]]);
    }

    const renderOption = (a: any) => {
      var imgSrc;
      if(a.images.length > 0) {
        imgSrc = a.images[0].url;
      } else {
        imgSrc = require("../../images/emptyAvatar.png");
      }
      return (
        <Option key={a.id} title={a.name} style={{width: "225px"}}>
          <div><Avatar src={imgSrc}/><div style={{lineHeight: "30px", display: "inline-block", marginLeft: "5px"}}>{a.name}</div></div>
        </Option>
      );
    }

  return (
    <>
      <AutoCompleteANTD 
          onChange={(value) => getAutocomplete(value)}
          onSelect={(value) => artistSelected(value)} 
          autoFocus
          allowClear
          dataSource={autofillArtists.map(renderOption)}
          placeholder="Search your favorite artists"
          optionLabelProp="text"
          style={{width: "225px", marginTop: "10px"}}
      />
    </>
  );
}