//TODO: plug map-generator service here.
import { WorldPlot } from '../schemas/worldPlot.schema';
import IslandGeneratorAPI from '../worldsAdapter';
import { FutureIsland } from '../models/FutureIsland';

const ONE_MIN_MILLISECONDS = 60000;

type generateOceanPlotsReturn = {
  generatedOceanPlots: WorldPlot[];
  reservedIndexes: number[];
};

export const generateOceanPlots = async (
  sideLength: number,
  islandCount: number,
): Promise<generateOceanPlotsReturn> => {
  const generatedOceanPlots = [] as WorldPlot[];
  const pixelCount = Math.pow(sideLength, 2);
  const islandPlotIndexes = generateIslandIndexes(pixelCount, islandCount);
  const _islandPlotIndexes = [...islandPlotIndexes];
  const islandPictureNames = await IslandGeneratorAPI.getIslandPictureNames(
    islandCount,
  );
  for (let i = 0; i < pixelCount; i++) {
    let plot;
    if (i == _islandPlotIndexes[0]) {
      _islandPlotIndexes.shift();
      const islandPictureName = islandPictureNames[0];
      islandPictureNames.shift();
      plot = generateIslandPlot(islandPictureName);
    } else {
      plot = generateOceanPlot();
    }
    generatedOceanPlots.push(plot);
  }
  return {
    generatedOceanPlots,
    reservedIndexes: islandPlotIndexes,
  };
};

// see: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const generateIslandIndexes = (
  pixelCount: number,
  islandCount: number,
  reservedIndexes: number[] = [],
) => {
  let numbersArray = Array.from(Array(pixelCount).keys());
  numbersArray = removeReservedIndexes(numbersArray, reservedIndexes);
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

// these 2 arrays are sorted. therefore it can be optimized, but not right now.
const removeReservedIndexes = (
  numbersArray: number[],
  reservedIndexes: number[],
): number[] => {
  if (reservedIndexes.length == 0) {
    return numbersArray;
  }
  for (let i = numbersArray.length - 1; i >= 0; i--) {
    if (reservedIndexes.includes(numbersArray[i])) {
      numbersArray.splice(i, 1);
    }
  }
  return numbersArray;
};

export const generateFutureIslands = (
  sideLength: number,
  islandCount: number,
  reservedIndexes: number[],
): FutureIsland[] => {
  const pixelCount = Math.pow(sideLength, 2);
  const futureIslands = [] as FutureIsland[];
  const timestamps = createIslandGenerationTimestamps(islandCount);
  const coordinates = generateIslandIndexes(
    pixelCount,
    islandCount,
    reservedIndexes,
  );
  for (let i = 0; i < timestamps.length; i++) {
    const island: FutureIsland = {
      islandGenerationTimestamp: timestamps[i],
      coordinate: coordinates[i],
    };
    futureIslands.push(island);
  }
  return futureIslands;
};

const createIslandGenerationTimestamps = (islandCount): number[] => {
  let timeMilliseconds = new Date().getTime();
  const islandGenerationTimestamps = [] as number[];
  for (let i = 0; i < islandCount; i++) {
    timeMilliseconds = timeMilliseconds + ONE_MIN_MILLISECONDS;
    islandGenerationTimestamps.push(timeMilliseconds);
  }
  return islandGenerationTimestamps;
};
