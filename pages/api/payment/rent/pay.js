import { prisma } from "../../../../client/prisma";

export default async function handler(req,res){
  switch (req.method) {
    case "POST": {
        const data = JSON.parse(req.body);
        try {
          const rent = await prisma.rent.update({
            where: {
              id: data.id,
            },
            data: {
                rent_payed : data.rent_payed,
                payment_status : data.payment_status
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