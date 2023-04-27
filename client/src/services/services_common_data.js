const BASE_URL = 'http://localhost:3030';

export const commonHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
}

export const fetchReq = async (url, parameters={}) => {
  console.log('very fetching!', url)
  return await fetch(`${BASE_URL}/${url}`, parameters)
  .then(response => {response.json()
  console.log('far fetched')})
  .catch(err => console.log(err))
}
