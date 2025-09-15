import React from "react";
import { useField } from "formik";
import Input from "../inputs/Input";

interface FormikInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  containerStyle?: any;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: any;
  autoComplete?: any;
  autoCorrect?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  [key: string]: any;
}

const FormikInput: React.FC<FormikInputProps> = ({
  name,
  containerStyle,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Input
      {...field}
      {...props}
      containerStyle={containerStyle}
      error={meta.touched && meta.error ? meta.error : undefined}
      onChangeText={(value) => helpers.setValue(value)}
      onBlur={() => helpers.setTouched(true)}
    />
  );
};

export default FormikInput;
