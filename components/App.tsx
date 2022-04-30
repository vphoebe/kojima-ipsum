import { ParagraphWithKey } from '../lib/serialize'
import * as React from 'react'
import Paragraphs from './Paragraphs'
import Toolbar from './Toolbar'

const App = () => {
  const [paragraphCount, setParagraphCount] = React.useState(3)
  const [capitalize, setCapitalize] = React.useState(false)
  const [paragraphs, setParagraphs] = React.useState<ParagraphWithKey[]>([])
  const [isLoading, setLoading] = React.useState(true)
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    const getIpsumText = async () => {
      const response = await fetch(
        `/api/generate?count=${paragraphCount}&capitalize=${capitalize}`
      )
      const paragraphsData: ParagraphWithKey[] = await response.json()
      setParagraphs(paragraphsData)
      setLoading(false)
    }

    if (isLoading) {
      getIpsumText()
    }
  }, [paragraphCount, capitalize, isLoading])

  React.useEffect(() => {
    const newValue = paragraphs.map((p) => p.paragraph).join('\n\n')
    setValue(newValue)
  }, [paragraphs])

  return (
    <main className="h-screen flex-col bg-stone-900 px-8 font-mono lg:py-24">
      <div className="mx-auto flex h-full max-w-4xl flex-col">
        <h1 className="py-4 text-xl text-white">Kojima-ipsum</h1>
        <Paragraphs value={value} />
        <Toolbar
          isLoading={isLoading}
          setLoading={setLoading}
          capitalize={capitalize}
          setCapitalize={setCapitalize}
          paragraphCount={paragraphCount}
          setParagraphCount={setParagraphCount}
          value={value}
        />
      </div>
    </main>
  )
}

export default App
