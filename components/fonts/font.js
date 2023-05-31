import * as Font from 'expo-font';
const loadFonts = async () => {
    await Font.loadAsync({
      'Jost-Medium': require('../../assets/Jost/static/Jost-Medium.ttf'),
    });
  };
  export default loadFonts;
