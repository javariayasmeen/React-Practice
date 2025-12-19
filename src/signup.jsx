import React from 'react';
import { useState } from 'react';
import "./signup.css";
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isloading, setIsloading] = useState(false);
    const [error, setError] = useState("");
    const handleSubmission = async (s) => {
        s.preventDefault();
        setIsloading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    password: password,
                    email: email
                })
            })
            console.log(res);

            const recData = res.json();
            if (!res.ok) {
                throw new Error(recData.message || "User has not registered yet!!!");
            }
            console.log("User has registered");
            alert("User has registered Successfully!!!");
            setEmail("");
            setPassword("");
            setName("");
        }
        catch (s) {
            console.log(s.message);
            setError(s.message)
        }
        finally {
            setIsloading(false);
        }
    }
    return (
        <>
            <div class="SignUpForm">
                <form onSubmit={handleSubmission}>
                    <div classname="nameSection">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name" placeholder="Jos Buttler" value={name} onChange={(s) => setName(s.target.value)} required />
                    </div>
                    <div classname="emailSection">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" placeholder="alpha@gmail.com" value={email} onChange={(s) => setEmail(s.target.value)} required />
                    </div>
                    <div classname="passwordSection">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="......." value={password} onChange={(s) => setPassword(s.target.value)} required />
                    </div>
                    <p>{error && <span style={{ color: "red", fontSize: "15px" }}>{error}</span>}</p>
                    <button type="submit" disabled={isloading}>
                        {isloading ? "processing..." : "signUp"}
                    </button>
                </form>
            </div>
        </>
    )
}
export default SignUp;