import { prisma } from "../../../../../client/prisma";
import bcrypt from "bcrypt";


export default async function handler(
    req,
    res
){
  switch (req.method) {
      case "PUT": {
        const id = req.query.id;
        const data= req.body;
        try {
          const water = await prisma.water.update({
            where: {
              id: id,
            },
            data: {
              ...data,
            },
          });
          res.json(water);
        } catch (error) {
          errorHandler(error, req, res);
        }
        break;
      }

    default:
      res.status(404).send("cant process");
      break;
  }
}