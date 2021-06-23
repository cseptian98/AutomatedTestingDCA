import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import List from 'components/List';
import axiosConfig from 'api/BaseConfig';

const Weather = () => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = () => {
    const onSuccess = ({data}) => {
      console.log('debug success', data);
      setWeather(data);
    };

    const onFailure = error => {
      console.log('debug error', error.response.data);
    };

    axiosConfig.get('api/WeatherForecast').then(onSuccess).catch(onFailure);
  };

  const renderItem = ({item}) => <List title={item.temperatureC} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={weather}
        renderItem={renderItem}
        keyExtractor={weather => weather.summary}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default Weather;
