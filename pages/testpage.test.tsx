import { QueryClient, QueryClientProvider, useQuery } from "@blitzjs/rpc"
import { render, screen } from "@testing-library/react"
import getUser from "app/users/queries/getUsers"
import MyPage from "./testpage"
import userEvent from "@testing-library/user-event"

const queryFn = jest.fn()

function useCustomHook() {
  return useQuery(getUser, {}, {})
}

describe("Exams Page", () => {
  //  const [data, status] = useQuery(getUsers, {}, { suspense: false })
  const queryClient = new QueryClient()

  test("The exams list will be shown", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MyPage />
      </QueryClientProvider>
    )

    //  const userName = await screen.findByText(data!)
    // expect(userName).toBeInTheDocument()
    const input = await screen.findByRole("textbox")
    const button = await screen.findByRole("button")

    await userEvent.type(input, "John")

    await userEvent.click(button)
    // expect(userName).not.toBeInTheDocument()

    const newName = await screen.findByText("John")
    expect(newName).toBeInTheDocument()
  })
})
