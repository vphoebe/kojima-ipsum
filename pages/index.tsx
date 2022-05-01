import type { GetStaticProps, NextPage } from 'next'
import React from 'react'
import App, { AppProps } from '../components/App'
import { getAllValues } from '../lib/data'

interface IndexProps extends AppProps {}

const Index: NextPage<IndexProps> = ({ allValues }) => {
  return <App allValues={allValues} />
}

export default Index

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  return {
    props: {
      allValues: await getAllValues(),
    },
  }
}
