import React, {Component} from 'react';

class CsvToJson extends Component {
    constructor(props) {
        // Call super class
        super(props);
    
        // Bind this to function updateData (This eliminates the error)
        this.updateData = this.updateData.bind(this);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    
      updateData(result) {
        const data = result.data;
        console.log(data)
        // Here this is available and we can call this.setState (since it's binded in the constructor)
        this.setState({data: data}); // or shorter ES syntax: this.setState({ data });
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
      }
    
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <select>
                        <option>Longitude</option>
                        <option value="longitude">Longitude</option>
                    </select>
                    <select>
                        <option>Latitude</option>
                        <option value="latitude">Latitude</option>
                    </select>
                </form>
            </div>
        );
    }
}

export default CsvToJson;

