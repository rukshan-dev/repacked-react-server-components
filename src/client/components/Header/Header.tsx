"use client";
import { FC, useEffect, useState } from "react";
import "./styles.css";

const Header: FC = () => {
  const [content, setContent] = useState({
    h1: "",
    h2: "",
  });

  useEffect(() => {
    fetch("/hello")
      .then((res) => res.json())
      .then((res) => {
        setContent(res);
      });
  }, []);

  return (
    <>
      <h1>{content.h1}</h1>
      <h2>{content.h2}</h2>
    </>
  );
};

export default Header;
