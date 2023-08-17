import cors from "cors";

const whitelist = ['http://127.0.0.1', 'http://www.x-scapes.netlify.app'];

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    if (whitelist.indexOf(origin!) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error(`${origin} Not allowed by CORS`))
    }
  }
}

const corsFilter = () => cors(corsOptions);

export default corsFilter