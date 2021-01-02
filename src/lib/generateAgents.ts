import faker from "faker";
import { assassinNum, comradeNum, wordNum } from "../config/config";

function generateAgentsIndividual(length: number, arrayToCheck?: number[]) {
  const array: number[] = [];

  for (array; array.length < length; ) {
    const randomNum: number = faker.random.number({
      min: 0,
      max: wordNum - 1,
    });
    if (!array.includes(randomNum)) {
      if (!arrayToCheck || !arrayToCheck.includes(randomNum)) {
        array.push(randomNum);
      }
    }
  }
  return array;
}

function generateAgentsArray() {
  const agents: string[] = [];
  const comrades: any = generateAgentsIndividual(comradeNum);
  const assassins: any = generateAgentsIndividual(assassinNum, comrades);
  comrades.forEach((agentIndex: number) => (agents[agentIndex] = "Comrade"));
  assassins.forEach((agentIndex: number) => (agents[agentIndex] = "Assassin"));
  return agents;
}

export default function generateAgents(seed?: number) {
  faker.seed(seed || 123);

  const agents1: any[] = generateAgentsArray();
  const agents2: any[] = generateAgentsArray();

  return [agents1, agents2];
}
