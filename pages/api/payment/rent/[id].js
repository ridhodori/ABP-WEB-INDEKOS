import { prisma } from "../../../../client/prisma";



export default async function handler(
    req,
    res
){
  switch (req.method) {
    case "PUT": {
        const id = req.query.id;
        const data= req.body;
        try {
          const rent = await prisma.rent.update({
            where: {
              id: id,
            },
            data: {
              ...data,
            },
          });
          res.json(rent);
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