import {NativeModules} from 'react-native';
const module = NativeModules.RNTDevice;
const methodExport = () => {
  module.getDeviceName((err, name) => console.log(err, name));
};

export default methodExport;
