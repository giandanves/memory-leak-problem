import {
  invalidateQuery,
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@blitzjs/rpc"
import { render, screen } from "@testing-library/react"
import MyPage from "../../pages/testpage"
import userEvent from "@testing-library/user-event"
import React from "react"

const queryFn = jest.fn((name) => name)

jest.mock("@blitzjs/rpc", () => {
  const realBlitz = jest.requireActual("@blitzjs/rpc")

  return {
    ...realBlitz,
    useQuery: jest.fn(),
    useMutation: jest.fn(),
    invalidateQuery: jest.fn(),
  }
})

function setSuccessResponseMutation(response: jest.Mock<any, [values: object]>) {
  //@ts-ignore
  useMutation.mockImplementation(function useMockedMutation() {
    const { useState, useEffect }: typeof React = require("react")

    const [mutationResult, setMutationResult] = useState<any>([
      response,
      { isError: false, isSuccess: true, isLoading: false },
    ])

    return mutationResult
  })
}

function setSuccessResponseQuery(response: string) {
  //@ts-ignore
  useQuery.mockImplementation(function useMockedQuery() {
    const { useState, useEffect }: typeof React = require("react")

    const [queryResult, setQueryResult] = useState<any>([
      undefined,
      { isError: false, isFetched: false, isSuccess: false, isLoading: true },
    ])

    useEffect(() => {
      setTimeout(() => {
        setQueryResult([
          response,
          {
            isError: false,
            isFetched: true,
            isSuccess: true,
            isLoading: false,
          },
        ])
      }, 100)
    }, [])

    return queryResult
  })
}
describe("Test Page", () => {
  test("The user clicks submit button and the mutation is called", async () => {
    const queryClient = new QueryClient()
    setSuccessResponseMutation(queryFn)
    setSuccessResponseQuery("Jack")
    //@ts-ignore
    invalidateQuery.mockImplementation()

    render(
      <QueryClientProvider client={queryClient}>
        <MyPage />
      </QueryClientProvider>
    )

    const userName = await screen.findByText("Jack")
    expect(userName).toBeInTheDocument()
    const input = await screen.findByRole("textbox")
    const button = await screen.findByRole("button")

    await userEvent.type(input, "John")

    await userEvent.click(button)
    expect(queryFn).toBeCalledWith({ name: "John" })
  })
})
