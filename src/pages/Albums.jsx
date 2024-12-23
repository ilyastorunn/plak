import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import LoadingVinyl from "../components/LoadingVinyl";

export default function Albums() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return <>{isLoading ? <LoadingVinyl /> : <Slider />}</>;
}
