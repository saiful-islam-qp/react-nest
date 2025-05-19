import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React from 'react'

export const AppProviders: React.FC<React.PropsWithChildren> = ({children}) => {
  // Create a client using ref to avoid re-creating it on every render
  const queryClientRef = React.useRef<QueryClient | null>(null)
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
    </QueryClientProvider>
  )
}
