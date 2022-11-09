import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async ({}, ctx) => {
  const user = await db.user.findFirst()

  if (!user) {
    return ""
  }

  return user?.name
})
