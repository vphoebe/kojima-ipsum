import * as React from 'react'
import { FaRegCopy, FaSyncAlt } from 'react-icons/fa'

type ToolbarProps = {
  capitalize: boolean
  setCapitalize: React.Dispatch<React.SetStateAction<boolean>>
  paragraphCount?: number
  setParagraphCount: React.Dispatch<React.SetStateAction<number | undefined>>
  value: string
  resetParagraphs: () => void
}

const buttonStyle = `px-4 py-2 flex items-center justify-center transition-colors flex-1`
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
      <div className="flex">
        <button
          className={`${buttonStyle} ${copyButtonColor} mr-1`}
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
      <label className={labelStyle}>
        Paragraphs:
        <input
          type="number"
          pattern="\d*"
          value={paragraphCount ?? ''}
          onChange={(e) => {
            if (e.target.value) {
              setParagraphCount(parseInt(e.target.value))
            } else {
              setParagraphCount(undefined)
            }
          }}
          className="ml-2 w-12 border border-white bg-transparent p-1 text-center text-xl text-green-300"
        ></input>
      </label>
      <label className={labelStyle}>
        Capitalize proper nouns?
        <input
          type="checkbox"
          className="form-checkbox ml-2 h-6 w-6 border-green-100 bg-transparent text-green-600"
          checked={capitalize}
          onChange={() => setCapitalize(!capitalize)}
        ></input>
      </label>
    </div>
  )
}

export default Toolbar
