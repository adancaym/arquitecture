const axios = require("axios");
const { SELF_HOST, SELF_PORT, BACKEND_HOST, BACKEND_PORT, MASTER_KEY } =
  process.env;

try {
  axios
    .get(`${BACKEND_HOST}:${BACKEND_PORT}/srcCollections/full`, {
      params: {
        access_token: MASTER_KEY,
        limit: 2,
      },
    })
    .then(async ({ data }) => {
      console.log('Finished fetching collections');
      axios
        .get(`${BACKEND_HOST}:${BACKEND_PORT}/assets/collection/assets/`, {
          params: {
            access_token: MASTER_KEY,
            limit: 2,
          },
        })
        .then(async ({ data }) => {
          console.log('Finished fetching assets');
          axios
            .get(
              `${BACKEND_HOST}:${BACKEND_PORT}/assets/collection/assets/stats`,
              {
                params: {
                  access_token: MASTER_KEY,
                  limit: 2,
                },
              }
            )
            .then(async ({ data }) => {
              console.log('Finished fetching stats');
            });
        });
    });
} catch (error) {
  console.log(error);
}
