import * as React from 'react'
import { FaRegCopy, FaSyncAlt } from 'react-icons/fa'

type ToolbarProps = {
  capitalize: boolean
  setCapitalize: React.Dispatch<React.SetStateAction<boolean>>
  paragraphCount: number
  setParagraphCount: React.Dispatch<React.SetStateAction<number>>
  value: string
  resetParagraphs: () => void
}

const buttonStyle = `px-4 py-2 flex items-center justify-center transition-colors mr-1`
const labelStyle = `text-green-300 flex items-center justify-center`

const Toolbar = ({
  capitalize,
  setCapitalize,
  paragraphCount,
  setParagraphCount,
  value,
  resetParagraphs,
}: ToolbarProps) => {
  const [copyButtonColor, setCopyButtonColor] = React.useState('bg-green-500')
  return (
    <div className="flex flex-col justify-between gap-3 py-4 md:flex-row">
      <label className={labelStyle}>
        Paragraph count:
        <input
          type="number"
          min={1}
          value={paragraphCount}
          onChange={(e) => setParagraphCount(parseInt(e.target.value))}
          className="ml-2 w-24 border border-white bg-transparent px-2 py-1 text-green-300"
        ></input>
      </label>
      <label className={labelStyle}>
        Capitalize proper nouns?
        <input
          type="checkbox"
          className="ml-2"
          checked={capitalize}
          onChange={() => setCapitalize(!capitalize)}
        ></input>
      </label>
      <div className="flex">
        <button
          className={`${buttonStyle} ${copyButtonColor}`}
          onClick={() => {
            navigator.clipboard.writeText(value)
            setCopyButtonColor('bg-green-100')
            setTimeout(() => {
              setCopyButtonColor('bg-green-500')
            }, 1500)
          }}
        >
          <FaRegCopy />
        </button>
        <button
          className={`${buttonStyle} bg-green-500`}
          onClick={resetParagraphs}
        >
          <FaSyncAlt />
        </button>
      </div>
    </div>
  )
}

export default Toolbar
