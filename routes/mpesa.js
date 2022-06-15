const router = require("express").Router();

router.get("/authorization", (req, res) => {
  let headers = new Headers();
  headers.append(
    "Authorization",
    "Bearer cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ=="
  );
  fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers }
  )
    .then((response) => response.text())
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
