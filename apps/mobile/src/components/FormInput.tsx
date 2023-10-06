import { StyleSheet, TextInput, TextInputProps } from 'react-native';

const FormInput = ({
  style: newStyle,
  ...props
}: TextInputProps): JSX.Element => {
  return <TextInput style={[styles.formInput, newStyle]} {...props} />;
};

const styles = StyleSheet.create({
  formInput: {
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
  },
});

export default FormInput;
