import colors from "@/styles/colors"
import typography from "@/styles/typography"
import { StyleSheet } from "react-native"

const mixins = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        flexGrow: 1,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
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
        borderRadius: 8,
        height: 50,
        borderCurve: "continuous",
        backgroundColor: colors.gray,
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
        borderWidth: 1.5,
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
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 56,
        overflow: "hidden",

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
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: colors.gray,
        borderColor: colors.lightGray,
        borderCurve: "continuous",
    },
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
    },
    // Screen Layout Styles
    screenContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 35,
    },
    logo: {
        width: 60,
        height: 60,
    },
    logoText: {
        fontSize: 24,
        textAlign: "center",
    },
    formContainer: {},
    formTitleContainer: {
        marginBottom: 30,
    },
    screenFormTitle: {
        fontSize: 28,
        textAlign: "center",
        marginBottom: 10,
    },
    screenFormDescription: {
        textAlign: "center",
    },
    screenInputContainer: {
        marginBottom: 30,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    checkboxText: {
        fontSize: 14,
        textAlign: "center",
        color: colors.textLight,
    },
    primaryButton: {
        marginTop: 30,
    },
    signupContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        marginTop: 10,
    },
    signupText: {
        fontSize: 14,
        textAlign: "center",
        color: colors.textLight,
    },
    signupLink: {
        fontSize: 14,
        textAlign: "center",
        color: colors.primary,
    },

})

export default mixins