import {observer} from 'mobx-react-lite';
import {EditImageScreen} from '../EditImageScreen';

export const EditImgCreateScreen = observer(() => {
  return <EditImageScreen isCreate={true} />;
});
