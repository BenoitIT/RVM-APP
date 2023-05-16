import * as Font from 'expo-font';
const loadFonts = async () => {
    await Font.loadAsync({
      'Jost-Medium': require('../../assets/Jost/static/Jost-Medium.ttf'),
      // Add other font variants if needed
    });
  };
  export default loadFonts;
