import { FC, PropsWithChildren, Suspense, useEffect, useState } from "react";
import { createFromFetch } from "react-server-dom-webpack/client";

const RenderServerComponent: FC<PropsWithChildren<{ component: string }>> = ({
  component,
  children,
  ...rest
}) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const exec = async () => {
      const response = fetch(
        `/rsc?data=${encodeURIComponent(
          JSON.stringify({ component, props: rest })
        )}`
      );
      const elements = createFromFetch(response);
      setContent(elements);
    };
    exec();
  }, []);

  return <Suspense fallback="loading...">{content}</Suspense>;
};

export default RenderServerComponent;
