import { ParagraphWithKey } from '../lib/serialize'

type ParagraphsProps = {
  value: string
}

const Paragraphs = ({ value }: ParagraphsProps) => {
  return (
    <div className="flex-1 border-2 border-white bg-stone-900 md:max-h-[512px]">
      <textarea
        className="mb-4 h-full w-full resize-none border-0 bg-transparent p-4 text-justify text-sm leading-tight text-green-300 md:text-base"
        value={value}
        readOnly
      ></textarea>
    </div>
  )
}

export default Paragraphs
