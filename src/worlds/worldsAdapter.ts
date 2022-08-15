import axios from 'axios';

export default {
  getIslandPictureNames: async (islandCount): Promise<string[]> => {
    console.log(
      'url',
      process.env.ISLAND_GENERATOR_URL + `/islands/names/${islandCount}`,
    );
    try {
      const response = await axios.get(
        process.env.ISLAND_GENERATOR_URL + `/islands/names/${islandCount}`,
      );
      return response.data;
    } catch (e) {
      console.log(e.message);
    }
  },

  getTemp: async () => {
    console.log(process.env.ISLAND_GENERATOR_URL + '/temp');
    return await axios.get(process.env.ISLAND_GENERATOR_URL + '/temp');
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
