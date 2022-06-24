const axios = require("axios");
const { BACKEND_HOST, BACKEND_PORT, MASTER_KEY } =
  process.env;

const fetchCollectionsAssets = async () =>
  axios
    .get(`${BACKEND_HOST}:${BACKEND_PORT}/assets/collection/assets/`, {
      params: {
        access_token: MASTER_KEY,
      },
    })
    .then(async ({ data }) => {
      console.log("Finished fetching assets");
    })
    .catch((err) => {
      console.log(err, "Fetch assets error");
    });


try {
  (async () => await fetchCollectionsAssets())();
} catch (error) {
  console.log(error, 'Fetch assets error');
}
