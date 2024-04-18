/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'native-base';
// import * as React from 'react';
import {Dimensions} from 'react-native';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

export interface ISlider {
  isBorderTop?: boolean;
  title: string;
  unit: string;
  start: number;
  end: number;
  init?: number;
  value: number[];
  setValue: any;
}

const SingleSlider: React.FC<ISlider> = ({
  isBorderTop = false,
  title,
  unit,
  start,
  end,
  init,
  value,
  setValue,
}) => {
  const {width} = Dimensions.get('window');
  // const [sliderValue, setSliderValue] = useState([init]);
  const onValueSingleChange = values => {
    // setSliderValue(values);
    setValue(values);
  };
  return (
    <View
      style={{
        borderTopColor: '#e0dbdb',
        borderTopWidth: isBorderTop ? 0.5 : 0,
        borderBottomColor: '#e0dbdb',
        borderBottomWidth: 1,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 45,
          paddingTop: 20,
          marginLeft: 15,
        }}>
        <Text style={{fontSize: 16}}>{title}</Text>
        <View>
          <Text style={{fontSize: 16, fontWeight: '600'}}>
            {value} {unit}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        {/* <MultiSlider
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
          // enabledTwo={false}
          // isMarkersSeparated={false}
          // customMarkerRight={e => {
          //   return <></>;
          // }}
        /> */}

        <MultiSlider
          values={value}
          sliderLength={width - 40}
          onValuesChange={onValueSingleChange}
          min={start}
          max={end}
          step={1}
          allowOverlap={false}
          snapped={false}
          selectedStyle={{backgroundColor: '#F63A6E'}}
          unselectedStyle={{backgroundColor: 'silver'}}
          markerStyle={{width: 28, height: 28}}
        />
      </View>
    </View>
  );
};

export default SingleSlider;
