import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/Layouts";
import Section from "../components/Layouts/Section";
import SEO from "../components/SEO";
import ReachUsSection from "../components/SharedSections/ReachUsSection";
import StakingPanel from "../components/StakingPanel";
import highlighText from "../components/Tools/highlightText";

export default function StakePage() {
  return (
    <Layout>
      <SEO
        title="Stake your KRL-BUSD LP tokens"
        description="Stake your KRL-BUSD LP tokens and be eligible for rewards"
      />
      <Section padding className="!px-0 md:!px-8 !max-w-screen-lg">
        <div
          className="md:h[700px] mx-auto flex flex-col-reverse px-4 md:px-0
          md:flex-row md:justify-between md:item-center gap-3"
        >
          <div className="w-full pt-10 space-y-6">
            <h1 className="uppercase font-normal text-primary-700">{highlighText("KRYPTOLITE")} LP Rewards</h1>
            <p>
              Stake your KRL-BUSD LP tokens from providing liquidity in the KRL/BUSD pair on PancakeSwap and be eligible
              for additional rewards from the bonus staking pool! Participants in the Rewards Program gain rewards based
              on their percentage share of the overall stake pool.
            </p>
          </div>
          <div className="flex-shrink-0 mx-auto max-w-sm w-full px-10 md:mt-5">
            <StaticImage
              src="../images/stake-page-hero.png"
              alt="KRYPTOLITE Logo"
              layout="fullWidth"
              placeholder="blurred"
              quality={100}
            />
          </div>
        </div>
      </Section>
      <Section className="!max-w-screen-lg">
        <StakingPanel />
      </Section>
      <ReachUsSection />
    </Layout>
  );
}
