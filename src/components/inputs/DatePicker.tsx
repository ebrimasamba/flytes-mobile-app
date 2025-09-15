import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

import { colors } from "@/styles";
import { H3, P } from "@/components/typography";

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: "date" | "time" | "datetime";
  error?: string;
  containerStyle?: any;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = "Select date",
  minimumDate,
  maximumDate,
  mode = "date",
  error,
  containerStyle,
  disabled = false,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    value ? dayjs(value).toDate() : new Date()
  );

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (date) {
      setSelectedDate(date);
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      onChange(formattedDate);
    }
  };

  const handlePress = () => {
    if (!disabled) {
      setShowPicker(true);
    }
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return placeholder;
    return dayjs(dateString).format("MMM DD, YYYY");
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <H3 style={styles.label}>{label}</H3>}

      <TouchableOpacity
        style={[
          styles.pickerButton,
          error && styles.pickerButtonError,
          disabled && styles.pickerButtonDisabled,
        ]}
        onPress={handlePress}
        disabled={disabled}
      >
        <P
          style={[
            styles.pickerText,
            !value && styles.placeholderText,
            error && styles.errorText,
            disabled && styles.disabledText,
          ]}
        >
          {formatDisplayDate(value)}
        </P>
      </TouchableOpacity>

      {error && <P style={styles.errorMessage}>{error}</P>}

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          style={styles.picker}
        />
      )}

      {Platform.OS === "ios" && showPicker && (
        <View style={styles.iosPickerContainer}>
          <TouchableOpacity
            style={styles.iosPickerButton}
            onPress={() => setShowPicker(false)}
          >
            <P style={styles.iosPickerButtonText}>Done</P>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textLight,
    marginBottom: 8,
  },
  pickerButton: {
    backgroundColor: colors.gray,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
    justifyContent: "center",
  },
  pickerButtonError: {
    borderColor: colors.danger,
  },
  pickerButtonDisabled: {
    backgroundColor: colors.lightGray,
    opacity: 0.6,
  },
  pickerText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: "Figtree Regular",
    fontWeight: "400",
  },
  placeholderText: {
    color: colors.textLight,
  },
  errorText: {
    color: colors.danger,
  },
  disabledText: {
    color: colors.textLight,
  },
  errorMessage: {
    fontSize: 12,
    color: colors.danger,
    marginTop: 4,
    marginLeft: 4,
  },
  picker: {
    height: 200,
  },
  iosPickerContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1000,
  },
  iosPickerButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    alignItems: "center",
  },
  iosPickerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
});

export default DatePicker;
