import React, { Fragment } from "react";
import StakingPanel from "../components/StakingPanel";

const mails = [
  "admin@kryptolite.rocks",
  "info@kryptolite.rocks",
  "kryptoliteswap@gmail.com",
];

export default function StakePage() {
  return (
    <Fragment>
      <div className="bg-dark px-2 md:px-14 pt-16 pb-12 max-w-screen-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl md:my-8 font-bold text-center">
          KRYPTOLITE LP Rewards
        </h1>
        <p className="my-4 py-2 text-center">
          Stake your KRL-BUSD LP tokens from providing liquidity in the KRL/BUSD
          pair on PancakeSwap and be eligible for additional rewards from the
          bonus staking pool!
        </p>
        <p className="my-4 py-2 text-center">
          Participants in the Rewards Program gain rewards based on their
          percentage share of the overall stake pool.
        </p>
      </div>
      <StakingPanel />
      <section
        id="contact-us"
        className="text-center px-2 pt-24 pb-12 max-w-screen-2xl mx-auto"
      >
        <div className="mb-12">
          <small>CONTACT US</small>
          <h2 className="text-4xl font-bold mb-4">Reach us from here</h2>
          <p>
            If you have any question, feel free to drop us a message, we will
            get back to you as soon as we can
          </p>
        </div>
        <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-around">
          {mails.map((mail, i) => (
            <a
              key={i}
              href={`mailto:${mail}`}
              className="py-3 px-14 text-white bg-primary font-medium rounded-full m-4 w-11/12 lg:w-auto transition-colors duration-300 hover:bg-white hover:text-dark"
            >
              {mail}
            </a>
          ))}
        </div>
      </section>
    </Fragment>
  );
}
