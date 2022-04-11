import React, {useState} from 'react';
import { Map, FeatureGroup, TileLayer, Polyline } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import CURVE_MAPPING from '../curves';
import Slider from './Slider';
import SnakeAnim from './SnakeAnim';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const getPath = (coordinates, curveType, level) => {
    curveType = curveType || 'hilbert';
    level = level || 3;
    return (coordinates.length) ? CURVE_MAPPING[curveType](
        coordinates[0][1], coordinates[0][0],
        coordinates[1][1] - coordinates[0][1],
        coordinates[1][0] - coordinates[0][0],
        coordinates[2][1] - coordinates[1][1],
        coordinates[2][0] - coordinates[1][0],
        level
    ) : [];
};


const EditableMapWrapper = ({ positions }) => {
    const [path, setPath] = useState([]);
    const [curve, setCurve] = useState('hilbert');
    const [coordinates, setCoordinates] = useState([]);
    const [order, setOrder] = useState(3);


    return (<>
        <button onClick={() =>{setPath(getPath(coordinates, 'hilbert', order)); setCurve('hilbert')}} disabled={ curve === 'hilbert'}>Hilbert</button>
        <button onClick={() =>{setPath(getPath(coordinates, 'moore', order)); setCurve('moore')}} disabled={ curve === 'moore'}>Moore</button>
        <button onClick={() =>{setPath(getPath(coordinates, 'peano', order)); setCurve('peano')}} disabled={ curve === 'peano'}>Peano</button>
        <Slider
            min={ 1 }
            max={ 5 }
            step={ 1 }
            value={ order }
            stateChanger={ setOrder }
            pathChanger={ setPath }
            getPath={ getPath }
            coordinates={ coordinates }
            curveType={ curve }
        /> n={ order }
        <EditableMap
            positions={ positions }
            path={ path }
            setCoordinates={ setCoordinates }
            setPath={ setPath }
            order={ order }
            curveType={ curve }
         />
    </>);
};

const EditableMap = ({ positions, path, setCoordinates, setPath, order, curveType }) => {
    const [startAnimation, setStartAnimation] = useState(false);
    const startSnake = () => setStartAnimation(!startAnimation);

    return (
      <>
          &nbsp;&nbsp;&nbsp;
          <button onClick={ startSnake } disabled={ !path.length }>►</button>
          <Map style={{ height: '50vh' }} animate={ true } zoom={ 15 } bounds={ positions }>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
            />
            <FeatureGroup>
                <EditControl
                    position='topright'
                    draw={{
                        polygon: true,
                        polyline: false,
                        circle: false,
                        marker: false,
                        rectangle: false,
                        circlemarker: false
                    }}
                    onCreated={ (e) => {
                        if (e.layerType === 'polygon') {
                            const coordinates = e.layer.toGeoJSON().geometry.coordinates[0];
                            setCoordinates(coordinates);
                            setPath(getPath(coordinates, curveType, order));
                        }
                      }
                    }
                    onEdited={ (e) => {
                        const coordinates = e.layers._layers[Object.keys(e.layers._layers)].toGeoJSON().geometry.coordinates[0];
                        setCoordinates(coordinates);
                        setPath(getPath(coordinates, curveType, order));
                      }
                    }
                    onDeleted={ (e) => {
                        setCoordinates([]);
                        setPath([]);
                    }}
                />
                {path && <>
                    <SnakeAnim startAnimation={ startAnimation } path={ path } />
                    <Polyline color='grey' positions={ path } opacity={ 0.9 } />
                </>}
            </FeatureGroup>
          </Map>
        </>
      );
};

export default EditableMapWrapper;
