// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "../../../client/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      //showpayment
      const payment = await prisma.payment.findMany();
      res.send(payment);
      break;
    }
    case "POST": {
      // createpayment
      const data = req.body;
      const payment = await prisma.payment.create({
        data: { ...data },
      });
      res.send(payment);
      break;
    }
    default:
      res.status(404).send("cant process");
      break;
  }
}
