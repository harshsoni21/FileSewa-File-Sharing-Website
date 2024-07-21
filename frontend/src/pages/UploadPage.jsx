import React from "react";
import Upload from "../components/Upload";

function UploadPage() {
  return (
    <>
      <img src="./logo.png" alt="Inshare logo" class="logo"></img>
      <div className="flex">
        <Upload />
        <div class="image-vector"></div>
      </div>
    </>
  );
}

export default UploadPage;
