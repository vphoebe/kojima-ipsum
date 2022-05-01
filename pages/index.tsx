import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import App, { AppProps } from '../components/App'
import { getAllValues } from '../lib/data'

interface IndexProps extends AppProps {}

const Index: NextPage<IndexProps> = ({ allValues }) => {
  return (
    <>
      <Head>
        <title>Kojima-ipsum</title>
      </Head>
      <App allValues={allValues} />
    </>
  )
}

export default Index

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  return {
    props: {
      allValues: await getAllValues(),
    },
  }
}
