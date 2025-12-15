import { usePopular } from "@/hooks/usePopular";
import i18n from "@/i18n/i18n";
import React, { useEffect, useState } from "react";
import Slider from "./Slider";

const ExploreBanner = () => {
  const [popular, setPopular] = useState<Object[]>();
  const tmdbLanguage =
    i18n.language === "tr"
      ? "tr-TR"
      : i18n.language === "en"
        ? "en-US"
        : "en-US";
  useEffect(() => {
    usePopular("movie", tmdbLanguage).then((res) => setPopular(res));
  }, [tmdbLanguage]);
  return <Slider data={popular} />;
};

export default ExploreBanner;
