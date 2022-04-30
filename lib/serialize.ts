import { nanoid } from 'nanoid'

export type ParagraphWithKey = {
  _key: string
  paragraph: string
}

export function getRandomInclusiveInt(inclusiveMax: number, inclusiveMin = 0) {
  return Math.floor(
    Math.random() * (inclusiveMax - inclusiveMin + 1) + inclusiveMin
  )
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getSentence(allValues: string[]) {
  // sentence should be from 4-11 words
  // no repeated words in a sentence
  const sentenceLength = getRandomInclusiveInt(11, 4)
  const sentenceValues: string[] = []
  const usedIdxs: number[] = []
  for (let i = 0; i < sentenceLength; i++) {
    let idx = getRandomInclusiveInt(allValues.length - 1)
    while (usedIdxs.includes(idx)) {
      idx = getRandomInclusiveInt(allValues.length - 1)
    }
    usedIdxs.push(idx)
    const value = allValues[idx]
    sentenceValues.push(value.toLocaleLowerCase())
  }
  const rawSentence = sentenceValues.join(' ')
  return `${capitalizeFirstLetter(rawSentence)}.`
}

export function getParagraph(allValues: string[]) {
  // paragraph should be from 6-22 sentences
  // repeated words in a paragraph are ok
  const paragraphLength = getRandomInclusiveInt(16, 5)
  const sentences: string[] = []
  for (let i = 0; i < paragraphLength; i++) {
    const newSentence = getSentence(allValues)
    sentences.push(newSentence)
  }
  return sentences.join(' ')
}

export function getParagraphs(allValues: string[]): ParagraphWithKey[] {
  const paragraphCount = 4 // todo: make param
  const paragraphs: string[] = []
  for (let i = 0; i < paragraphCount; i++) {
    const paragraph = getParagraph(allValues)
    paragraphs.push(paragraph)
  }
  return paragraphs.map((p) => ({
    _key: nanoid(),
    paragraph: p,
  }))
}
