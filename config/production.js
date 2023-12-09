module.exports = {
  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    jwt: {
      secret:
        "eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked",
      expirationInterval: 60 * 60 * 1000,
      issuer: "jasper.hogent.be",
      audience: "jasper.hogent.be",
    },
  },

  log: {
    level: "info",
    disabled: false,
  },
  cors: {
    origins: ["http://localhost:5173"],
    maxAge: 3 * 60 * 60,
  },
};
