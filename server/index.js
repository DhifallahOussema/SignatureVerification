const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const {keccak256}=require("ethereum-cryptography/keccak");
const verifyTransaction = require("./script/checker");
const {toHex,utf8ToBytes} = require("ethereum-cryptography/utils")
app.use(cors());
app.use(express.json());

const balances = {
  // 8e3e28642c2322152271ec7bde05e5a28b229d2fa21926d882bc437a23cea9bb
  "4187e834d0851d98c23db4d755b2a4c8849aa3d8": 100,
  // d39472f8717ab365574d6192c32bbf74965b89351b55c8a56e610e4cf9322bd6
  "aee9b99fc2b09b401d6208fd1ecfa11cc9c596d2": 50,
  // 86a598dc65b1047520932e409cf352e80d9af488ca6073f687db1572f8e4e0dc
  "836b2adff4be07928d996b19ec2d50c4eca909fa": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { tx,
    signature,
    pubKey,hashedTX } = req.body;
    let isValid = verifyTransaction(tx,pubKey,hashedTX,signature);


    if (isValid) {
      setInitialBalance(tx.sender);
  setInitialBalance(tx.recipient);
  

  if (balances[tx.sender] < tx.amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[tx.sender] -= tx.amount;
    balances[tx.recipient] += tx.amount;
    res.send({ balance: balances[tx.sender] });
  }
    } else {
        res.status(400).send({ message: "Invalid signature!" });  
     }

  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
