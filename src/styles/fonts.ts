import { Platform } from "react-native";


export const PRIMARY_FONT_REGULAR = Platform
    .select({
        ios: "Figtree Regular",
        android: "Figtree_400Regular",
    });
export const PRIMARY_FONT_MEDIUM = Platform.select({
    ios: "Figtree Medium",
    android: "Figtree_500Medium",
});
export const PRIMARY_FONT_LIGHT = Platform.select({
    ios: "Figtree Light",
    android: "Figtree_400Regular",
});
export const PRIMARY_FONT_BOLD = Platform.select({
    ios: "Figtree Bold",
    android: "Figtree_700Bold",
});
export const PRIMARY_FONT_SEMIBOLD = Platform.select({
    ios: "Figtree SemiBold",
    android: "Figtree_600SemiBold",
});