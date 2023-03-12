import { Provider } from 'react-redux';
import { SessionProvider, signIn, useSession } from "next-auth/react"
import type { AppProps, AppType } from 'next/app';
import React, { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';

import { store } from '../redux/store';

import { NEXTAUTH_STATUS } from '@/types/constant'
import Spinner from '@/components/spinner/Spinner';
import { WithAuthentication } from '@/interfaces/auth';

import '@/styles/globals.css';

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

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      console.log("loading start")
      setLoading(true)
    };
    const end = () => {
      console.log("loading finished")
      setLoading(false)
    };
    router.events.on("routeChangeStart", start)
    router.events.on("routeChangeComplete", end)
    router.events.on("routeChangeError", end)
    return () => {
      router.events.off("routeChangeStart", start)
      router.events.off("routeChangeComplete", end)
      router.events.off("routeChangeError", end)
    };
  }, [])

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {
          Component.requiresAuthentication
          ? (<Auth> <Component {...pageProps} /> </Auth>)
          : (
            loading ? (<Spinner />) : (<Component {...pageProps} />)  
            )
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
  return <Spinner />
}