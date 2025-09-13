import { View, Text, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";
import P from "./P";
import { colors } from "../../styles";

const Li = (props: PropsWithChildren) => {
    return (
        <View style={styles.listContainer}>
            <View style={styles.disc} />
            <P style={styles.text}>{props.children}</P>
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    disc: {
        backgroundColor: colors.primary,
        width: 4,
        height: 4,
        borderRadius: 50,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
    },
});

export default Li;
