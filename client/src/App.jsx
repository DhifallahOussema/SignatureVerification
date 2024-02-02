import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";


function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privKey, setPrivKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privKey={privKey}
        setPrivKey={setPrivKey}
      />
      <Transfer privKey={privKey} setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
