import { getParagraphs, ParagraphWithKey } from '../lib/serialize'
import * as React from 'react'
import Paragraphs from './Paragraphs'
import Toolbar from './Toolbar'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

export type AppProps = {
  allValues: string[]
}

const App = ({ allValues }: AppProps) => {
  const [paragraphCount, setParagraphCount] = React.useState(3)
  const [capitalize, setCapitalize] = React.useState(false)
  const [paragraphs, setParagraphs] = React.useState<ParagraphWithKey[]>([])

  const serializedValue = React.useMemo(
    () => paragraphs.map((p) => p.paragraph).join('\n\n'),
    [paragraphs]
  )

  const resetParagraphs = React.useCallback(() => {
    const newParagraphs = getParagraphs(allValues, paragraphCount, capitalize)
    setParagraphs(newParagraphs)
  }, [allValues, paragraphCount, capitalize])

  React.useEffect(() => {
    resetParagraphs()
  }, [allValues, paragraphCount, capitalize, resetParagraphs])

  return (
    <main className="absolute inset-0 flex-col bg-stone-900 px-8 font-mono lg:py-24">
      <div className="mx-auto flex h-full max-w-4xl flex-col">
        <div className="flex items-center justify-between">
          <h1 className="py-4 text-xl text-white">Kojima-ipsum</h1>
          <Link href="https://github.com/vphoebe/kojima-ipsum" passHref>
            <a>
              <FaGithub className="ml-4 fill-stone-600 transition-colors hover:fill-white" />
            </a>
          </Link>
        </div>
        <Paragraphs value={serializedValue} />
        <Toolbar
          capitalize={capitalize}
          setCapitalize={setCapitalize}
          paragraphCount={paragraphCount}
          setParagraphCount={setParagraphCount}
          value={serializedValue}
          resetParagraphs={resetParagraphs}
        />
      </div>
    </main>
  )
}

export default App
