// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getParagraph } from '../../lib/serialize'
import { nanoid } from 'nanoid'
import { getAllValues } from '../../lib/data'

export type GenerateResponseData = {
  _key: string
  paragraph: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponseData[]>
) {
  try {
    const allValues = await getAllValues()
    console.log(allValues)
    const paragraphCount = 4 // todo: make param
    const paragraphs: string[] = []
    for (let i = 0; i < paragraphCount; i++) {
      const paragraph = getParagraph(allValues)
      paragraphs.push(paragraph)
    }
    const resData = paragraphs.map((p) => ({
      _key: nanoid(),
      paragraph: p,
    }))
    res.status(200).json(resData)
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}
