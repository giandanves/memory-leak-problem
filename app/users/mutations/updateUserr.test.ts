import { createMockContext } from "app/tests/utils/createMockedContext"
import updateUser from "./updateUser"

describe("update User tests", () => {
  it("should update user name and return it", async () => {
    const { res } = await createMockContext()

    const userUpdated = await updateUser({ name: "John" }, res.blitzCtx)

    expect(userUpdated).toMatchObject({
      name: "John",
    })
  })
})
