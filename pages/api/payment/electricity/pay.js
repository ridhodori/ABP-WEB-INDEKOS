import { prisma } from "../../../../client/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      const data = JSON.parse(req.body);
      
      try {
        const electricity = await prisma.electricity.update({
          where: {
            id: data.id,
          },
          data: {
            electricity_payed : data.electricity_payed,
            payment_status : data.payment_status
          },
        });
        res.json(electricity);
      } catch (error) {
        console.log(error);
      }
      break;
    }

    default:
      res.status(404).send("cant process");
      break;
  }
}
