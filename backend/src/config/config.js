import dotenv from 'dotenv';
dotenv.config();

if(!process.env.MONGO_URL){
    throw new Error("MONGO_URL is not defined in envarment variable.")
}
if(!process.env.JWT_TOKEN){
    throw new Error("JWT_TOKEN is not defined in enverment variable");
}
if(!process.env.EMAIL_API){
    throw new Error(" EMAIL_API is not defined in enverment variable");
}

const config = {
    MONGO_URL:process.env.MONGO_URL,
    JWT_TOKEN:process.env.JWT_TOKEN,
    EMAIL_API:process.env.EMAIL_API,
}
export default config;