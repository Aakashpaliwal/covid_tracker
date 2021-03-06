import React, {useState, useEffect} from 'react'
import {fetchDailyData} from '../../api'
import {Line, Bar} from 'react-chartjs-2'
import styles from './Chart.module.css'


const Chart = ({data : {confirmed, recovered, deaths}, country}) => {

const [dailyData, setDailyData] = useState([])
useEffect(() => {
	const fetchApi = async () => {
		setDailyData(await fetchDailyData());
	}
	fetchApi();
	}, [dailyData])

	const lineChart = (
		dailyData.length
		 ? (
		 	<Line 
		data={{
			labels : dailyData.map(({date}) => date),
			datasets : [
			{
				data : dailyData.map(({confirmed}) => confirmed),
				label : "Infected",
				borderColor:  '#3333ff',
				fill : true
			}
			,{
				data : dailyData.map(({deaths}) => deaths),
				label : 'deaths',
				borderColor:  'red',
				backgroundColor : 'rgba(255,0,0,0.50)',
				fill : true
			}
			]
		}}
		/>) : null
		);


	const barChart = (
		confirmed
		 ? (
		 	<Bar 
		data={{
			labels : ['Infected', 'Recovered', 'Deaths'],
			datasets : [
			{
				data : [confirmed.value, recovered.value, deaths.value],
				label : "People",
				backgroundColor:  ['rgba(0,0,255,0.5)',
				'rgba(0,255,0,0.5)',
				'rgba(255,0,0,0.5)'],
			
			}]
		}}
		options = {{
			legend : {display : false},
			title : {display : true, text : `current situation in ${country}`}
		}}
		/>) : null
		);



	return (
			<div className={styles.container}>
				{country ? barChart : lineChart}
			</div>	

		)
}


export default Chart;