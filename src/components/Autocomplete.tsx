import React, { useState, useEffect, useContext } from 'react';
import { AutoComplete as AutoCompleteANTD, Avatar } from 'antd';
import { TourContext } from "../store/TourStore";
import emptyAvatar from "../images/emptyAvatar.png";
import * as $ from "jquery";
const { Option } = AutoCompleteANTD;

export const AutoComplete = () => {

    const Tour = useContext(TourContext);

    const getAutocomplete = (value: any)  => {
        $.ajax({
          url: "https://api.spotify.com/v1/search",
          type: "GET",
          beforeSend: xhr => {
            xhr.setRequestHeader("Authorization", "Bearer " + Tour.token);
          },
          data: {
            q: value,
            type: "artist",
            limit: 3
          },
          success: data => {
            Tour.setTourFields({
                autofillNames: data.artists.items.map((item: any) => item.name),
                autofillArtists: data.artists.items
            });
          }
        });
      }

      const artistSelected = (value: any) => {
        var artistSelected = Tour.autofillArtists.filter(function (e)  {return e.id === value});
        Tour.setTourFields({
            selectedArtists: Tour.selectedArtists.concat(artistSelected)
        });
      }

      const renderOption = (a: any) => {
        var imgSrc;
        if(a.images.length > 0) {
          imgSrc = a.images[0].url;
        } else {
          imgSrc = emptyAvatar;
        }
        return (
          <Option key={a.id} title={a.name}>
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
                dataSource={Tour.autofillArtists.map(renderOption)}
                placeholder="input here"
                optionLabelProp="text"
            />
        </>
    );
}