const router = require("express").Router();

let unirest = require("unirest");
router.get("/authorization", (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Basic QXpzMktlalUxQVJ2SUw1SmRKc0FSYlYyZ0RyV21wT0I6aGlwR3ZGSmJPeHJpMzMwYw=="
  );
  myHeaders.append(
    "Cookie",
    "incap_ses_1102_2742146=YJw0VTawYXs23fj/yRdLD6nUqWIAAAAAgCz8GazqEsqNjZNRVz0/aQ==; visid_incap_2742146=DO94YXlSQry6A5caofrTh6nUqWIAAAAAQUIPAAAAAAB+2R7ksifuretC3CTaMBMQ"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
});

module.exports = router;
