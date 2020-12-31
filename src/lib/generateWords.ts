import faker from "faker";

export default function generateWords(length: number, seed?: number) {
  console.log({ seed });
  faker.seed(seed || 123);
  const words = [];
  for (let i = 0; i < length; i++) {
    words.push(faker.random.word());
  }
  return words;
}
