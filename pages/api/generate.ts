// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createReadStream } from 'fs'
import path from 'path'
import { parse } from 'fast-csv'
import { getParagraph } from '../../lib/generateIpsum'
import { nanoid } from 'nanoid'

export type GenerateResponseData = {
  _key: string
  paragraph: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponseData[]>
) {
  return new Promise<void>((resolve, reject) => {
    const dirRelativeToPublicFolder = 'data'
    const dir = path.resolve('./public', dirRelativeToPublicFolder)
    const fileStream = createReadStream(path.join(dir, 'mgs1.csv'))

    const words: string[] = []
    const characters: string[] = []
    const locations: string[] = []

    try {
      const csvStream = parse({ headers: true })
        .on('error', (error) => console.error(error))
        .on('data', (row) => {
          row.Word && words.push(row.Word)
          row.Character && characters.push(row.Character)
          row.Location && locations.push(row.Location)
        })
        .on('end', () => {
          const allValues = [...words, ...characters, ...locations]
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
          resolve()
        })

      fileStream.pipe(csvStream)
    } catch (err) {
      console.error(err)
      res.status(500).end()
      resolve()
    }
  })
}
