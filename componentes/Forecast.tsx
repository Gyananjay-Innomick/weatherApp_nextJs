import React from 'react'
import { dateFormat } from '../helpers/HelperFunctions'
import { ForecastBox } from './Weathercards'
import { ForecastModal } from './ForecastModal'
import styles from '../styles/Forecast.module.css'
import { Data } from '../helpers/Types'

interface ForecastProps {
  key: number
  data: Data
}
export const Forecast = ({ data }: ForecastProps): JSX.Element => {
  const { date, day } = dateFormat(data.dt)

  return (
    <div>
      <ForecastBox>
        <div
          className={styles.forecast_heading}
          data-testid="forecastHeadingDay"
        >
          <p
            className={styles.forecast_heading_text}
            data-testid="forecastHeadingDate"
          >
            {date}
          </p>
          <p className={styles.forecast_heading_text}>{day}</p>
        </div>
        <ForecastModal data={data} />
      </ForecastBox>
    </div>
  )
}
