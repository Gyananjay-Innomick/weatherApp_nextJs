import { googleMapApi } from "../helpers/Api";

interface MapProps {
  city: string;
}

export const Map = ({ city }: MapProps): JSX.Element => (
  <div>
    <iframe
      data-test-id="locationMap"
      title="locationMap"
      width="100%"
      height="300"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${googleMapApi}&q=${city}`}
    ></iframe>
  </div>
);