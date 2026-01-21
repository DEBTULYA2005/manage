import "./Account.css";
import Loading from "./loading";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Account(){
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("");


    const handleSendCode = () => {
        // API call to send code to email
        setOpen(true);
    };


    const handleReset = () => {
        // API call to verify/reset code
        setOpen(false);
        setCode("");
    };

    return (
        <div className="Account-page">

            <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
            </button>

            <h1 style={{ textAlign: "center" }}>ACCOUNT</h1>

            <div className="account-container">
            
            {/* Account Card */}
            <div className="account-card">

                {/* Account Picture */}
                <div className="avatar">
                <img
                    src="https://placehold.co/100x100"
                    alt="Account"
                />
                </div>

                {/* Email Input */}
                <div className="form-group">
                <label>Email address</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                <button className="primary-btn" onClick={handleSendCode}>
                Send Reset Code
                </button>
            </div>

            {/* Popup Modal */}
            {open && (
                <div className="modal-overlay">
                <div className="modal-box">
                    <h3>Reset Code</h3>

                    <input
                    type="text"
                    placeholder="Enter code sent to email"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    />

                    <button className="primary-btn" onClick={handleReset}>
                    Verify & Reset
                    </button>

                    <button className="secondary-btn" onClick={() => setOpen(false)}>
                    Cancel
                    </button>
                </div>
                </div>
            )}

            </div>
        </div>
    );

}