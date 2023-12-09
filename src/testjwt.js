const { generateJWT, verifyJWT } = require("./core/jwt");

function messWithPayload(jwt) {
  const [header, payload, signature] = jwt.split(".");
  const parsedPayload = JSON.parse(
    Buffer.from(payload, "base64url").toString()
  );

  parsedPayload.roles.push("admin");

  const newPayload = Buffer.from(
    JSON.stringify(parsedPayload),
    "ascii"
  ).toString("base64url");
  return [header, newPayload, signature].join(".");
}

async function main() {
  const fakeKlant = {
    id: 1,
    naam: "Jasper",
    voornaam: "Haegeman",
    email: "jasper.haegeman@student.hogent.ne",
    straat: "Sluipweg",
    huisnummer: 31,
    postcode: 9300,
    stad: "Aalst",
    roles: ["admin"],
  };

  const jwt = await generateJWT(fakeKlant);
  console.log("The JWT:", jwt);

  let valid = await verifyJWT(jwt);
  console.log("This JWT is", valid ? "valid" : "incorrect");

  const messedUpJwt = messWithPayload(jwt);
  console.log("Messed up JWT:", messedUpJwt);

  console.log("Verifying this JWT will throw an error:");
  valid = await verifyJWT(messedUpJwt);
}

main();
