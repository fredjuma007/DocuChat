import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/clients'

const Page = async () => {
    const router = useRouter()

    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')


    const {data, isLoading} = trpc.authCallback.useQuery(undefined, {
        onSuccess: ({success}) => {
            if(success) {
                // user is synced with database
            router.push(origin ? '/${origin}' : '/dashboard')
            }
        }
    }) 
}

export default Page