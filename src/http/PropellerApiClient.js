import axios from 'axios';
import Lockr from 'lockr';

/**
 * Define used constants
 * @type {string}
 */
const propellerApiUrl = 'http://design.propcom.co.uk/buildtest/accordion-data.json';

/**
 * Define component - http client
 * @type {{getContentData: (function(*, *))}}
 */
var client = {

    getCacheKey: function(id, reset, timeToLive) {
        if (reset || Lockr.get(id) === undefined || Lockr.get(id) + timeToLive <= new Date().getTime()) {
            let cacheKey = new Date().getTime();
            this.setCacheKey(id, cacheKey);
        }
    },

    setCacheKey: function (id, cacheKey) {
        Lockr.set(id, cacheKey);
    },

    /**
     * Call to endpoint
     * @param onSuccess
     * @param onError
     */
    getAccordionContent(onSuccess, onError) {
        let cacheKey = this.getCacheKey('propeller', false, 300000);
        // Check cache first
        let data = Lockr.get(cacheKey);
        if (data !== undefined) {
            onSuccess(data);
            return;
        }
        return axios.get(propellerApiUrl)
            .then(function (response) {
                if (response.status === 200 || response.status === 201) {
                    // Cache response
                    Lockr.set(cacheKey, response);
                    onSuccess(response)
                }
            })
            .catch(function (error) {
                if (error.status === 408) {
                    onError(error)
                }
            })
    }
};

export default client;