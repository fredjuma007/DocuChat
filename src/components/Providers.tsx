"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc } from "@/app/_trpc/clients"
import { httpBatchLink } from "@trpc/client"
import { PropsWithChildren, useState } from "react";


const Providers = ({children}: PropsWithChildren) => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() => 
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "http://localhost:3000/api/trpc",
                    }),
                ],
            }),
        )

    return (
       <trpc.Provider 
       client={trpcClient} 
       queryClient={queryClient} >
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
         </trpc.Provider>
    )
}

export default Providers;