import type { NextPage } from 'next'
import React from 'react'
import { ParagraphWithKey } from '../lib/serialize'

const Home: NextPage = () => {
  const [paragraphCount, setParagraphCount] = React.useState(3)
  const [capitalize, setCapitalize] = React.useState(true)
  const [paragraphs, setParagraphs] = React.useState<ParagraphWithKey[]>([])

  React.useEffect(() => {
    const getIpsumText = async () => {
      const response = await fetch(
        `/api/generate?count=${paragraphCount}&capitalize=${capitalize}`
      )
      const paragraphsData: ParagraphWithKey[] = await response.json()
      setParagraphs(paragraphsData)
    }
    getIpsumText()
  }, [paragraphCount, capitalize])

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
