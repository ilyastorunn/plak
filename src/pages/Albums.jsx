import { useState, useEffect } from "react";
import ImageSlider from "../components/ImageSlider";
import LoadingVinyl from "../components/LoadingVinyl";

export default function Albums() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return <>{isLoading ? <LoadingVinyl /> : <ImageSlider />}</>;
  // return <><ImageSlider /></>
}
