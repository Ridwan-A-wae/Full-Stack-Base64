import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import imageCompression from "browser-image-compression";

function App() {
  const [image, setImage] = useState("");
  const [allData, setAllData] = useState([]);
  const [uploaded, setUploaded] = useState(false)

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log("ขนาดไฟล์: " + compressedFile.size / 1024 / 1024);

      // convertToBase64

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => {
        console.log(reader.result);
        setImage(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const imageUpload = async () => {
    setUploaded(false)
    try {
      const res = await axios.post("http://localhost:8080/api/image/create", {
        base64: image,
      });
      console.log(res.data);
      setUploaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/image");
      setAllData(res.data.data);
      console.log(res.data.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [uploaded==true]);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        Let's Upload Image
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image === null || image === "" ? (
          ""
        ) : (
          <img width={300} height={300} src={image} alt="" />
        )}
      </div>
      <br />
      <button onClick={imageUpload}>upload Image</button>
      <br />
      <h1>รูปภาพทั้งหมด</h1>
      {allData.map((data) => (
        <div key={data._id}>
          <img width={500} src={data.image} alt="" />
        </div>
      ))}
    </div>
  );
}

export default App;
