//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {ManualToken} from "../src/ManualToken.sol";

contract DeployOurToken is Script{

    function run() external {
        vm.startBroadcast();
        new ManualToken();
        vm.stopBroadcast();

    }

}