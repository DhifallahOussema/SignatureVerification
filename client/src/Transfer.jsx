import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import {secp256k1} from "ethereum-cryptography/secp256k1"
import { toHex, utf8ToBytes ,bytesToHex, bytesToUtf8} from "ethereum-cryptography/utils";
import JsonBigInt from "json-bigint";
import {ethers} from "ethers"

function Transfer({ address, setBalance,privKey }) {
  
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const tx = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient: recipient
    };
    
    const hashedTX = toHex(keccak256(utf8ToBytes(JSON.stringify(tx))));
    const publicKey = secp256k1.getPublicKey(privKey);
    
  const signature = secp256k1.sign(hashedTX, privKey);
  const signatureWithStringValues = {
    r: signature.r.toString(),
    s: signature.s.toString(),
    recovery: signature.recovery
  };
  const verif = secp256k1.verify(signature,hashedTX,publicKey);
  
    // try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        tx:tx,
        signature:signatureWithStringValues,
        pubKey:publicKey,
        hashedTX:hashedTX
      });
      setBalance(balance);
    // } catch (ex) {
      // alert(ex.response.data.message);
    // }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
