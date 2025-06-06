import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import { usePopular } from "@/hooks/usePopular";

const ExploreBanner = () => {
  const [popular, setPopular] = useState<Object[]>();
  useEffect(() => {
    usePopular("movie").then((res) => setPopular(res));
  }, []);
  return <Slider data={popular} />;
};

export default ExploreBanner;
