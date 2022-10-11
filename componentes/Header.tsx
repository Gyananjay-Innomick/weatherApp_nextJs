/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import styles from '../styles/Header.module.css'
import { Button, Input } from 'reactstrap'
import { getItem } from '../helpers/SessionStorage'
import { getWeatherByLocation, getWeatherByCity } from '../redux/actions'
import { useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

const Header = () => {
  const [city, setCity] = useState('')
  const toast = useToast()
  const dispatch = useDispatch()

  const handleChange = (): void => {
    const weather = getItem('weather')
    const storedCityWeather = weather ? weather.weatherData.name : ''
    if (
      storedCityWeather &&
      city.toLowerCase() === storedCityWeather.toLowerCase()
    ) {
      return
    }
    if (city) {
      //@ts-ignore

      dispatch(getWeatherByCity(city, toast))
    }
  }

  const handleLocationData = (): void => {
    //@ts-ignore

    dispatch(getWeatherByLocation(toast))
  }
  return (
    <div className={styles.app_header}>
      <div className={styles.search_bar}>
        <Input
          className={styles.search_bar_input}
          placeholder="city"
          onChange={(e) => {
            setCity(e.target.value)
          }}
          value={city}
        />

        <Button
          disabled={!city}
          className={styles.search_btn}
          onClick={handleChange}
        >
          Search
        </Button>
      </div>
      <div className={styles.location_btn_container}>
        <Button className={styles.location_btn} onClick={handleLocationData}>
          <HiLocationMarker
            style={{
              marginLeft: '5px',
              marginRight: '7px',
              marginTop: '2px',
              marginBottom: '2px',
              fontSize: '24px',
            }}
          />
          Your Location Weather
        </Button>
      </div>
    </div>
  )
}

export default Header
