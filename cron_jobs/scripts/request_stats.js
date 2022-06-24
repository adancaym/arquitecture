const axios = require("axios");
const { BACKEND_HOST, BACKEND_PORT, MASTER_KEY } = process.env;

const fetchCollectionsStats = async () =>
  axios
    .get(`${BACKEND_HOST}:${BACKEND_PORT}/assets/collection/assets/stats`, {
      params: {
        access_token: MASTER_KEY,
      },
    })
    .then(async ({ data }) => {
      console.log("Finished fetching stats");
    })
    .catch((err) => {
      console.log(err, "Fetch stats error");
    });

try {
  (async () => await fetchCollectionsStats())();
} catch (error) {
  console.log(error, "Fetch collections stats error");
}
