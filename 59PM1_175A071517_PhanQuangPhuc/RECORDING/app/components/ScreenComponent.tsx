import React, {Children, ReactElement, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  StatusBarProps,
} from 'react-native';
import {Header} from 'react-native-elements';
import {colors} from '../constants/Theme';
interface PropsComponent {
  /**
   * View hiển thị
   */
  children?: React.ReactNode;
  /**
   * State hiện thị màn hình Loading
   */
  isLoading?: boolean;
  /**
   * State hiện thị màn hình Lỗi
   */
  isError?: object | boolean;
  /**
   * View nút phải
   */
  rightComponent?: React.ReactElement;
  /**
   * View nút trái
   */
  leftComponent?: React.ReactElement;
  /**
   * View ở giữa
   */
  centerComponent?: React.ReactElement;
  /**
   * Style Container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style View center
   */
  centerContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Style View left
   */
  leftContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Style View Right
   */
  rightContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Status Bar
   */
  chilStyle?:StyleProp<ViewStyle>;

  statusBarProps?: StatusBarProps;
  reload?: () => void;
  onRefresh?: () => void;

  dialogLoading?: boolean;

  isSafeAre?: boolean;
  isEmpty?: boolean;
  renderViewHeader?: React.ReactNode;
  titleBackHeader?: string;
  backgroundColor?: string;
}
const ScreenComponent = (props: PropsComponent) => {
  const {
    centerComponent,
    rightComponent,
    leftComponent,
    centerContainerStyle,
    leftContainerStyle,
    rightContainerStyle,
    statusBarProps,
    containerStyle,
    children,
    dialogLoading,
    isSafeAre = false,
    renderViewHeader,
    titleBackHeader,
    backgroundColor,
    chilStyle
  } = props;
  return (
    <View
      style={[
        styles.Container,
        {backgroundColor: backgroundColor || colors.white},
      ]}>
      <Header
        containerStyle={containerStyle}
        centerComponent={centerComponent}
        rightComponent={rightComponent}
        leftComponent={leftComponent}
        centerContainerStyle={centerContainerStyle}
        leftContainerStyle={leftContainerStyle}
        rightContainerStyle={rightContainerStyle}
        statusBarProps={statusBarProps}
      />
      <SafeAreaView style={chilStyle||styles.Container} children={children}></SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {flex: 1},
});
export default ScreenComponent;
