import type { NextPage } from "next";
import Head from "next/head";
// import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
import React, { useState } from "react";

const Home: NextPage = () => {
  const [addresses, setAddresses] = useState<string>("");

  console.log({ addresses });

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
          placeholder="Enter ENS, one line at a time"
          onChange={e => setAddresses(e.target.value)}
        />
      </div>
    </>
  );
};

export default Home;
