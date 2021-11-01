exports = async function(endPoint, queryParams){
 const axios = require("axios");
 const url = `${endPoint}${queryParams}`;
 const response = await axios.get(url);
 return response.data;
};