import type { GetStaticProps, NextPage } from 'next'
import React from 'react'
import { GenerateResponseData } from './api/generate'

const Home: NextPage = () => {
  const [paragraphs, setParagraphs] = React.useState<GenerateResponseData[]>([])

  React.useEffect(() => {
    const getIpsumText = async () => {
      const response = await fetch('/api/generate')
      const paragraphsData: GenerateResponseData[] = await response.json()
      setParagraphs(paragraphsData)
    }
    getIpsumText()
  }, [])
  return (
    <div>
      {paragraphs.map((p) => (
        <p key={p._key} className="mb-4">
          {p.paragraph}
        </p>
      ))}
    </div>
  )
}

export default Home
