//TODO: plug map-generator service here.
import { WorldPlot } from '../schemas/worldPlot.schema';
import IslandGeneratorAPI from '../worldsAdapter';

export const generateOceanPlots = async (
  sideLength: number,
  islandCount: number,
): Promise<WorldPlot[]> => {
  const generatedOceanPlots = [] as WorldPlot[];
  const pixelCount = Math.pow(sideLength, 2);
  const islandPlotIndexes = generateOceanIndexes(pixelCount, islandCount);
  const islandPictureNames = await IslandGeneratorAPI.getIslandPictureNames(
    islandCount,
  );
  for (let i = 0; i < pixelCount; i++) {
    let plot;
    if (i == islandPlotIndexes[0]) {
      islandPlotIndexes.shift();
      const islandPictureName = islandPictureNames[0];
      islandPictureNames.shift();
      plot = generateIslandPlot(islandPictureName);
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
  const shuffledArray = shuffleArray(numbersArray).slice(0, islandCount);
  shuffledArray.sort((a, b) => a - b);
  return shuffledArray;
};

const shuffleArray = (array): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//TODO: generate island name from an external api
const generateIslandPlot = (islandImageName: string): WorldPlot => {
  const islandPlot = new WorldPlot();
  islandPlot.isIsland = true;
  islandPlot.img = islandImageName;
  islandPlot.name = 'temp';
  return islandPlot;
};

const generateOceanPlot = (): WorldPlot => {
  const oceanPlot = new WorldPlot();
  oceanPlot.isIsland = false;
  return oceanPlot;
};
