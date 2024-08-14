module.exports = {
    port: process.env.PORT || 9000,
    auth: {
        argon: {
            saltLength: 16,
            hashLength: 32,
            timeCost: 6,
            memoryCost: 2 ** 17,
        },
        jwt: {
            secret: process.env.AUTH_JWT_SECRET,
            expirationInterval: 60 * 60 * 1000,
            issuer: "2324-WEBSERVICES-JASPERHMN",
            audience: "2324-WEBSERVICES-JASPERHMN",
        },
    },
    log: {
        level: "silly",
        disabled: false,
    },
    cors: {
        origins: ["https://frontendweb-motor.onrender.com"],
        maxAge: 3 * 60 * 60,
    },
    database: {
        client: "mysql2",
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        name: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
    },
};
