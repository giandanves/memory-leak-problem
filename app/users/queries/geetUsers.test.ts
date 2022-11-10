import { createMockContext } from "app/tests/utils/createMockedContext"
import db from "db"
import getUser from "./getUsers"

beforeEach(async () => {
  await db.$reset()
})

describe("get User tests", () => {
  it("should return an empty string when db is empty", async () => {
    const { res } = await createMockContext()

    const user = await getUser({}, res.blitzCtx)

    expect(user).toBe("")
  })

  it("should return user name", async () => {
    const { res } = await createMockContext()

    await db.user.create({
      data: {
        name: "Richard",
        email: "Richard@doe.com",
      },
    })

    const user = await getUser({}, res.blitzCtx)

    expect(user).toBe("Richard")
  })
})
