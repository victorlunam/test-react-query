const apiKey = "563492ad6f91700001000001671bbddd90754c94a13cb9f9dd276e2c";

const fetcher = (path) =>
  fetch(`https://api.pexels.com/v1/${path}`, {
    headers: {
      Authorization: apiKey,
    },
  });

export const search = (query) => fetcher(`search?query=${query}`).then(res => res.json());

export default fetcher;
