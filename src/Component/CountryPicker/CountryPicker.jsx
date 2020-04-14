import React, {useEffect, useState} from 'react'
import {NativeSelect, FormControl} from '@material-ui/core'
import styles from './CountryPicker.module.css'
import {fetchCountries} from '../../api'
const CountryPicker = ({ handleChangeCountry }) => {

	const [fetchedCountries, setFetchedCountries] = useState([]); 

	useEffect(() => {
		const fetchAPI = async () => {
			setFetchedCountries(await fetchCountries())
		}

		fetchAPI();
	},[setFetchedCountries])

	return (
			<FormControl className={styles.formcontrol}> 
				<NativeSelect defaultValue='' onChange={(e) => handleChangeCountry(e.target.value)} className={styles.selectcss}>
					<option value="">Global</option>
					{fetchedCountries.map((country, i) => <option value={country} key={i}>{country}</option>)}
				</NativeSelect>
			</FormControl>
		)
}

export default CountryPicker;