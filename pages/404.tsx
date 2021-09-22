import Lottie from "lottie-react";
import animation404 from "@animations/404.json";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
const Page404 = () => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/");
  }, []);

  return (
    <div style={{ textAlign: "center", top: "2.5%", fontSize: "large", position: "absolute" }}>
    </div>
  );
};

export default Page404;
