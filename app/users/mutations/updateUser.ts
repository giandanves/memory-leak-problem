import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateUser = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(UpdateUser), async ({ name }, ctx) => {
  const alreadyHasUser = await db.user.findFirst()
  if (!alreadyHasUser) {
    await db.user.create({
      data: {
        name: "John",
        email: "John@doe.com",
      },
    })
  }

  const user = await db.user.update({
    where: {
      id: 1,
    },
    data: {
      name,
    },
  })
  return user
})
