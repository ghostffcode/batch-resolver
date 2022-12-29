import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "ethers";

const deployENSBatchResolver: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // proxy only in non-live network (localhost and hardhat network) enabling HCR (Hot Contract Replacement)
  // in live network, proxy is disabled and constructor is invoked
  await deploy("ENSBatchResolver", {
    from: deployer,
    // Constructor args.
    args: [],
    log: true,
    // Speed up deployment on local network, no effect on live networks
    autoMine: true,
  });

  // Get the deployed contract.
  const ENSBatchResolver = await hre.ethers.getContract("ENSBatchResolver", deployer);

  const addresses: `0x${string}`[] = await ENSBatchResolver.batchResolveWithENSRegistry([
    ethers.utils.namehash("owocki.eth"),
    ethers.utils.namehash("austingriffith.eth"),
  ]);

  console.log({ addresses });
};

export default deployENSBatchResolver;

// Tags are useful if you have multiple deploy files and only want to run one of them
// e.g. yarn deploy --tags ENSBatchResolver
deployENSBatchResolver.tags = ["ENSBatchResolver"];
