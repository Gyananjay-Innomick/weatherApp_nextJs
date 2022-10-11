import Image from 'next/image'
import { Container } from 'reactstrap'
import styles from '../styles/Error.module.css'

export const Error = (): JSX.Element => {
  return (
    <Container className={styles.error}>
      <Image
        data-testid="error-image"
        src="/cross-img.gif"
        alt="error-img"
        className={styles.error_image}
        width="550"
        height="500"
      />
    </Container>
  )
}
