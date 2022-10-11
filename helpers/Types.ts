export type Data ={
    dt: number,
    temp: {
      day: number,
      night: number,
      eve: number,
      min: number,
      max: number,
    },
    weather: {main: string}[],
    feels_like: {
      day: number,
      night: number,
    },
    humidity: number,
    wind_speed: number,
    pressure: number,
}