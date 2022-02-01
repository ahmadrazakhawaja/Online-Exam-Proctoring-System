const verifyuser = (code) => {
  return fetch("http://127.0.0.1:5000/routes/api/auth/" + "confirm/" + code)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
    });
};
export default verifyuser;
