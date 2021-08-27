import {Text, View, StyleSheet, Button, FlatList, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {useFetchClients} from "../hooks/useFetchClients";
import SearchBox from "../components/SearchBox";
import {withNavigation} from "react-navigation";
import * as Progress from 'react-native-progress';
import {BUSINESS_ID} from "../constants/constants";

const HomeScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [fetchClients, results, errorMessage, isLoading] = useFetchClients(BUSINESS_ID)

    return (
        <View style={styles.container}>
            <Text style={styles.searchText}>Search: </Text>
            <SearchBox email={email} onEmailChange={setEmail}/>
            <Text>{errorMessage}</Text>

            <Button testID="search_button" title="Search Client" onPress={() => {
                fetchClients(email)
            }}/>

            <FlatList style={styles.list} data={results}
                      keyExtractor={(item => item.clientId)}
                      renderItem={
                          ({item}) => {
                              return (
                                  <TouchableOpacity onPress={() =>
                                      navigation.navigate('Detail', {data: item})
                                  }>
                                      <View style={styles.clientRow}>
                                          <Text style={styles.clientText}>{item.firstName} {item.lastName}</Text>
                                          <Text style={styles.clientEmail}>{item.email}</Text>
                                      </View>
                                  </TouchableOpacity>)
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
                : null}
        </View>)
}
export default withNavigation(HomeScreen)

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    searchText: {},
    list: {
        marginTop: 30
    },
    clientRow: {
        borderBottomWidth: 1,
        flexDirection: "column",
        height: 52,
        justifyContent: 'center',
        alignItems: "flex-start",
    },
    clientText: {
        fontSize: 16
    },
    clientEmail: {
        fontSize: 14,
        color: '#555'
    }
})