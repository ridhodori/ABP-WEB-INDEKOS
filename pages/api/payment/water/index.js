import { prisma } from "../../../../client/prisma";
import bcrypt from "bcrypt";


export default async function handler(
    req,
    res
){
  switch (req.method) {
    case "GET":
      //showpaymentwater
      const water = await prisma.water.findMany();
      res.send(water);
        break;
    case "POST":{
      // createpayment
      const data = req.body;
      const water = await prisma.water.create({
        data:{...data},
      });
      res.send(water)
        break;
    }
    default:
      res.status(404).send("cant process");
      break;
  }
  
}