import React from "react";
import Section from "../components/Layouts/Section";
import Link from "../components/Link";
import SEO from "../components/SEO";

export default function LaunchPad() {
  return (
    <main>
      <SEO
        title="The KRYPTOLITE Universe LaunchPad"
        description="KRYPTOLITE will empower cryptocurrency projects with the ability to distribute tokens and raise liquidity. Staking KRL-LP is required to guarantee an allocation based on the pool weight."
      />
      <Section
        containerClass="bg-[url('./images/launchpad-hero-illustration.svg')] bg-cover bg-center"
        className="flex items-center justify-center h-[500px] bg-gradient-to-b from-[#250045]/60
        to-[#29004E]/30 !max-w-none"
      >
        <Section className="text-white text-center ">
          <h1>The KRYPTOLITE Universe LaunchPad</h1>
          <p>
            KRYPTOLITE will empower cryptocurrency projects with the ability to distribute tokens and raise liquidity.
            Staking KRL-LP is required to guarantee an allocation based on the pool weight.
          </p>
        </Section>
      </Section>
      <Section padding className="bg-gray-100 rounded-lg m-10 space-y-5 flex flex-col items-center justify-center">
        <p>No projects currently open</p>
        <Link to="https://forms.gle/98io1yJHkYim2Cbr8" as="button" variant="outline">
          APPLY FOR IDO
        </Link>
      </Section>
    </main>
  );
}
