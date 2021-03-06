import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const { ref, inView } = useInView();
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        y: 0,
        opacity: 1,
      });
    }
  }, [animation, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0.2,
        y: 40,
      }}
      animate={animation}
      className="my-20 flex justify-center gap-20"
    >
      <div className="flex gap-10 items-center">
        <div className="flex flex-col gap-5">
          <motion.div
            whileHover={{
              scale: 1.5,
              zIndex: 10,
            }}
            className="w-52 h-40 relative rounded-md overflow-hidden hover:shadow-2xl"
          >
            <Image
              src={"/kosan/kosan1.JPG"}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.5,
              zIndex: 10,
            }}
            className="w-52 h-40 relative rounded-md overflow-hidden hover:shadow-2xl"
          >
            <Image
              src={"/kosan/kosan2.jpeg"}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        </div>
        <motion.div
          whileHover={{
            scale: 1.5,
            zIndex: 10,
          }}
          className="w-72 h-64 relative rounded-md overflow-hidden hover:shadow-2xl"
        >
          <Image
            src={"/kosan/kosan3.jpeg"}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
      </div>
      <article>
        <motion.h2
          whileHover={{
            scale: 1.1,
          }}
          className="text-7xl font-light text-[#BDBDBD]"
        >
          About
        </motion.h2>
        <p className="font-light leading-loose mt-5">
          Indekos is an web base application that is used to manage bills that
          must be paid by the user to the owner of the boarding house. With this
          web-based application, users can ensure that payments are recorded and
          can be shown as proof of payment
        </p>
      </article>
    </motion.div>
  );
};

export default About;
