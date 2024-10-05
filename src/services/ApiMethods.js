// import {store} from 'Redux/store';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getHeders = () => {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    };
}

class ApiMethods
{
    static apiRequest(method, url, body = {}) {
        url = BASE_URL + url;
        return new Promise((data, error) => {
            const httpParams = Object.keys(body).length !== 0
              ? {method, body: JSON.stringify(body),  headers: getHeders()}
              : {method,  headers: getHeders()};
            fetch(url, httpParams)
              .then((response) => {
                if (response.ok) return response.json();
                return response.json().then(response => { throw response.message })
              })
              .then((result) => data(result.data))
              .catch((err) => error(err));
        });
    }

    static get(url) {
        return this.apiRequest('GET', url);
    }

    static post(url, data) {
        return this.apiRequest('POST', url, data);
    }

    static put(url, data) {
        return this.apiRequest('PUT', url, data);
    }

    static delete(url) {
        return this.apiRequest('DELETE', url);
    }
}

export default ApiMethods;
