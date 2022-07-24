import axios from 'axios';

export default {
  getIslandPictureNames: async (islandCount) => {
    const response = await axios.get(
      process.env.ISLAND_GENERATOR_URL + `/islands/names/${islandCount}`,
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
