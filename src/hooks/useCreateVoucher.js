import {useState} from "react";
import phorestApi from "../api/phorestApi";
import {DATE_FORMAT, VOUCHER_DURATION_MONTHS} from "../constants/constants";

export function useCreateVoucher(businessId, branchId, clientId) {

    const [isSuccess, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [expireDate, setExpireDate] = useState('')

    const createVoucher = async (amount, issueTime) => {
        console.log(issueTime)
        setLoading(true)
        try {
            const data = {
                clientId: clientId,
                creatingBranchId: branchId,
                voucherId: "v" + issueTime,
                issueDate: issueTime.format(DATE_FORMAT),
                expiryDate: issueTime.add(VOUCHER_DURATION_MONTHS, 'months').format(DATE_FORMAT),
                originalBalance: amount,
            }
            console.log(data)
            await phorestApi.post('/' + businessId + '/voucher', data)
                .then((response) => {
                    console.log(response)
                    const success = response.status === 201
                    setSuccess(success)
                    setErrorMessage(success ? "" : "Something went wrong")
                    setLoading(false)
                    setExpireDate(data.expiryDate)
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

    return [createVoucher, isSuccess, errorMessage, isLoading, expireDate]
}