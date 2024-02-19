import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://assets.vogue.in/photos/640592409d03d0d41504f3a0/master/pass/Face%20taping%20.jpg',
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '70%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default App;
