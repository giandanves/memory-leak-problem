import { Role } from "types"
import httpMocks from "node-mocks-http"
import { authConfig } from "app/blitz-client"
import { AuthServerPlugin, getSession, PrismaStorage } from "@blitzjs/auth"
import db from "db"
import { Ctx, setupBlitzServer } from "@blitzjs/next"

interface CreateMockContextOptions {
  role?: Role
  userId?: number
  reqOptions?: httpMocks.RequestOptions
  resOptions?: httpMocks.ResponseOptions
}

export async function createMockContext<C extends Ctx>(options: CreateMockContextOptions = {}) {
  const { userId, role = "USER", reqOptions, resOptions } = options
  const { req: mockReq, res: mockRes } = httpMocks.createMocks<any, any>(reqOptions, resOptions)

  setupBlitzServer({
    plugins: [
      AuthServerPlugin({
        ...authConfig,
        storage: PrismaStorage(db),
        isAuthorized: (ctx) => {
          if (ctx.args) {
            const [endpointRole] = ctx.args as string[]

            if (!endpointRole) {
              return userId != null
            }

            if (Array.isArray(endpointRole)) {
              return userId != null && endpointRole.includes(role)
            }

            return userId != null && role === endpointRole
          }
          return userId != null
        },
      }),
    ],
  })

  // Ensures the response has the blitzCtx object which is required for
  // authorization checks.
  await getSession(mockReq, mockRes)

  // Simulate the session is authorized to a user, if an ID was provided.
  if (userId) mockRes.blitzCtx.session.$publicData.userId = userId
  if (role) mockRes.blitzCtx.session.$publicData.role = role

  mockRes.blitzCtx.session.$create = jest.fn()

  return { req: mockReq, res: mockRes }
}
