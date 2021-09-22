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
      <button type="button" className="btn btn-link" onClick={() => router.replace("/")}>
        Retourner à la page d'accueil
      </button>

      <Lottie alt="Animation indiquant la page 404" animationData={animation404} autoPlay loop={false} />
    </div>
  );
};

export default Page404;
