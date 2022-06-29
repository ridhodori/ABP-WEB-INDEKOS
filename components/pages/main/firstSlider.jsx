import React, { Component } from "react";
import Slider from "react-slick";
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";

export default class FirstSlider extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  render() {
    const settings = {
      dots: false,
      autoplay: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <motion.div
        initial={{
          opacity: 0.2,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex"
      >
        <div className="w-1/3">
          <motion.h1
            whileHover={{
              scale: 1.1,
            }}
            className="text-7xl font-light text-[#BDBDBD] mt-40"
          >
            InTheKost
          </motion.h1>
          <motion.h2
            whileHover={{
              scale: 1.1,
            }}
            className="text-6xl font-bold"
          >
            Manage Tagihan Kost Kamu ?
          </motion.h2>
          <div className="flex gap-5 mt-10">
            <Button
              variant="outline"
              colorScheme="gray"
              w="14"
              h="14"
              onClick={this.previous}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21 11.5C21 11.2239 20.7761 11 20.5 11L4.5 11C4.22386 11 4 11.2239 4 11.5C4 11.7761 4.22386 12 4.5 12L20.5 12C20.7761 12 21 11.7761 21 11.5Z"
                  fill="#333333"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.35355 7.64645C8.15829 7.45118 7.84171 7.45118 7.64645 7.64645L3.79289 11.5L7.64645 15.3536C7.84171 15.5488 8.15829 15.5488 8.35355 15.3536C8.54882 15.1583 8.54882 14.8417 8.35355 14.6464L5.20711 11.5L8.35355 8.35355C8.54882 8.15829 8.54882 7.84171 8.35355 7.64645Z"
                  fill="#333333"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              colorScheme="gray"
              w="14"
              h="14"
              onClick={this.next}
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.9353 11.5C3.9353 11.2239 4.15916 11 4.4353 11L20.4353 11C20.7114 11 20.9353 11.2239 20.9353 11.5C20.9353 11.7761 20.7114 12 20.4353 12L4.4353 12C4.15916 12 3.9353 11.7761 3.9353 11.5Z"
                  fill="#333333"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.5817 7.64645C16.777 7.45118 17.0936 7.45118 17.2889 7.64645L21.1424 11.5L17.2889 15.3536C17.0936 15.5488 16.777 15.5488 16.5817 15.3536C16.3865 15.1583 16.3865 14.8417 16.5817 14.6464L19.7282 11.5L16.5817 8.35355C16.3865 8.15829 16.3865 7.84171 16.5817 7.64645Z"
                  fill="#333333"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div className="w-2/3 pl-10">
          <div className="overflow-hidden rounded-2xl">
            <Slider ref={(c) => (this.slider = c)} {...settings}>
              <div className="bg-gray-100 w-full h-80 py-80 overflow-hidden relative">
                <Image
                  src={"/kosan/kosan1.JPG"}
                  alt="Kosan Photo 1"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="bg-gray-50 w-full h-80 py-80 overflow-hidden relative">
                <Image
                  src={"/kosan/kosan2.jpeg"}
                  alt="Kosan Photo 2"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="bg-gray-50 w-full h-80 py-80 overflow-hidden relative">
                <Image
                  src={"/kosan/kosan3.jpeg"}
                  alt="Kosan Photo 3"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </Slider>
          </div>
        </div>
      </motion.div>
    );
  }
}
