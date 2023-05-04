import { Client } from "minio";

export default new Client({
  endPoint: "minio",
  port: 9000,
  useSSL: false,
  accessKey: "m3Rm928ZDd6kiO0V",
  secretKey: "3phnNsR7ffdyjOb1H5F9BMu7dw0MXsq8",
});
