// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getParagraphs, ParagraphWithKey } from '../../lib/serialize'
import { getAllValues } from '../../lib/data'

function getStringFromPossibleArray(input: string | string[]) {
  if (Array.isArray(input)) {
    return input[0]
  } else {
    return input
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ParagraphWithKey[]>
) {
  try {
    const { count, capitalize } = req.query
    const parsedCount = parseInt(getStringFromPossibleArray(count))
    const parsedCapitalize = Boolean(
      JSON.parse(getStringFromPossibleArray(capitalize))
    )

    const allValues = await getAllValues()
    const resData = getParagraphs(
      allValues,
      parsedCount <= 10 ? parsedCount : 10,
      parsedCapitalize
    )
    res.status(200).json(resData)
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}
