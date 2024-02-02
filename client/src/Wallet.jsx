import { useState } from "react";
import "./Wallet.css"
import server from "./server";
import {secp256k1} from "ethereum-cryptography/secp256k1"
import {sha256} from "ethereum-cryptography/sha256"
import {toHex} from "ethereum-cryptography/utils"
function Wallet({ address, setAddress, balance, setBalance ,privKey, setPrivKey }) {
  const [checkable, setCheckable] = useState(false);
  async function onChange(evt) {
    setPrivKey(evt.target.value);
    setCheckable(true);
    setAddress(
      
      toHex(sha256(secp256k1.getPublicKey(evt.target.value).slice(1)).slice(-20)).toString()
      
    )
    if ( toHex(sha256(secp256k1.getPublicKey(evt.target.value).slice(1)).slice(-20)).toString()) {
      const {
        data: { balance },
      } = await server.get(`balance/${ toHex(sha256(secp256k1.getPublicKey(evt.target.value).slice(1)).slice(-20)).toString()}`);
      
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet private key
        <input  className={`${checkable ? secp256k1.utils.isValidPrivateKey(privKey)?"Valid":"UnValid":null}`} placeholder="Type your private key, for example: 0x1" value={privKey} onChange={onChange}></input>
      </label>
      <div>
        Address: <>{address && <p>{address}</p>}</>
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
