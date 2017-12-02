import axios from 'axios';
import store from '../store';
import {apiPrefix} from '../etc/config.json';
import {serverPort} from '../etc/config.json';
import {getSeriesSuccess} from "../actions/series-actions";

/**
 * Get chars with offset
 */

export function getLastSeries(count) {
    return axios.get(apiPrefix + ':' + serverPort + '/online/' + Date.now() + '?count=' + count)
        .then(response => {
            store.dispatch(getSeriesSuccess(response.data));
            return response.data;
        });
}
export function getSeason(num) {
    return axios.get(apiPrefix + ':' + serverPort + '/online/' + Date.now() + '?numOfSeason=' + num)
        .then(response => {
            store.dispatch(getSeriesSuccess(response.data));
            return response.data;
        });
}