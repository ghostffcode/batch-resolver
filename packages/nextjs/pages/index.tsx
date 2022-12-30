import type { NextPage } from "next";
import Head from "next/head";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useProvider } from "wagmi";

const ABI = [
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "contract Registry",
        name: "registry",
        type: "address",
      },
      {
        internalType: "bytes32[]",
        name: "names",
        type: "bytes32[]",
      },
    ],
    name: "batchResolveWithCustomRegistry",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "names",
        type: "bytes32[]",
      },
    ],
    name: "batchResolveWithENSRegistry",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

type ResolvedListItem = {
  ens: string;
  address?: `0x${string}` | "Invalid ENS";
};

const Home: NextPage = () => {
  const [addresses, setAddresses] = useState<string>("");
  const [resolvedList, setResolvedList] = useState<ResolvedListItem[]>([]);

  const provider = useProvider({ chainId: 1 });

  const handleENSResolve = async () => {
    const batchResolver = new ethers.Contract("0x4bC4a43Cac594432ED4F48965E5bf5aCA319f350", ABI, provider);
    const filteredAddresses = addresses.split(/\r?\n/).map(address => address.trim());
    const hashedAddress = filteredAddresses.map(add => ethers.utils.namehash(add));

    if (hashedAddress.length > 0) {
      const resolvedAddresses = await batchResolver.batchResolveWithENSRegistry(hashedAddress);

      setResolvedList(
        resolvedAddresses.map((address: `0x${string}`, i: number) => ({
          ens: filteredAddresses[i],
          address: address !== "0x0000000000000000000000000000000000000000" ? address : "Invalid ENS",
        })),
      );
    }
  };

  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <textarea
          rows={7}
          className="w-96 p-2"
          autoCorrect="false"
          placeholder="Enter ENS, one per line"
          onChange={e => setAddresses(e.target.value)}
        />
        <button className="btn btn-primary btn-sm mt-4" onClick={handleENSResolve}>
          Resolve ENS list
        </button>
      </div>

      <div className="flex items-center flex-col flex-grow pt-10">
        {resolvedList.map(({ ens, address }) => {
          return (
            <span key={ens}>
              {ens} : {address}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Home;
