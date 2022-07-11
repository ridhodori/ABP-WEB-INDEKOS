// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { prisma } from "../../../client/prisma";     <---------kalau make ini gak jalan/error, makanya make prismaCLient dibawah
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const data = JSON.parse(req.body);    //convert req.body from json to object and store it to data variable

      try {
        //insert available user data to database (data user antara daftar.jsx dan tabel user gak sama, jadi input yg sama aja)
        const user = await prisma.user.update({ 
            where : {
                username : data.username
            },
            data: { 
                name :  data.name,
                email : data.email,
                phone_num : parseInt(data.phone_num),
                address : data.address
            } 
        });

        res.json(user);
      } 
      catch (error) {
        console.log(error);
        res.send(error);
      }

      break;
    }
    default:
      res.status(404).send({ message: "Method Not Allowed" });
      break;
  }
}
