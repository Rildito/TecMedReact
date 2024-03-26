import { useState } from "react";
import Cargando from "./Cargando";

export default function MyPdfViewer({ pdfUrl }) {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };
  return (
    <>
      {loading && (
        <Cargando />
      )}

      <iframe
        title="PDF Viewer"
        src={pdfUrl}
        className="w-full h-full"
        onLoad={handleLoad}
        onError={e => console.log(e)}
      ></iframe>

    </>
  );


};
