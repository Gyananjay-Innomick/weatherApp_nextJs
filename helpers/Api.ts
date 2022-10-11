import axios from "axios";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();


axios.defaults.baseURL= publicRuntimeConfig.backendUrl;

export const googleMapApi = "AIzaSyAq15HbfCRMW7RqNb5LUNyOLyfzpYI0wl4";

export const weatherAppAPI = "c0d290eeee9dd399b017a6d2ba64be7e";