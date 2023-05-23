import Toast from "react-native-root-toast";
const toaster = (message,color) => {
  return Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: color,
    textColor: "white",
    delay: 0,
  });
};
export default toaster;
