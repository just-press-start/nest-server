//TODO: plug map-generator service here.
import { WorldPlot } from '../schemas/worldPlot.schema';

export const generateOceanPlots = (
  sideLength: number,
  islandCount: number,
): WorldPlot[] => {
  const generatedOceanPlots = [] as WorldPlot[];
  const pixelCount = Math.pow(sideLength, 2);
  const islandPlotIndexes = generateOceanIndexes(pixelCount, islandCount);
  for (let i = 0; i < pixelCount; i++) {
    let plot;
    if (i == islandPlotIndexes[0]) {
      islandPlotIndexes.shift();
      plot = generateIslandPlot();
    } else {
      plot = generateOceanPlot();
    }
    generatedOceanPlots.push(plot);
  }
  return generatedOceanPlots;
};

// see: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const generateOceanIndexes = (pixelCount: number, islandCount: number) => {
  const numbersArray = Array.from(Array(pixelCount).keys());
  const shuffledArray = shuffleArray(numbersArray);
  return shuffledArray.slice(0, islandCount).sort();
};

const shuffleArray = (array): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//TODO: generate island name from an external api
const generateIslandPlot = (): WorldPlot => {
  const islandPlot = new WorldPlot();
  islandPlot.isIsland = true;
  islandPlot.img = '0a059a33-3d0c-4d60-80be-ac69368b4c4a.png';
  islandPlot.name = 'temp';
  return islandPlot;
};

const generateOceanPlot = (): WorldPlot => {
  const oceanPlot = new WorldPlot();
  oceanPlot.isIsland = false;
  return oceanPlot;
};
