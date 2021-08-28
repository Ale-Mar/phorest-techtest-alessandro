import React from "react"
import {renderHook} from '@testing-library/react-hooks'
import {useCreateVoucher} from "../../hooks/useCreateVoucher"
import mockAxios from "axios"
import {waitFor} from "@testing-library/react"
import TestRenderer from 'react-test-renderer'
import moment from "moment";

const {act} = TestRenderer

test("create voucher ", async () => {
    mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
            status: 201
        })
    )

    const {result} = renderHook(() => useCreateVoucher("business_id", "branch_id", "client_id"))
    act(() => {
        result.current[0](120, moment(1520168634021))
    })

    await waitFor(() => {
        expect(mockAxios.post).toHaveBeenCalledTimes(1)

        expect(mockAxios.post).toHaveBeenCalledWith(
            "/business_id/voucher",
            {
                clientId: "client_id",
                creatingBranchId: "branch_id",
                expiryDate: "2018-05-04T01:03:54",
                issueDate: "2018-03-04T01:03:54",
                originalBalance: 120,
                voucherId: "v1520168634021"
            }
        )
        expect(result.current[1]).toBe(true)//isSuccess
        expect(result.current[2]).toBe("")//errorMessage
        expect(result.current[3]).toBe(false) //isLoading
        expect(result.current[4]).toBe("2018-05-04T01:03:54") //isLoading
    })
})

test("create voucher should fail when status is not 201", async () => {
    mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
            status: 404
        })
    )

    const {result} = renderHook(() => useCreateVoucher("business_id", "branch_id", "client_id"))
    act(() => {
        result.current[0](120, moment(1520168634021))
    })

    await waitFor(() => {
        expect(result.current[1]).toBe(false)//isSuccess
        expect(result.current[2]).toBe("Something went wrong")//errorMessage
        expect(result.current[3]).toBe(false) //isLoading
    })
})
