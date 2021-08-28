import React, {useState} from "react"
import {Button, ScrollView, StyleSheet, Text, TextInput, View} from "react-native"
import Dialog from "react-native-dialog"
import {useCreateVoucher} from "../hooks/useCreateVoucher"
import {BRANCH_ID, BUSINESS_ID} from "../constants/constants"
import * as Progress from 'react-native-progress'
import moment from "moment";

const DetailScreen = ({navigation}) => {

    const item = navigation.getParam('data')
    const [amount, setAmount] = useState('')
    const [createVoucher, isSuccess, errorMessage, isLoading, expireDate] = useCreateVoucher(BUSINESS_ID, BRANCH_ID, item.clientId)
    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.clientText}>Name: {item.firstName}</Text>
            <Text style={styles.clientText}>Surname: {item.lastName}</Text>
            <Text style={styles.clientText}>Email: {item.email}</Text>
            <Text style={styles.clientText}>Mobile: {item.mobile}</Text>
            <TextInput value={amount} onChangeText={setAmount} style={styles.amountBox} keyboardType='numeric'/>
            <Text>{!isSuccess ? errorMessage : null}</Text>
            <Button title="Send a Voucher" onPress={
                () => {
                    createVoucher(parseFloat(amount), moment())
                }
            }/>
            {isLoading ?
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: "center"
                }}><Progress.Circle size={50} indeterminate={true}/></View>
                :
                null}
            <View>
                <Dialog.Container visible={isSuccess}>
                    <Dialog.Title>Voucher created!</Dialog.Title>
                    <Dialog.Description>
                        The voucher of {amount}€ was created it
                        {"\n\n"}
                        (Expiration date:{expireDate})
                    </Dialog.Description>
                    <Dialog.Button label="Ok" onPress={() => {
                        navigation.goBack()
                    }}/>
                </Dialog.Container>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    scrollView: {
        marginTop: 10,
        padding: 16,
        flexGrow: 1
    },
    clientText: {
        fontSize: 18
    },
    amountBox: {
        paddingStart: 5,
        height: 50,
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
        backgroundColor: '#EEEEEE'
    }
})

export default DetailScreen