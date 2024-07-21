import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const baseURL = "http://localhost:3000";

function Upload() {
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("Uploading...");
  const fileInputRef = useRef(null);
  const browseBtnRef = useRef(null);
  const copyURLBtnRef = useRef(null);
  const emailFormRef = useRef(null);

  useEffect(() => {
    const dropZone = document.querySelector(".drop-zone");
    const fileInput = fileInputRef.current;
    const browseBtn = browseBtnRef.current;
    const copyURLBtn = copyURLBtnRef.current;
    const fileURL = document.querySelector("#fileURL");
    const emailForm = emailFormRef.current;

    const maxAllowedSize = 100 * 1024 * 1024; // 100 MB

    const handleBrowseClick = () => fileInput.click();
    const handleDrop = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length === 1) {
        if (files[0].size < maxAllowedSize) {
          fileInput.files = files;
          uploadFile(files[0]);
        } else {
          showToast("Max file size is 100MB");
        }
      } else {
        showToast("You can't upload multiple files");
      }
      dropZone.classList.remove("dragged");
    };
    const handleDragOver = (e) => {
      e.preventDefault();
      dropZone.classList.add("dragged");
    };
    const handleDragLeave = () => dropZone.classList.remove("dragged");

    const handleFileChange = () => {
      if (fileInput.files[0].size > maxAllowedSize) {
        showToast("Max file size is 100MB");
        fileInput.value = ""; // reset the input
        return;
      }
      uploadFile(fileInput.files[0]);
    };

    const handleCopyClick = () => {
      fileURL.select();
      document.execCommand("copy");
      showToast("Copied to clipboard");
    };

    const handleEmailSubmit = async (e) => {
      e.preventDefault();
      emailFormRef.current[2].setAttribute("disabled", "true");
      emailFormRef.current[2].innerText = "Sending";
    
      const url = fileUrl;
      const formData = {
        uuid: url.split("/").splice(-1, 1)[0],
        emailTo: emailFormRef.current.elements["to-email"].value,
        emailFrom: emailFormRef.current.elements["from-email"].value,
      };
    
      try {
        const response = await axios.post(`${baseURL}/api/files/send`, formData, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.data.success) {
          showToast("Email Sent");
          document.querySelector(".sharing-container").style.display = "none";
        }
      } catch (error) {
        showToast(`Error in sending email: ${error.message}`);
        emailFormRef.current[2].removeAttribute("disabled");
        emailFormRef.current[2].innerText = "Send";
      }
    };
    

    if (browseBtn) browseBtn.addEventListener("click", handleBrowseClick);
    if (dropZone) {
      dropZone.addEventListener("drop", handleDrop);
      dropZone.addEventListener("dragover", handleDragOver);
      dropZone.addEventListener("dragleave", handleDragLeave);
    }
    if (fileInput) fileInput.addEventListener("change", handleFileChange);
    if (copyURLBtn) copyURLBtn.addEventListener("click", handleCopyClick);
    if (emailForm) emailForm.addEventListener("submit", handleEmailSubmit);

    return () => {
      if (browseBtn) browseBtn.removeEventListener("click", handleBrowseClick);
      if (dropZone) {
        dropZone.removeEventListener("drop", handleDrop);
        dropZone.removeEventListener("dragover", handleDragOver);
        dropZone.removeEventListener("dragleave", handleDragLeave);
      }
      if (fileInput) fileInput.removeEventListener("change", handleFileChange);
      if (copyURLBtn) copyURLBtn.removeEventListener("click", handleCopyClick);
      if (emailForm) emailForm.removeEventListener("submit", handleEmailSubmit);
    };
  }, []);

  const uploadFile = (file) => {
    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("myfile", file);

    axios
      .post(`${baseURL}/api/files`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (100 * progressEvent.loaded) / progressEvent.total
          );
          setProgress(percent);
        },
      })
      .then((response) => {
        setUploadStatus("Uploaded");
        setFileUrl(response.data.file);
      })
      .catch((error) => {
        showToast(`Error in upload: ${error.message}`);
        fileInputRef.current.value = "";
      });
  };

  const showToast = (msg) => {
    const toast = document.querySelector(".toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  };

  return (
    <>
      <section className="upload-container">
        <form action="">
          <div className="drop-zone">
            <div className="icon-container">
              <img
                src="./file.svg"
                draggable="false"
                className="center"
                alt="File Icon"
              />
              <img
                src="./file.svg"
                draggable="false"
                className="left"
                alt="File Icon"
              />
              <img
                src="./file.svg"
                draggable="false"
                className="right"
                alt="File Icon"
              />
            </div>
            <input type="file" id="fileInput" ref={fileInputRef} />
            <div className="title">
              Drop your files here or,{" "}
              <span id="browseBtn" ref={browseBtnRef}>
                browse
              </span>
            </div>
          </div>
        </form>
        {progress > 0 && (
          <div className="progress-container">
            <div
              className="bg-progress"
              style={{ transform: `scaleX(${progress / 100})` }}
            ></div>
            <div className="inner-container">
              <div className="status">{uploadStatus}</div>
              <div className="percent-container">
                <span className="percentage" id="progressPercent">
                  {progress}
                </span>
                %
              </div>
              <div
                className="progress-bar"
                style={{ transform: `scaleX(${progress / 100})` }}
              ></div>
            </div>
          </div>
        )}
        {fileUrl && (
          <div className="sharing-container">
            <p className="expire">Link expires in 24 hrs</p>
            <div className="input-container">
              <input type="text" id="fileURL" readOnly value={fileUrl} />
              <img
                src="upload/copy-icon.svg"
                id="copyURLBtn"
                ref={copyURLBtnRef}
                alt="Copy to clipboard icon"
              />
            </div>
            <p className="email-info">Or send via email</p>
            <div className="email-container">
              <form id="emailForm" ref={emailFormRef}>
                <div className="field">
                  <label htmlFor="fromEmail">Your email</label>
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    name="from-email"
                    id="fromEmail"
                  />
                </div>
                <div className="field">
                  <label htmlFor="toEmail">Receiver's email</label>
                  <input
                    type="email"
                    required
                    autoComplete="receiver"
                    name="to-email"
                    id="toEmail"
                  />
                </div>
                <div className="send-btn-container">
                  <button type="submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="toast"></div>
      </section>
    </>
  );
}

export default Upload;
