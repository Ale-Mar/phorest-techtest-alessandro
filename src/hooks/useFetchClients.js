import phorestApi from "../api/phorestApi";
import {useEffect, useState} from "react";

export function useFetchClients(businessId) {
    const [results, setResults] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setLoading] = useState(false)

    const fetchClients = async (emailValue) => {
        console.log("fetchClients by: " + emailValue)

        try {
            setLoading(true)
            const response = await phorestApi.get('/' + businessId + '/client', {
                params: {
                    email: emailValue
                }
            })
            console.log(response.data)
            if (response.data.page.totalElements > 0) {
                console.log("Clients retrieved")
                setResults(response.data._embedded.clients)
                setErrorMessage("")
            } else {
                console.log("Empty Clients list")
                setResults([])
                setErrorMessage('No results found')
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setResults([])
            setErrorMessage('Something went wrong')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchClients('')
    },[])

    return [fetchClients, results, errorMessage, isLoading]
}
