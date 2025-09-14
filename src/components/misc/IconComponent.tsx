import { ViewStyle } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const iconConfig = {
  Airport: {
    icon: "flight-takeoff",
    component: MaterialIcons,
  },
  City: {
    icon: "location-city",
    component: MaterialIcons,
  },
  location: {
    icon: "place",
    component: MaterialIcons,
  },
  Hotel: {
    icon: "hotel",
    component: MaterialIcons,
  },
  Attraction: {
    icon: "attractions",
    component: MaterialIcons,
  },
} as const;

type IconComponentProps = {
  type: keyof typeof iconConfig;
  style?: ViewStyle;
  color?: string;
  size?: number;
};

const getSearchItemIcon = (props: IconComponentProps) => {
  const config = iconConfig[props.type];
  const IconComponent = config.component;

  if (!config) {
    return null;
  }

  return (
    <IconComponent
      name={config.icon as any}
      size={props.size || 20}
      color={props.color}
    />
  );
};

export default getSearchItemIcon;
