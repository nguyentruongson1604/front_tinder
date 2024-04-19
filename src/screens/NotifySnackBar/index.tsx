import {useEffect} from 'react';
import {useAppStore} from '../../store';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';
import {observer} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';

export const NotifySnackBar = observer(() => {
  const appStore = useAppStore();
  const navigation = useNavigation();

  const fn = () => {
    console.log('appStore.message', appStore.message);

    if (!appStore.message) {
      Toast.hide();
      Dialog.hide();
    } else {
      appStore.statusCode === 401
        ? Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Fail',
            textBody: 'Dang nhap lai',
            button: 'back login',
            onPressButton: () => {
              appStore.reset();
              navigation.navigate('Login');
            },
          })
        : Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Fail',
            textBody: appStore.message,
            onHide: appStore.reset,
            autoClose: 3000,
          });
    }
  };

  useEffect(() => {
    console.log(appStore.message);

    fn();
  }, [appStore.message]);
  return null;
});
