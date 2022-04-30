import { ParagraphWithKey } from '../lib/serialize'

type ParagraphsProps = {
  value: string
}

const Paragraphs = ({ value }: ParagraphsProps) => {
  return (
    <div className="flex-1 border-2 border-white bg-stone-900 p-4">
      <textarea
        className="mb-4 h-full w-full resize-none bg-transparent text-justify leading-tight text-green-300"
        value={value}
        readOnly
      ></textarea>
    </div>
  )
}

export default Paragraphs
