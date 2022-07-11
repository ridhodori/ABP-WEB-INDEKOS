// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { prisma } from "../../../client/prisma";     <---------kalau make ini gak jalan/error, makanya make prismaCLient dibawah
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      const data = JSON.parse(req.body); //convert req.body from json to object and store it to data variable

      try {
        //encrypt password
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);

        //insert available user data to database (data user antara daftar.jsx dan tabel user gak sama, jadi input yg sama aja)
        const user = await prisma.user.create({
          data: {
            username: data.username,
            password: data.password,
            name: data.nama,
            email: data.email,
            phone_num: data.phone_num,
            address: data.address,
            user_status: 1, //gak tau ini diisi apa. tapi karena required, jadi isi sembarang aja dulu
          },
        });

        res.json(user);
      } catch (error) {
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
