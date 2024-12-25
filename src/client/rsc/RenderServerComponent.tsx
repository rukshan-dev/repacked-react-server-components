import { FC, Suspense, useEffect, useState } from "react";
import { createFromFetch } from "react-server-dom-webpack/client";

const RenderServerComponent: FC = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const exec = async () => {
      const response = fetch("/rsc");
      const elements = createFromFetch(response);
      setContent(elements);
    };
    exec();
  }, []);

  return <Suspense fallback="loading...">{content}</Suspense>;
};

export default RenderServerComponent;
