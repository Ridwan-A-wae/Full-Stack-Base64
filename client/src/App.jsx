import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import imageCompression from "browser-image-compression";

function App() {
  const [image, setImage] = useState("");
  const [allData, setAllData] = useState([]);
  const [uploaded, setUploaded] = useState(false);

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
    setUploaded(false);
    if (image) {
      try {
        const res = await axios.post("http://localhost:8080/api/image/create", {
          base64: image,
        });
        console.log(res.data);
        setUploaded(true);
      } catch (err) {
        console.log(err);
      }
    }else {
      console.log("No image to upload")
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/image");
      setAllData(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [uploaded === true]);

  return (
    <div style={{border:"1px solid #cbcbcb"}} className="container mx-auto border-slate-600 border-width: 8px grid p-4">
      <div className="text-xl">
        <div className=" shadow-lg shadow-indigo-500/40 p-5">
          <span className="mx-10 text-2xl">Let's Upload Image</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <div className="grid justify-center align-middle border-b-2 border-b-stone-400">
          <button
            className="rounded-full my-4  text-white bg-blue-500 p-5 duration-150	 hover:bg-orange-500 "
            onClick={imageUpload}
          >
            Upload Image
          </button>
          {image === null || image === "" ? (
            ""
          ) : (
            <img className="shadow-lg shadow-indigo-500/40 p-5 rounded-lg" width={300} height={300} src={image} loading="lazy" />
          )}
        </div>
      </div>

      <br />
      <div className="grid grid-cols-4 ">
        {allData.map((data) => (
          <div className="flex justify-center" key={data._id}>
            <img width={500} src={data.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
