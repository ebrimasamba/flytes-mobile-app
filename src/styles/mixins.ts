import colors from "@/styles/colors"
import typography from "@/styles/typography"
import { StyleSheet } from "react-native"

const mixins = StyleSheet.create({
    label: {
        fontSize: 14,
        // marginBottom: 8,
        letterSpacing: -0.1,
        fontWeight: "500",
        color: colors.text,
    },
    inputText: {
        fontSize: 16,
        fontFamily: typography.p.fontFamily,
        fontWeight: typography.p.fontWeight,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 14,
        // borderRadius: 12,
        borderBottomWidth: 1,
        height: 50,
        // borderCurve: "continuous",
        backgroundColor: colors.white,
        borderColor: colors.lightGray,
        ...typography.p,
        letterSpacing: -0.1,
        fontSize: 16,
        color: colors.text,
    },
    inputSearch: {
        paddingLeft: 40,
    },
    inputFocused: {
        borderColor: colors.primary,
        backgroundColor: colors.white,

    },
    inputError: {
        borderColor: colors.danger,
    },
    expand: {
        flex: 1,
    },
    inputContainer: {
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 56,
        // shadowColor: colors.primary,
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.15,
        // shadowRadius: 4,
        // elevation: 3,
    },
    buttonMarginBottom: {
        marginBottom: 35,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        letterSpacing: -0.1,
    },
    formTitle: {
        fontSize: 22,
        marginBottom: 24,
    },
    infoText: {
        fontSize: 14,
        lineHeight: 1.6 * 14,
        opacity: 0.86,
    },
    // infoLink: {
    //     color: colors.blue,
    //     textDecorationLine: "underline",
    // },
    moveApart: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    softShadow: {
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.03,
        shadowRadius: 3.84,
        elevation: 0.5,
    }

})

export default mixins