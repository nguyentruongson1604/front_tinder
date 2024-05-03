import {useEffect} from 'react';
import {useAppStore, useUserStore} from '../../store';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';
import {observer} from 'mobx-react-lite';

export const NotifySnackBar = observer(() => {
  const appStore = useAppStore();
  const userStore = useUserStore();

  const fn = () => {
    if (!appStore.message) {
      Toast.hide();
      Dialog.hide();
    } else {
      console.log('statusCode', appStore.statusCode);
      appStore.statusCode === 401
        ? Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Fail',
            textBody: 'Dang nhap lai',
            button: 'back login',
            onPressButton: () => {
              userStore.logout();
              appStore.reset();
            },
            onHide: appStore.reset,
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
    fn();
  }, [appStore.message]);
  return null;
});
