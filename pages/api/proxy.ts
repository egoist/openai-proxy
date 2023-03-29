import handleRequest from "../../src/handle-request";

export const config = {
  runtime: "edge", // this is a pre-requisite
  // exclude hongkong cause it's not supported by OpenAI
  regions: [
    "arn1",
    "bom1",
    "bru1",
    "cdg1",
    "cle1",
    "cpt1",
    "dub1",
    "fra1",
    "gru1",
    "hkg1",
    "hnd1",
    "iad1",
    "icn1",
    "kix1",
    "lhr1",
    "pdx1",
    "sfo1",
    "sin1",
    "syd1",
  ],
};

export default handleRequest;
