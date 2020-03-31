import {StyleSheet} from 'react-native';

const colors = {
  bgColor1: 'white',
  bgColor2: '#fe024e',
  bgColor3: 'rgba(254, 2, 78, 0.5)',
  text1: '#fe024e',
  text2: 'white',
  text3: 'black',
  black: 'black',
  blackBg: 'rgba(0, 0, 0, 0.3)',
  white: 'white',
  grey: '#a4a4a4',
  textGrey: '#919498',
  red: 'rgba(207, 0, 15, 1)',
  yellow: '#f6c90e',
  green: '#4bb543',
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    marginBottom: 25,
    borderWidth: 2,
    borderColor: colors.text1,
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
    color: colors.text1,
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: colors.bgColor2,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.bgColor1,
  },
  modalButtonContainer: {
    backgroundColor: colors.bgColor2,
    borderRadius: 30,
    width: '40%',
    paddingVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  modalButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text2,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text3,
  },
});

export {styles, colors};
