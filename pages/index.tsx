import React, { useEffect, useRef, useState } from "react";
import Footer from "@components/Footer";
import Image from "next/image";
import { faCheck, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Lottie from "lottie-react";
import animationEmail from "@animations/send-email.json";
import animationCode from "@animations/code-animation.json";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";

const Home = () => {

  return (
    <>
      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;
