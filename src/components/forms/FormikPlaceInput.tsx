import React, { useCallback } from "react";
import { useField } from "formik";
import PlaceInput from "../inputs/PlaceInput";
import { Place } from "@/services/placesService";

interface FormikPlaceInputProps {
  name: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  style?: any;
}

const FormikPlaceInput: React.FC<FormikPlaceInputProps> = ({
  name,
  placeholder,
  label,
  disabled,
  style,
}) => {
  const [field, meta, helpers] = useField<Place | null>(name);

  const handleSelect = useCallback(
    (place: Place) => {
      helpers.setValue(place);
      helpers.setTouched(true);
    },
    [helpers]
  );

  return (
    <PlaceInput
      value={field.value}
      onSelect={handleSelect}
      placeholder={placeholder}
      label={label}
      error={meta.touched && meta.error ? meta.error : undefined}
      disabled={disabled}
      style={style}
    />
  );
};

export default FormikPlaceInput;
