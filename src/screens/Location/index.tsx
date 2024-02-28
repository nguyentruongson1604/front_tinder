import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {View, Text} from 'react-native';

const App = () => {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    // Lấy vị trí hiện tại của người dùng
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        console.log({latitude, longitude});
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    // Lắng nghe sự thay đổi vị trí (nếu cần)
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    // Hủy bỏ lắng nghe khi component bị unmounted
    return () => Geolocation.clearWatch(watchId);
  }, []);

  return (
    <View>
      <Text>Latitude: {location?.latitude}</Text>
      <Text>Longitude: {location?.longitude}</Text>
    </View>
  );
};

export default App;
