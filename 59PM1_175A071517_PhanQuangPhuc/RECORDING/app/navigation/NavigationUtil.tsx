import { CommonActions } from '@react-navigation/native';

let _navigator; // eslint-disable-line

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(name: string, params?: any) {
  if (_navigator) _navigator.dispatch(CommonActions.navigate(name, params));
}
function goBack() {
  if (_navigator) _navigator.dispatch(CommonActions.goBack());
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
};
