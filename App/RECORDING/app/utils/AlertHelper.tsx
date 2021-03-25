import R from '@app/assets/R';
import { Alert } from 'react-native';

export const showConfirm = (title, content, action?, textCancel?, textConfirm?) => {
  Alert.alert(
    title,
    content,
    [
      {
        text: textCancel || "Hủy",
        style: 'cancel'
      },
      {
        text: textConfirm || "Xác nhận",
        onPress: action
      }
    ],
    { cancelable: false }
  );
};

export const showMessages = (title, content, action?) => {
  setTimeout(() => {
    Alert.alert(
      title,
      content,
      [
        {
          text: 'OK',
          onPress: action
        }
      ],
      { cancelable: false }
    );
  }, 100);
};
