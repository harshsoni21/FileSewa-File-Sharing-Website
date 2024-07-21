import React from "react";

function Hidden({proge}) {
  return (
    <>
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
    </>
  );
}

export default Hidden;
