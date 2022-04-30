// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getParagraphs, ParagraphWithKey } from '../../lib/serialize'
import { getAllValues } from '../../lib/data'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ParagraphWithKey[]>
) {
  try {
    const allValues = await getAllValues()
    const resData = getParagraphs(allValues)
    res.status(200).json(resData)
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}
