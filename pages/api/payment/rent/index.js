import { prisma } from "../../../../client/prisma";



export default async function handler(
    req,
    res
){
  switch (req.method) {
    case "GET":
      //showrent
      const rent = await prisma.rent.findMany();
      res.send(rent);

      
        break;
    case "POST":{
      // createpayment
      const data = req.body;
      const rent = await prisma.rent.create({
          data:{...data},
      });
      res.send(rent)
          break;
      }
    default:
      res.status(404).send("cant process");
      break;
  }
}