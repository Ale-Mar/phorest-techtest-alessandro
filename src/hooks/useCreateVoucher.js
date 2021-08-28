import {useState} from "react";
import phorestApi from "../api/phorestApi";
import moment from "moment";
import {DATE_FORMAT} from "../constants/constants";

export function useCreateVoucher(businessId, branchId, clientId) {

    const [isSuccess, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setLoading] = useState(false)

    const createVoucher = async (amount) => {
        setLoading(true)
        const issueDate = moment().add('day')
            .format(DATE_FORMAT);
        const expiryDate = moment().add(2, 'months')
            .format(DATE_FORMAT);
        console.log(expiryDate)
        console.log("am:" + amount)
        try {

            const data = {
                clientId: clientId,
                creatingBranchId: branchId,
                expiryDate: expiryDate,
                issueDate: issueDate,
                originalBalance: amount,
                voucherId: "v" + issueDate
            }
            console.log(data);
            console.log("_____")
            await phorestApi.post('/' + businessId + '/voucher', data)
                .then((response) => {
                    console.log(response);
                    setSuccess(response.status === 201)
                    setErrorMessage(isSuccess ? "" : "Something went wrong")
                    setLoading(false)
                }, (error) => {
                    console.log(error);
                    setSuccess(false)
                    setLoading(false)
                    setErrorMessage("Something went wrong")
                });
        } catch (e) {
            console.log(e)
            setSuccess(false)
            setLoading(false)
            setErrorMessage("Something went wrong")
        }
    }

    return [createVoucher, isSuccess, errorMessage, isLoading]
}