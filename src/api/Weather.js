import axiosConfig from './BaseConfig';

const WeatherApi = () => {
  const onSuccess = ({data}) => {
    console.log('debug success', data);
    setWeather(data);
  };

  const onFailure = error => {
    console.log('debug error', error.response.data);
  };

  axiosConfig.get('api/WeatherForecast').then(onSuccess).catch(onFailure);
};

export default WeatherApi;