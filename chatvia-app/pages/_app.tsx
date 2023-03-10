import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { SessionProvider, signIn, useSession } from "next-auth/react"
import type { AppProps, AppType } from 'next/app';
import { store } from '../redux/store';
import React from 'react';
import { WithAuthentication } from '@/interfaces/auth';
import { Session } from 'next-auth';

import { NEXTAUTH_STATUS } from '@/types/constant'

/**
 * Needed to infer requiresAuthentication as a prop of Component
 */
type ComponentWithAuthentication<P> = P & {
  Component: WithAuthentication
}

const App: AppType<{ session: Session | null }> = props => {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props as ComponentWithAuthentication<typeof props>

  // const OptionalAuthGuard = Component.requiresAuthentication
  //   ? AuthGuard
  //   : Fragment

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {Component.requiresAuthentication ? (<Auth> <Component {...pageProps} /> </Auth>) : (<Component {...pageProps} />)
        }
      </Provider>
    </SessionProvider>
  )
}

export default App

// export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
//   return (
//     <SessionProvider session={session}>
//       <Provider store={store}>
//         {Component.auth ? (<Auth> <Component {...pageProps} /> </Auth>) : (<Component {...pageProps} />)
//         }
//       </Provider>
//     </SessionProvider>
//   );
// }

function Auth({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status, data: session } = useSession({ required: true })
  const loading = status === NEXTAUTH_STATUS.LOADING
  const isUser = !!session?.user

  //console.log('=========_app.tsx session=======', session)

  React.useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, loading])

  if (isUser) {
    return children
  }
  
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}