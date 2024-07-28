const path = require("node:path");
const joi = require("joi");

require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const envSchemma = joi
    .object()
    .keys({
        NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
        PORT: joi.number().default(5000).description("server port"),
        REDIS_HOST: joi.string().required().description("Redis host"),
        REDIS_PORT: joi.number().default(6379).description("Redis port"),
    })
    .unknown();

const { value: envVars, error } = envSchemma
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    redis: {
        host: envVars.REDIS_HOST,
        port: envVars.REDIS_PORT,
    },
};
