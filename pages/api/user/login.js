// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { prisma } from "../../../client/prisma";   <---------kalau make ini gak jalan/error, makanya make prismaCLient dibawah
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      const { username, pass } = JSON.parse(req.body);

      try {
        const userFromDB = await prisma.user.findFirst({
          where: {
            username: username,
          },
          select: {
            id: true,
            image: true,
            name: true,
            email: true,
            password: true,
          },
        });

        if (userFromDB?.password) {
          const validPass = await bcrypt.compare(pass, userFromDB.password);
          if (validPass) {
            res.status(200).send({data: userFromDB.username});
            // res.send({ id: true, code: 200, data: user });
          } else {
            res.status(401).send("password incorrect");
          }
        } else {
          res.status(404).send({ message: `${username} doesn't exist` });
        }

      } catch (error) {
        // console.log(error);
      }
      break;
    }
    default:
      // If the method is not "POST", send exception "Method Not Allowed"
      res.status(404).send({ message: "Method Not Allowed" });
      break;
  }
}
