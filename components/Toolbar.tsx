const buttonStyle = `px-4 py-2 flex items-center justify-center transition-colors`
const labelStyle = `text-green-300 flex items-center justify-center`
import * as React from 'react'
import { FaRegCopy, FaSpinner } from 'react-icons/fa'

type ToolbarProps = {
  isLoading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  capitalize: boolean
  setCapitalize: React.Dispatch<React.SetStateAction<boolean>>
  paragraphCount: number
  setParagraphCount: React.Dispatch<React.SetStateAction<number>>
  value: string
}

const Toolbar = ({
  isLoading,
  setLoading,
  capitalize,
  setCapitalize,
  paragraphCount,
  setParagraphCount,
  value,
}: ToolbarProps) => {
  const [copyButtonText, setCopyButtonText] = React.useState('Copy')
  const [copyButtonColor, setCopyButtonColor] = React.useState('bg-green-500')
  return (
    <div className="flex flex-col justify-between gap-3 py-4 md:flex-row">
      <button
        className={`${buttonStyle} ${copyButtonColor}`}
        onClick={() => {
          navigator.clipboard.writeText(value)
          setCopyButtonText('Copied!')
          setCopyButtonColor('bg-green-100')
          setTimeout(() => {
            setCopyButtonText('Copy')
            setCopyButtonColor('bg-green-500')
          }, 1500)
        }}
      >
        <FaRegCopy className="mr-2" />
        {copyButtonText}
      </button>
      <label className={labelStyle}>
        Paragraph count:
        <input
          type="number"
          max={10}
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
      <button
        className={`${buttonStyle} bg-green-500`}
        onClick={() => setLoading(true)}
      >
        {isLoading ? <FaSpinner className="mr-2 animate-spin" /> : null}
        Generate
      </button>
    </div>
  )
}

export default Toolbar
