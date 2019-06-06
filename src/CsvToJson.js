import React, {Component} from 'react';
// import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

// const TOKEN = 'pk.eyJ1Ijoic2F0eWEwMzA2IiwiYSI6ImNqd2pkNDA5dTBnYmU0YW54MTg3bDgybWgifQ.xnVp62_Bkawt5j-rdFDjJg';
const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1Ijoic2F0eWEwMzA2IiwiYSI6ImNqd2pkNDA5dTBnYmU0YW54MTg3bDgybWgifQ.xnVp62_Bkawt5j-rdFDjJg"
});

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

class CsvToJson extends Component {
    constructor(props) {
        // Call super class
        super(props);
    
        // Bind this to function updateData (This eliminates the error)
        this.updateData = this.updateData.bind(this);
        this.state = {latLong: [],
            selectedLatLong: "",
            validationError: "",
            viewport: {
                latitude: 37.785164,
                longitude: -100,
                zoom: 2.8,
                bearing: 0,
                pitch: 0,
                width: 1000,
                height: 700,
            },
            popupInfo: null
        }; 

      }    
    
      componentWillMount() {
        // Your parse code, but not seperated in a function
        var csvFilePath = require("./data.csv");
        var Papa = require("papaparse/papaparse.min.js");
        Papa.parse(csvFilePath, {
          header: true,
          download: true,
          skipEmptyLines: true,
          // Here this is also available. So we can call our custom class method
          complete: this.updateData
        });
      }

      componentDidMount() {
    
      }
      
    
      updateData(result) {
        const data = result.data;
        // console.log(data)
        // Here this is available and we can call this.setState (since it's binded in the constructor)
        this.setState({latLong: data}); // or shorter ES syntax: this.setState({ data });
        console.log(this.state.latLong);
        
      }
    
    render(){
        const {viewport} = this.state;
        return(
            <div>
                {/* <MapGL
                    {...viewport}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    mapboxApiAccessToken={TOKEN}>
                    <div className="nav" style={navStyle}>
                        <NavigationControl/>
                    </div>
                </MapGL> */}
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: "500px",
                        width: "500px"
                    }}>
                    <Layer
                        type="symbol"
                        id="marker"
                        layout={{ "icon-image": "marker-15" }}>
                        <Feature coordinates={[28.644800, 77.216721]}/>
                    </Layer>
                </Map>
                <select>
                    <option>Longitude</option>
                    <option>Latitude</option>
                </select>
            </div>
        );
    }
}

export default CsvToJson;

