import type { ReactNode } from 'react'
import { Container } from 'reactstrap'
import styles from '../styles/Weathercards.module.css'

interface SmallComponentProps {
  children: ReactNode
}

export const ForecastBox = ({ children }: SmallComponentProps): JSX.Element => (
  <Container className={`${styles.zoom} ${styles.forecastbox}`}>
    {children}
  </Container>
)

export const Newbox = ({ children }: SmallComponentProps): JSX.Element => (
  <Container className={`${styles.zoom} ${styles.newbox}`}>
    {children}
  </Container>
)

export const NewText = ({ children }: SmallComponentProps): JSX.Element => (
  <span className={styles.newText}>{children}</span>
)
