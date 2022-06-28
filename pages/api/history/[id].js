import { prisma } from "../../../client/prisma";

export default async function handler(res, req){
    switch (req.method) {
        case "GET": {
          //showpayment
          const id = req.query.id;
          const payment = await prisma.payment.findMany({
            where: {
              id : id,
            }
            });
          const electricity = await prisma.electricity.findMany({
          where: {
            id : id,
          }
          });
          const rent = await prisma.rent.findMany({
            where: {
              id : id,
            }
            });
            const water = await prisma.water.findMany({
              where: {
                id : id,
              }
              });
          res.send({payment,electricity,rent,water});
          break;
        }
        
        default:
          res.status(404).send("cant process");
          break;
      }
}