import { IKContext, IKUpload } from "imagekitio-react";
import axios from "axios";
import { useRef } from "react";

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

  return (
    <div className="App">
      <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
        <p>Select and upload an image</p>

        <IKUpload
          className="hidden"
          ref={uploadRef}
          fileName="user-upload.png"
          onSuccess={(res) => console.log("✅ Upload success:", res)}
          onError={(err) => console.log("❌ Upload error:", err)}
        />

        <button
          onClick={()=>{uploadRef.current.click()}}
          className="px-4 py-2 mt-3 bg-blue-500 text-white rounded"
        >
          Upload Image
        </button>
      </IKContext>
    </div>
  );
}

export default App;