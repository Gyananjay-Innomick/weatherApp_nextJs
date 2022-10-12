/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'
import { Container, Col } from 'reactstrap'
import { Newbox } from './Weathercards'
import { Map } from './Map'
import { FaSyncAlt } from 'react-icons/fa'
// import { WeatherAllData } from "..//Type";
import { celsius } from '../helpers/HelperFunctions'
import { Forecast } from './Forecast'
import { getWeatherByLocation, syncData } from '../redux/actions'
// import { getItem } from '../helpers/SessionStorage'
import { Loading } from './Loading'
import { Error } from './Error'
import { useToast } from '@chakra-ui/react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import styles from '../styles/WeatherContainer.module.css'
import { Data } from '../helpers/Types'

const WeatherContainer = (): JSX.Element => {
  const [isRotate, setIsRotate] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  const { isLoading, weatherData, forcastData, isError } = useSelector(
    (state: never) => state,
    shallowEqual
  )
  //   const nextProps = useSelector((state: data) => ({
  //     isLoading: state.isLoading || null,
  //     weatherData: state.weatherData || null,
  //     forcastData: state.forcastData || null,
  //     isError: state.isError || null,
  //   }))
  //   const { weatherState } = weatherObject
  //   const weatherData = weatherState?.weatherData
  //   const forcastData = weatherState?.forcastData
  //   const isLoading = weatherState?.isLoading
  //   const isError = weatherState?.isError

  //   const firstRun = useRef(true)
  useEffect(() => {
    // if (firstRun.current) {
    //   const weather = getItem('weather')
    //   if (weather === undefined) {
    //     const weatherDispatch = weatherObject?.weatherDispatch
    //     if (weatherDispatch) {
    //@ts-ignore
    dispatch(getWeatherByLocation(toast))
    //     }
    //   }
    // }
    // firstRun.current = false
  }, [])

  const handleSyncData = (): void => {
    setIsRotate(true)
    // @ts-ignore
    dispatch(syncData(weatherData?.name, toast))
  }

  return isLoading ?? false ? (
    <Loading />
  ) : isError ?? true ? (
    <Error />
  ) : (
    <Container className={styles.weather_container}>
      <div className={styles.weather_container_upper}>
        <Newbox>
          <div className={styles.weather_location_card}>
            <div className="d-flex justify-content-end">
              <FaSyncAlt
                onClick={handleSyncData}
                className={isRotate ? styles.iconRotate : ''}
                onAnimationEnd={() => {
                  setIsRotate(false)
                }}
              />
            </div>
            <h2 className={styles.heading}>{weatherData?.name}</h2>
            <h1 className={styles.large_heading}>
              {weatherData?.main != null &&
                Math.round(weatherData?.main?.temp - 273)}
              <sup>o</sup>C
            </h1>
            <h2 className={styles.heading}>{weatherData?.weather?.[0].main}</h2>
          </div>
        </Newbox>
        <Newbox>
          <Container className={styles.weather_details_card}>
            <Col className={styles.weather_details_label}>
              <span className={styles.details_label}>Felt Temp.</span>
              <span className={styles.details_label}>Humidity</span>
              <span className={styles.details_label}>Wind</span>
              <span className={styles.details_label}>Visibility</span>
              <span className={styles.details_label}>Max. Temp</span>
              <span className={styles.details_label}>Min. Temp</span>
            </Col>
            <Col className={styles.weather_details_data}>
              <span className={styles.details_data}>
                {weatherData?.main != null &&
                  celsius(weatherData.main.feels_like)}
                <sup>o</sup> C
              </span>
              <span className={styles.details_data}>
                {weatherData?.main?.humidity}%
              </span>
              <span className={styles.details_data}>
                {weatherData?.wind != null &&
                  (weatherData.wind.speed * 3.6).toFixed(2)}{' '}
                Km/h
              </span>
              <span className={styles.details_data}>
                {weatherData?.visibility != null &&
                  (weatherData.visibility * 0.001).toFixed(2)}{' '}
                Km
              </span>
              <span className={styles.details_data}>
                {weatherData?.main != null &&
                  celsius(weatherData.main.temp_max)}
                <sup>o</sup> C
              </span>
              <span className={styles.details_data}>
                {weatherData?.main != null &&
                  celsius(weatherData.main.temp_min)}
                <sup>o</sup> C
              </span>
            </Col>
          </Container>
        </Newbox>
        <Newbox>
          <div>
            {weatherData?.name != null && <Map city={weatherData.name} />}
          </div>
        </Newbox>
      </div>
      {forcastData != null && forcastData.length > 0 && (
        <div className={styles.forecast_container}>
          {forcastData.length > 0 &&
            forcastData.map((e: Data, i: number) => (
              <Forecast key={i} data={e} />
            ))}
        </div>
      )}
    </Container>
  )
}

export default WeatherContainer
