import colors from "./colors"
import { PRIMARY_FONT_BOLD, PRIMARY_FONT_MEDIUM, PRIMARY_FONT_REGULAR, PRIMARY_FONT_SEMIBOLD } from "@/styles/fonts"

const typography = {
    h1: {
        fontSize: 28,
        fontFamily: PRIMARY_FONT_BOLD,
        color: colors.text,
        fontWeight: "bold",
        letterSpacing: -0.2,
    },
    h2: {
        fontSize: 18,
        fontFamily: PRIMARY_FONT_SEMIBOLD,
        color: colors.text,
        fontWeight: "600" as "600",
        letterSpacing: -0.1,
    },
    h3: {
        fontSize: 16,
        fontFamily: PRIMARY_FONT_MEDIUM,
        color: colors.text,
        fontWeight: "500" as "500",
        letterSpacing: -0.05,
    },
    p: {
        fontSize: 14,
        fontFamily: PRIMARY_FONT_REGULAR,
        color: colors.textLight,
        fontWeight: "400" as "400",
        letterSpacing: -0.05,
        lineHeight: 20,
    },
}

export default typography