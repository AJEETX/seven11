import {environment} from '../environments/environment'
export const Config= {
    baseUrl:environment.production?"https://seven11api.herokuapp.com/":"https://localhost:5001/",
    // ipaddressurl:"https://api.ipify.org?format=json",
    ipaddressurl:environment.production?"https://api.ipify.org?format=json":"http://httpbin.org/ip",
    geoLocation:"https://ipapi.co/"
}