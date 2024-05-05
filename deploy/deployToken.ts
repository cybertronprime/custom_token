import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { BigNumber } from 'ethers';
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// load env file
import dotenv from "dotenv";
dotenv.config();

// load wallet private key from env file
const PRIVATE_KEY = "0x69a0a908f3a6c7a26124b6566f973a8c5fc7a89fea1c112126dc5319db4b9ac6";

if (!PRIVATE_KEY)
  throw "⛔️ Private key not detected! Add it to the .env file!";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the  contract`);

  // Initialize the wallet.
  const wallet = new Wallet(PRIVATE_KEY);
  const supply: BigNumber = ethers.utils.parseEther('1000000');
  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("OurToken");

  // Estimate contract deployment fee
//   const greeting = "Hi there!";
  const deploymentFee = await deployer.estimateDeployFee(artifact, [supply]);

  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const sinkDrainContract = await deployer.deploy(artifact, [supply]);

  //obtain the Constructor Arguments
  console.log(
    "constructor args:" + sinkDrainContract.interface.encodeDeploy([supply]),
  );

  // Show the contract info.
  const contractAddress = sinkDrainContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

  const contractFullyQualifedName =
  "contracts/OurToken.sol:OurToken";
const verificationId = await hre.run("verify:verify", {
  address: contractAddress,
  contract: contractFullyQualifedName,
  constructorArguments: [],
  bytecode: artifact.bytecode,
});
console.log(
  `${contractFullyQualifedName} verified! VerificationId: ${verificationId}`,
);
}