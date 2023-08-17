import morgan from "morgan";
import { appLogger } from "./winstonLoggers";

const stream = {
    write: (message: string) => appLogger.debug(message),
};

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

const morganLogger = () => morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
)

export default morganLogger;