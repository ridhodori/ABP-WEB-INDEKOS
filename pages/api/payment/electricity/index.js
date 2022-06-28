// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "../../../../client/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      //showpayment
      const electricity = await prisma.electricity.findMany();
      res.send(electricity);

      break;
    case "POST": {
      // createpayment
      const data = req.body;
      const electricity = await prisma.electricity.create({
        data: { ...data },
      });
      res.send(electricity);
      break;
    }
    default:
      res.status(404).send("cant process");
      break;
  }
}
