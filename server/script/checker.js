const secp = require("ethereum-cryptography/secp256k1")
const {toHex,utf8ToBytes} = require("ethereum-cryptography/utils")
const {keccak256}=require("ethereum-cryptography/keccak")
const jsonBig = require("json-bigint")
jsonBig
const verifyTransaction = (tx,pubKey,hashedMsg,signature) => {
    const sig = {
        r:BigInt(signature.r),s:BigInt(signature.s),recovery:signature.recovery
    }
    let pubKeyTreated=  new Uint8Array(Object.values(pubKey))
    
 
   
    
    return secp.secp256k1.verify(sig,hashedMsg,pubKeyTreated);
}

module.exports=verifyTransaction;

