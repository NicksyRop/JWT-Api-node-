const router = require("express").Router();

let unirest = require("unirest");
router.get("/authorization", (req, res) => {
  let req = unirest(
    "GET",
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
  )
    .headers({
      Authorization:
        "Bearer cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ==",
    })
    .send()
    .end((response) => {
      if (response.error) throw new Error(response.error);
      return res.send(response);
    });
});

module.exports = router;
