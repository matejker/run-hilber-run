import React, { useState } from "react";
import { Map, TileLayer, Polyline } from "react-leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import SnakeAnim from "./SnakeAnim";

const RouteMap = ({ path }) => {
  const [startAnimation, setStartAnimation] = useState(false);
  const startSnake = () => setStartAnimation(!startAnimation);

  return (
    <>
      <Map style={{ height: "50vh" }} animate={true} zoom={15} bounds={path}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        <SnakeAnim startAnimation={startAnimation} path={path} />
        <Polyline color="grey" positions={path} opacity={0.9} />
      </Map>
      <p></p>
      <button onClick={startSnake}>►</button>
    </>
  );

};

export default RouteMap;
