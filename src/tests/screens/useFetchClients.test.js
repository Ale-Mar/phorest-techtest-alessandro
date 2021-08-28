import React from "react";
import {renderHook} from '@testing-library/react-hooks'
import {useFetchClients} from "../../hooks/useFetchClients";
import mockAxios from "axios";
import {waitFor} from "@testing-library/react";
import TestRenderer from 'react-test-renderer'
const {act} = TestRenderer;

test('should show error and not loading when empty email', async () => {
    const {result} = renderHook(() => useFetchClients("eTC3QY5W3p_HmGHezKfxJw"))
    act(() => {
        result.current[0]("")
    })
    expect(result.current[2]).toBe("Please insert an email")//errorMessage
    expect(result.current[3]).toBe(false) //isLoading
})

test("fetches data ", async () => {
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            status: 200,
            data: {
                _embedded: {
                    clients: [{
                        clientId: "qK-D5vlBOSzrlRfYnkHMcg"
                    }]
                },
                page: {
                    totalElements: 1
                }
            },
        })
    );

    const {result} = renderHook(() => useFetchClients("eTC3QY5W3p_HmGHezKfxJw"))
    act(() => {
        result.current[0]("victoriaz@gamil.com")
    })

    await waitFor(() => {
        expect(mockAxios.get).toHaveBeenCalledTimes(1);

        expect(mockAxios.get).toHaveBeenCalledWith(
            "/eTC3QY5W3p_HmGHezKfxJw/client",
            {
                params: {
                    email: "victoriaz@gamil.com"
                }
            }
        );
        expect(result.current[1].length).toBe(1)//results
        expect(result.current[2]).toBe("")//errorMessage
        expect(result.current[3]).toBe(false) //isLoading
    })
})

test('should show error and not loading when no results retrieved', async () => {
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            status: 200,
            data: {
                page: {
                    totalElements: 0
                }
            },
        })
    );
    const {result} = renderHook(() => useFetchClients("eTC3QY5W3p_HmGHezKfxJw"))
    act(() => {
        result.current[0]("victoriaz@gamil.com")
    })

    await waitFor(() => {
        expect(result.current[1].length).toBe(0)//results
        expect(result.current[2]).toBe("No results found")//errorMessage
        expect(result.current[3]).toBe(false) //isLoading
    })
})

test('should show error and not loading when status is not 200', async () => {
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            status: 404,
            data: {
                page: {
                    totalElements: 0
                }
            },
        })
    );
    const {result} = renderHook(() => useFetchClients("eTC3QY5W3p_HmGHezKfxJw"))
    act(() => {
        result.current[0]("victoriaz@gamil.com")
    })

    await waitFor(() => {
        expect(result.current[1].length).toBe(0)//results
        expect(result.current[2]).toBe("Something went wrong")//errorMessage
        expect(result.current[3]).toBe(false) //isLoading
    })
})
