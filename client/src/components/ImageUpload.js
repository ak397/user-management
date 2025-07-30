import { IKContext, IKUpload, IKImage } from "imagekitio-react";
import axios from "axios";
import { useRef, useState } from "react";

const urlEndpoint = "https://ik.imagekit.io/ashish397868";
const publicKey = "public_cUmq8hgxqmnL7ETDfVbNo+43lOY=";

const authenticator = async () => {
  try {
    const response = await axios.get("http://localhost:5000/status");
    const { signature, expire, token } = response.data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

function App() {
  const uploadRef = useRef();
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="App">
        <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
          <p>Select and upload an image</p>

          <IKUpload
            className="hidden"
            ref={uploadRef}
            fileName="user-upload.png"
            onUploadStart={() => setLoading(true)}
            onSuccess={(res) => {
              setImagePath(res.url);
              setLoading(false);
            }}
            onError={(err) => {
              console.log("❌ Upload error:", err);
              setLoading(false);
            }}
          />

          <button
            onClick={() => {
              uploadRef.current.click();
            }}
            className="px-4 py-2 mt-3 bg-blue-500 text-white rounded"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </IKContext>
      </div>

      <div className="mt-4 w-24 h-24  overflow-hidden border shadow">{imagePath && <IKImage className="w-full h-full object-cover" urlEndpoint={urlEndpoint} src={imagePath} alt="Uploaded" />}</div>
    </>
  );
}

export default App;
