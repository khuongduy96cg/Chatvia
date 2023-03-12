import Head from 'next/head'
import React, { ReactNode } from 'react';
import Spinner from './spinner/Spinner';
import Toast from './Toast/Toast';

// import Header from "../components/header";
// import Footer from "../components/footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* <Header /> */}
      <Head>
        <title>Chatvia App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toast />
      <Spinner />
      {children}
      {/* <Footer /> */}
    </>
  );
};