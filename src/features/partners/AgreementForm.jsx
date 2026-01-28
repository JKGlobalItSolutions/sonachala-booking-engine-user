import React from "react";

// Import images from src folder

import form1 from "../../assets/image/agreementform/form1.png";

import form2 from "../../assets/image/agreementform/form2.png";
import form3 from "../../assets/image/agreementform/form3.png";
import form4 from "../../assets/image/agreementform/form4.png";

// import agreementPDF from "../../assets/pdf/AgreementForm.pdf";

const Agreementform = () => {
  const imageFiles = [form1, form2, form3, form4];

  const handleDownload = () => {
    // Download functionality can be implemented here when PDF is available
    alert("Download functionality will be available when PDF is uploaded");
  };

  return (
    <div className="ota-page-wrapper" style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", paddingTop: "120px", fontFamily: "'Inter', sans-serif" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="fw-800 mb-2">Partner Agreement</h1>
            <p className="text-secondary h5 fw-normal">Review and download your partnership documentation</p>
          </div>
          <button
            onClick={handleDownload}
            className="ota-btn-primary px-4 py-2 fw-bold shadow-sm"
          >
            <i className="fas fa-file-download me-2"></i> Download PDF
          </button>
        </div>

        <div className="row g-4">
          {imageFiles.map((src, index) => (
            <div className="col-md-6" key={index}>
              <div className="ota-card shadow-sm p-2 overflow-hidden bg-white">
                <div className="text-center py-2 border-bottom mb-2 small fw-bold text-muted">
                  Page {index + 1}
                </div>
                <img
                  src={src}
                  alt={`Agreement Page ${index + 1}`}
                  className="img-fluid rounded"
                  style={{ cursor: "zoom-in" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 ota-card bg-white border-left-success" style={{ borderLeft: "4px solid var(--brand-primary)" }}>
          <h4 className="fw-bold mb-3">Important Notice</h4>
          <p className="text-secondary mb-0">
            Please ensure all pages are read thoroughly before signing. Once completed, please upload the signed scanned copy through your partner dashboard or email it to our support team.
          </p>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '.fw-800 { font-weight: 800; }' }} />
    </div>
  );
};

export default Agreementform;
