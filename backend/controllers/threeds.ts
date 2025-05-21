import express from "express";
import {
  threeDSFinalResp,
  threeDSAuthenticate,
  cardLookup,
  getSkyflowBearerToken,
} from "../services/threeds";
import { logger } from "../utils/logger";

const router = express.Router();

router.get("/authToken", async function (req: any, res: any, next: any) {
  try {
    const data: any = await getSkyflowBearerToken();
    res.send(data);
  } catch (e) {
    logger.error("Token retrieval failed with this error: ", {
      message: e.message,
    });
    res.status(500).send(e.message);
  }
});

router.post("/3DSAuthenticate", async function (req: any, res: any, next: any) {
  try {
    const resp = await threeDSAuthenticate(req, res);
    res.status(200).json(resp);
  } catch (e) {
    logger.error("3DS Authenticate failed with this error: ", {
      message: e.message,
    });
    res.status(500).send(e.message);
  }
});

router.post(
  "/threeDSRespUrl",
  async function (req: any, res: any, next: any) {
    try {
      const resp = await threeDSFinalResp(req, res);
      res.status(200).send(resp);
    } catch (e) {
      logger.error("Processing 3DS Resp failed with this error: ", {
        message: e.message,
      });
      res.status(500).send(e.message);
    }
  }
);

router.post("/card_lookup", async (req: any, res: any) => {
  try {
    const { BIN } = req.body;
    if (!BIN) {
      return res.status(400).json({ error: 'BIN is required' });
    }
    const result = await cardLookup(BIN);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in cardLookupController:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
