import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/clients'

const Page = async () => {
    const router = useRouter()

    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    trpc.authCallback.useQuery(undefined, {
        onSuccess: ({success}) => {
            if(success) {
                // user is synced with database
            router.push(origin ? '/${origin}' : '/dashboard')
            }
        },
        onError: (error) => {
            if(error.data?.code === "UNAUTHORIZED") {
                // user is not authenticated
                router.push('/sign-in')
            }
        },
        retry: true,
        retryDelay: 500,
    }) 
}

export default Page