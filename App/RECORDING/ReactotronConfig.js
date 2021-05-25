import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: 'RECORDING',
  })
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: {
      ignoreUrls: /symbolical/,
    },
    editor: false, // there are more options to editor
    errors: {veto: (stackFrame) => false}, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .connect();
Reactotron.configure({
  enabled: true,
  host: '192.168.1.16', // added code
  port: 9090,
})
  // ...
  .connect();
