import axios from 'axios';

export default {
  getIslandPictureNames: async (islandCount): Promise<string[]> => {
    const response = await axios.get(
      process.env.ISLAND_GENERATOR_URL + `/islands/names/${islandCount}`,
    );
    return response.data;
  },

  getIslandPlots: async (imageName): Promise<any> => {
    const response = await axios.get(
      process.env.ISLAND_GENERATOR_URL + `/images/${imageName}/get-plot-data`,
    );
    return response.data;
  },

  deleteAllIslandPictures: async () => {
    const response = await axios.delete(
      process.env.ISLAND_GENERATOR_URL + `/islands`,
    );
    return response.data;
  },

  deleteIslandPictures: async (islandImages: string[]) => {
    const response = await axios.post(
      process.env.ISLAND_GENERATOR_URL + `/islands/delete`,
      { islandImages },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  },
};
