import { prisma } from "../../../../client/prisma";

export default async function handler(req,res){
  switch (req.method) {
      case "POST": {
        const data = JSON.parse(req.body);

        try {
          const water = await prisma.water.update({
            where: {
              id: data.id,
            },
            data: {
              water_payed : data.water_payed,
              payment_status : data.payment_status
            },
          });
          res.json(water);
        } catch (error) {
          errorHandler(error, req, res);
        }
        break;
      }
      case "GET": {
        const id = req.query.id;
        try {
          //showpaymentwater
          const water = await prisma.water.findUnique({
            where: {
              id: id,
            }
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