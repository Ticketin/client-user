import { useEffect, useRef, useState } from "react";

export default function useDynamicSVGImport(name, svg, options = {}) {
  const ImportedIconRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { onCompleted, onError } = options;
  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        //   ImportedIconRef.current = (svg
        //   ).ReactComponent;
        const file = new File([svg], "ticket.svg", {
          type: "image/svg+xml",
        });

        console.log(file);
        console.log(svg);
        ImportedIconRef.current = await import(file);
        console.log(ImportedIconRef.current);
        if (onCompleted) {
          onCompleted(name, ImportedIconRef.current);
        }
      } catch (err) {
        if (onError) {
          onError(err);
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name, onCompleted, onError]);

  return { error, loading, SvgIcon: ImportedIconRef.current };
}
