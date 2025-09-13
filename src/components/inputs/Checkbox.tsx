import React from "react";
import { Checkbox as ExpoCheckbox } from "expo-checkbox";

import { colors, mixins } from "@/styles";

interface CheckboxProps {
  checked: boolean;
  onValueChange: (value: boolean) => void;
}
const Checkbox = (props: CheckboxProps) => {
  return (
    <>
      <ExpoCheckbox
        style={mixins.checkbox}
        value={props.checked}
        color={props.checked ? colors.primary : colors.lightGray}
        onValueChange={props.onValueChange}
      />
    </>
  );
};

export default Checkbox;
