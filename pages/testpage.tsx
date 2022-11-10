import { getQueryClient, getQueryKey, invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import updateUser from "app/users/mutations/updateUser"
import getUser from "app/users/queries/getUsers"
import { useState } from "react"

function MyPage() {
  const [updateUserName] = useMutation(updateUser)
  const [data, status] = useQuery(getUser, {}, { suspense: false })

  const client = getQueryClient()
  const [key, meta] = getQueryKey(getUser)

  const [name, setName] = useState("")
  return (
    <div>
      <p>
        <>
          Nome atual: <span>{data}</span>
        </>
      </p>
      Insira o nome
      <input onChange={(e) => setName(e.target.value)}></input>
      <button
        onClick={async () => {
          await updateUserName({ name })
          await invalidateQuery(getUser)
        }}
      >
        Enviar
      </button>
    </div>
  )
}
export default MyPage
