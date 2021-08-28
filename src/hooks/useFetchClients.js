import phorestApi from "../api/phorestApi";
import {useState} from "react";

export function useFetchClients(businessId) {
    const [results, setResults] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setLoading] = useState(false)

    const fetchClients = async (email) => {
        console.log("fetchClients by: " + email)

        if (email === '') {
            setErrorMessage("Please insert an email")
            return
        }
        try {
            setLoading(true)
            const response = await phorestApi.get('/' + businessId + '/client', {
                params: {
                    email: email
                }
            })
            console.log(response.data)
            if (response.status !== 200) {
                setResults([])
                setErrorMessage('Something went wrong')
            } else if (response.data.page.totalElements > 0) {
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

    return [fetchClients, results, errorMessage, isLoading]
}
