import API_KEY from '../../../static/js/api.js';


const getEndpointData = async (endpoint, endpointName) => {
    const response = await fetch(endpoint);
    const endpointData = await response.json();
    endpointData.endpoint = endpointName;
    return endpointData;
};


const getMovieData = async id => {

    const requests = [];

    const endpoints = {
        movie: `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
        actors: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
        recommendations: `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=null&page=1`,
        images: `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}&language=null`
    };

    for (const endpoint in endpoints) {
        requests.push(getEndpointData(endpoints[endpoint], endpoint));
    };

    const combinedDataArray = await Promise.all(requests);

    const combinedDataObj = {};

    for (const item of combinedDataArray) {
        combinedDataObj[item.endpoint] = item;
    };

    return combinedDataObj
};

export default getMovieData;
