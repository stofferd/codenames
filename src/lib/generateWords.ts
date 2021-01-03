import faker from "faker";
import words from "../config/words";
export default function generateWords(length: number, seed?: number) {
  faker.seed(seed || 123);
  let wordSet: any = new Set();
  for (null; wordSet.size < length; ) {
    const index: number = faker.random.number({ min: 0, max: 100 });
    wordSet.add(words[index]);
  }
  return [...wordSet];
}
