import {environment} from '../environments/environment'
export const Config= {
    baseUrl:environment.production?"https://seven11api.herokuapp.com/":"https://localhost:5001/"
}