import React from 'react'
import {View, StyleSheet, TextInput} from "react-native"
import {Feather} from '@expo/vector-icons'

const SearchBox = ({email, onEmailChange}) => {

    return <View style={styles.backgroundStyle}>
        <Feather name="search" style={styles.iconStyle}/>
        <TextInput autoCorrect={false}
                   autoCapitalize="none"
                   placeholder="Email"
                   style={styles.inputStyle}
                   value={email} onChangeText={onEmailChange}
        />
    </View>
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#EEEEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15, marginTop: 10,
        flexDirection: 'row'
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        marginHorizontal: 15,
        fontSize: 35,
        alignSelf: 'center'
    }
})

export default SearchBox