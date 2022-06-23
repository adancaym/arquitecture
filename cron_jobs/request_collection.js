const axios = require("axios");
const { SELF_HOST, SELF_PORT, BACKEND_HOST, BACKEND_PORT, MASTER_KEY } =
  process.env;

const fetchCollections = async () =>
  axios
    .get(`${BACKEND_HOST}:${BACKEND_PORT}/srcCollections/full`, {
      params: {
        access_token: MASTER_KEY,
      },
    })
    .then(async ({ data }) => {
      console.log("Finished fetching collections");
      await fetchCollectionsAssets();
    });

const fetchCollectionsAssets = async () =>
  axios
    .get(`${BACKEND_HOST}:${BACKEND_PORT}/assets/collection/assets/`, {
      params: {
        access_token: MASTER_KEY,
      },
    })
    .then(async ({ data }) => {
      console.log("Finished fetching assets");
      await fetchCollectionsStats();
    });

const fetchCollectionsStats = async () =>
  axios
    .get(`${BACKEND_HOST}:${BACKEND_PORT}/assets/collection/assets/stats`, {
      params: {
        access_token: MASTER_KEY,
      },
    })
    .then(async ({ data }) => {
      console.log("Finished fetching stats");
      await fetchCollections();
    });

try {
  (async () => await fetchCollections())();
} catch (error) {
  console.log(error);
}
