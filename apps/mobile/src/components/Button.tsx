import {
  TouchableHighlight,
  TouchableHighlightProps,
  StyleSheet,
  Text,
} from 'react-native';

export interface ButtonBase extends TouchableHighlightProps {
  label?: string;
  children?: JSX.Element;
}

const Button = ({ label, children, style: newStyle, ...props }: ButtonBase) => (
  <TouchableHighlight style={[styles.buttonContainer, newStyle]} {...props}>
    {children || <Text style={styles.label}>{label}</Text>}
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttonContainer: {
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 50,
    borderColor: 'blue',
    borderWidth: 2,
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default Button;
