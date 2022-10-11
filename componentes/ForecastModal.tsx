import React, { useState } from 'react'
import { dateFormat } from '../helpers/HelperFunctions'
import { Modal, ModalHeader, ModalBody, Container, Col } from 'reactstrap'
import { BsSun, BsCloudMoon } from 'react-icons/bs'
import styles from '../styles/ForecastModal.module.css'
import { Data} from '../helpers/Types';

interface ForecastModalProps {
  data: Data;
}

export const ForecastModal = ({ data }: ForecastModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { date, day }: any= dateFormat(data.dt)

  const toggle = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div onClick={toggle}>
        <p className={styles.forecast_data} data-testid="dayTemp">
          <BsSun style={{ marginRight: '10px' }} />
          {Math.round(data.temp?.day)}
          <sup>o</sup> C
        </p>
        <p className={styles.forecast_data} data-testid="nightTemp">
          <BsCloudMoon style={{ marginRight: '10px' }} />
          {Math.round(data.temp?.night)}
          <sup>o</sup> C
        </p>
        <p
          className={`${styles.forecast_data} ${styles.forecast_data_weather}`}
          data-testid="forecastWeather"
        >
          {data?.weather?.length && data?.weather[0].main}
        </p>
      </div>
      <Modal
        isOpen={isOpen}
        style={{ maxWidth: '450px' }}
        toggle={toggle}
        centered={true}
      >
        <ModalHeader toggle={toggle} className="border-0" />
        <ModalBody>
          <div className={styles.modal_heading}>
            <p className={styles.forecast_heading_text}>{date}</p>
            <p className={styles.forecast_heading_text}>{day}</p>
          </div>
          <Container className={styles.weather_details_card}>
            <Col className={styles.weather_details_label}>
              {[
                'Felt Temp.',
                'Humidity',
                'Wind',
                'Pressure',
                'Day Temp.',
                'Evening Temp.',
                'Night Temp.',
                'Max Temp.',
                'Min Temp.',
              ].map((e, i) => (
                <span key={i} className={styles.details_label}>
                  {e}
                </span>
              ))}
            </Col>
            <Col className={styles.weather_details_data}>
              <span className={styles.details_data}>
                {data?.feels_like?.day}
                <sup>o</sup> C
              </span>
              <span className={styles.details_data}>{data?.humidity}%</span>
              <span className={styles.details_data}>
                {Boolean(data?.wind_speed) &&
                  (data.wind_speed * 3.6).toFixed(2)}{' '}
                Km/h
              </span>
              <span className={styles.details_data}>{data?.pressure} hPa</span>
              <span className={styles.details_data}>
                {data?.temp?.day}
                <sup>o</sup> C
              </span>
              <span className={styles.details_data}>
                {data?.temp?.eve}
                <sup>o</sup> C
              </span>
              <span className={styles.details_data}>
                {data?.temp?.night}
                <sup>o</sup> C
              </span>
              <span className={styles.details_data}>
                {data?.temp?.min}
                <sup>o</sup> C
              </span>
              <span className={styles.details_data}>
                {data?.temp?.max}
                <sup>o</sup> C
              </span>
            </Col>
          </Container>
        </ModalBody>
      </Modal>
    </>
  )
}
