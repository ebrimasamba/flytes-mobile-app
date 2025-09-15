import React, { useState, useCallback, useMemo } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Input from "./Input";
import PlacesSearchModal from "../search/PlacesSearchModal";
import { placesService, Place } from "@/services/placesService";
import { colors } from "@/styles";

interface PlaceInputProps {
  value: Place | null;
  onSelect: (place: Place) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  style?: any;
}

const PlaceInput: React.FC<PlaceInputProps> = ({
  value,
  onSelect,
  placeholder = "Select destination",
  label,
  error,
  disabled = false,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = useCallback(() => {
    if (!disabled) {
      setModalVisible(true);
    }
  }, [disabled]);

  const handleSelectPlace = useCallback(
    (place: Place) => {
      onSelect(place);
      setModalVisible(false);
    },
    [onSelect]
  );

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const displayValue = useMemo(() => {
    return value ? placesService.getDisplayName(value) : "";
  }, [value]);

  return (
    <View style={style}>
      <TouchableOpacity
        style={[
          styles.container,
          error && styles.errorContainer,
          disabled && styles.disabledContainer,
        ]}
        onPress={handlePress}
        disabled={disabled}
      >
        <View style={styles.inputContainer}>
          <Input
            label={label}
            placeholder={placeholder}
            value={displayValue}
            editable={false}
            pointerEvents="none"
            error={error}
            style={styles.input}
          />
          <MaterialIcons
            name={modalVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color={disabled ? colors.textLight : colors.text}
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>

      <PlacesSearchModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSelectPlace={handleSelectPlace}
        title={label || "Select Destination"}
        placeholder={`Search for ${placeholder.toLowerCase()}...`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    backgroundColor: "transparent",
  },
  arrowIcon: {
    position: "absolute",
    right: 12,
    top: 12,
    zIndex: 1,
  },
  errorContainer: {
    borderColor: colors.error,
  },
  disabledContainer: {
    opacity: 0.6,
  },
});

export default PlaceInput;
