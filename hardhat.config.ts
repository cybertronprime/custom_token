import * as dotenv from "dotenv";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";

dotenv.config();


module.exports ={
    defaultNetwork: "zksync",
    networks: {
        hardhat: {
        },
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/wJ4MOyRL_MQ9a3jJiFVpBGrfZf9jmVKL`,
            accounts: [`${process.env.PRIVATE_KEY_DEPLOY}`]
        },
        zksync: {
            url: `https://sepolia.era.zksync.dev`,
            ethNetwork: "sepolia", 
            zksync: true,
            accounts: [`${process.env.PRIVATE_KEY_DEPLOY}`],
            verifyURL: 'https://explorer.sepolia.era.zksync.dev/contract_verification'

        }
    },
    solidity: {
        compilers: [
            {
              version: "0.8.19",
            }
          ],
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    zksolc: { // need to reference zksolc compiler
        compilerSource: 'binary',
        version: "1.3.22",
        settings: {
      },
    },
    
    
    paths: {
        contracts: "./contracts",
      }
}