import "./Account.css";
import Loading from "./loading";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

    return(
        <div className="income-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button><br></br>
            <center><h1>INCOME</h1></center>
            
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <Card className="w-full max-w-md rounded-2xl shadow-lg">
                <CardContent className="p-6 space-y-6">
                {/* Account Picture */}
                <div className="flex justify-center">
                    <img
                        src="https://placehold.co/100x100"
                        alt="Account"
                        className="rounded-full border shadow"
                    />
                </div>


                {/* Email Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email address</label>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>


                <Button className="w-full" onClick={handleSendCode}>
                    Send Reset Code
                </Button>
                </CardContent>
                </Card>


                {/* Popup / Modal */}
                <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="rounded-2xl">
                <DialogHeader>
                <DialogTitle>Reset Code</DialogTitle>
                </DialogHeader>


                <div className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Enter code sent to email"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <Button className="w-full" onClick={handleReset}>
                        Verify & Reset
                    </Button>
                </div>
                </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}