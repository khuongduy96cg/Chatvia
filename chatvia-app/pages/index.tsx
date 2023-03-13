import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { NEXTAUTH_STATUS, ROUTES } from '@/types/constant'
import Spinner from "@/components/spinner/Spinner";

export default function Index() {

  const { status, data: session } = useSession();
  const router = useRouter();

  //console.log('index session========', session);

  useEffect(() => {
    if (status === NEXTAUTH_STATUS.AUTHENTICATED) {
      router.push(ROUTES.HOME);
    }
  }, [status]);

  if (status === NEXTAUTH_STATUS.LOADING) {
    return (<Spinner />)
  }
  else if (status === NEXTAUTH_STATUS.UNAUTHENTICATED) {
    return (
      <Layout>
        <h1>NextAuth.js Example</h1>
        <p>
          This is an example site to demonstrate how to use{" "}
          <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication. <br />
          <a href={ROUTES.LOGIN}>Go to Login page</a>
        </p>
      </Layout>
    )
  }
}