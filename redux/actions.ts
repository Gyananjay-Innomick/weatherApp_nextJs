/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'
import { weatherAppAPI } from '../helpers/Api'
import { notificationHandler } from '../helpers/NotificationHandler'
import { setItem } from '../helpers/SessionStorage'
import {
  GET_DATA_ERROR,
  GET_DATA_LOADING,
  GET_DATA_SUCCESS,
} from './actionTypes'

export const getDataLoading = () => {
  return { type: GET_DATA_LOADING }
}

export const getDataSuccess = (payload: object) => {
  return { type: GET_DATA_SUCCESS, payload }
}

export const getDataError = () => {
  return { type: GET_DATA_ERROR }
}

export const getWeatherByLocation = (toast: CallableFunction) => (dispatch: (arg0: { type: string; payload?: object }) => void) => {
  const success = async (position: { coords: { latitude: number; longitude: number } }) => {
    try {
      const { latitude, longitude } = position.coords
      dispatch(getDataLoading())
      let weatherData = await axios.get(
        `/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAppAPI}`
      )
      weatherData = weatherData.data
      let forcastData = await axios.get(
        `/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`
      )
      forcastData = forcastData.data.daily
      const payload = { weatherData, forcastData }
      dispatch(getDataSuccess(payload))
      setItem('weather', payload)
      notificationHandler(
        toast,
        'Your location weather updated',
        'success',
        'location-weather-success'
      )
    } catch (err) {
      console.log(err)
      dispatch(getDataError())
      notificationHandler(
        toast,
        'Your location weather not updated',
        'error',
        'location-weather-error'
      )
    }
  }

  const error = (err: { code: number; message: string }) => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
    notificationHandler(
      toast,
      'Please turn on your location',
      'error',
      'location-weather-error'
    )
  }

  navigator.geolocation.getCurrentPosition(success, error)
}

export const getWeatherByCity =
  (city: string, toast: CallableFunction) => async (dispatch: CallableFunction) => {
    try {
      dispatch(getDataLoading())
      let weatherData: any = await axios.get(
        `/weather?q=${city}&appid=${weatherAppAPI}`
      )
      weatherData = weatherData.data
      const { lon, lat } = weatherData.coord
      let forcastData = await axios.get(
        `/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`
      )
      forcastData = forcastData.data.daily
      const payload = { weatherData, forcastData }
      dispatch(getDataSuccess(payload))
      setItem('weather', payload)
      notificationHandler(
        toast,
        'City weather data updated',
        'success',
        'city-weather-success'
      )
    } catch (err) {
      console.log(err)
      dispatch(getDataError())
      notificationHandler(
        toast,
        "City weather data doesn't exist",
        'error',
        'city-weather-error'
      )
    }
  }

export const syncData = (city: string, toast: CallableFunction) => async () => {
  try {
    const response = await axios.get<AxiosResponse>(
      `/weather?q=${city}&appid=${weatherAppAPI}`
    )
    const weatherData: any = response.data
    console.log(weatherData)
    // const { coord } = data
    const { lon, lat } = weatherData.coord
    let forcastData = await axios.get(
      `/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`
    )
    forcastData = forcastData.data.daily
    const payload = { weatherData, forcastData }
    getDataSuccess(payload)
    setItem('weather', payload)
    notificationHandler(
      toast,
      'Data sync successfully',
      'success',
      'weatehr-sync-success'
    )
  } catch (err) {
    console.log(err)
    getDataError()
    notificationHandler(
      toast,
      "City weather data doesn't exist",
      'error',
      'weather-sync-error'
    )
  }
}
