import { parse } from 'fast-csv'
import { createReadStream, PathLike, readdirSync } from 'fs'
import path from 'path'

async function getValuesFromCsvFile(path: PathLike): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const returnValues: string[] = []
    const fileStream = createReadStream(path)
    const parseStream = parse({ headers: true })
      .on('error', (error) => reject(error))
      .on('data', (row) => {
        const columns = Object.keys(row)
        columns.forEach((col) => row[col] && returnValues.push(row[col]))
      })
      .on('end', () => {
        resolve(returnValues)
      })
    fileStream.pipe(parseStream)
  })
}

export async function getAllValues(): Promise<string[]> {
  const dataDir = path.resolve('./public', 'data')
  const dataFiles = readdirSync(dataDir)
  const csvFilenames = dataFiles.filter((f) => f.includes('.csv'))

  const csvValuePromises = csvFilenames.map((fn) =>
    getValuesFromCsvFile(path.join(dataDir, fn))
  )

  const allValues = await Promise.all(csvValuePromises)
  return allValues.flat()
}
