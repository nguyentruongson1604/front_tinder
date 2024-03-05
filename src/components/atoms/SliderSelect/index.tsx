import {Text, useTheme, View} from 'native-base';
// import * as React from 'react';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useState} from 'react';

export interface IInput {
  icon?: any;
  leftTitle?: any;
  rightTitle?: any;
  onPress?: () => void;
  borderTop?: boolean;
  borderBottom?: boolean;
}

const SliderSelect = () => {
  const [values, setValues] = useState([18, 100]);
  const {width} = Dimensions.get('window');
  const onValuesChange = newValues => {
    setValues(newValues);
  };
  return (
    <View
      style={{
        borderTopColor: '#e0dbdb',
        borderTopWidth: 1,
        borderBottomColor: '#e0dbdb',
        borderBottomWidth: 1,
        paddingRight: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 45,
          paddingTop: 20,
          marginLeft: 15,
        }}>
        <Text style={{fontSize: 18}}>Độ Tuổi</Text>
        <View>
          <Text style={{fontSize: 18}}>
            {values[0]} - {values[1]}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <MultiSlider
          values={values}
          sliderLength={width - 40}
          onValuesChange={onValuesChange}
          min={18}
          max={100}
          step={1}
          allowOverlap={false}
          snapped
          selectedStyle={{backgroundColor: '#F63A6E'}}
          markerStyle={{width: 28, height: 28}}
        />
      </View>
    </View>
  );
};

export default SliderSelect;
