import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

const Page = () => {
    const { getUser} = getKindeServerSession()
    const user = getUser()

    if(!user || !user.id) redirect('/auth-callback?origin=dahsboard') // redirect to login page if user is not logged in 

    return <div>{user.email}</div>
}

export default Page