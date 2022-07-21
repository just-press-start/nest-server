import axios from 'axios';

export default {
  getIslandPictureNames: async (islandCount) => {
    const response = await axios.get(
      process.env.ISLAND_GENERATOR_URL + `/get-names/${islandCount}`,
    );
    return response.data;
  },
};
