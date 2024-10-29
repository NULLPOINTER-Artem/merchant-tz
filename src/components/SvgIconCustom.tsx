import React, { useEffect, useState } from "react";

interface SvgIconCustomProps {
  nameIcon: string;
  nameFile?: string;
  classStyles?: string;
}

function SvgIconCustom(props: SvgIconCustomProps) {
  const [svgCode, setSvgCode] = useState("");

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(
          `${process.env.PUBLIC_URL}/assets/icons/${
            props.nameFile ?? props.nameIcon
          }.svg`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const svgText = await response.text();
        setSvgCode(svgText);
      } catch (error) {
        console.error("Error fetching the SVG:", error);
      }
    };

    fetchSvg();
  }, []);

  return (
    <div
      className={props.classStyles}
      dangerouslySetInnerHTML={{ __html: svgCode }}
    />
  );
}

export default SvgIconCustom;
