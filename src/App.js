import React, { Component } from "react";
// import Cards from './Component/Cards/Cards'
// import Chart from './Component/Chart/Chart'
// import CountryPicker from './Component/CountryPicker/CountryPicker'
import {Cards, Chart, CountryPicker} from './Component';
import {fetchData} from './api'
import styles from './App.module.css';
import coronaImage from './images/image.png'
// import { Route} from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : {},
      country : ''
    }
  }

  async componentDidMount() {
    const data = await fetchData();
    this.setState({
      data : data
    })
  }

  handleChangeCountry = async (country) => {
    const fetchedData = await fetchData(country);
    console.log(fetchedData)
    this.setState({
      data : fetchedData,
      country : country
    })
  }

  

  render() {
    return (
     
         <div className={styles.container}>
           <img className={styles.image} src={coronaImage} alt="COVID-19"/>
            <Cards data = {this.state.data}/>
            <CountryPicker handleChangeCountry={this.handleChangeCountry}/>
            <Chart data={this.state.data} country={this.state.country}/>
            
         </div>
         );
  }
}

export default App;
