import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../components/Buttons/Button";
import Section from "../components/Layouts/Section";
import Link from "../components/Link";
import SEO from "../components/SEO";
import FAQ from "../components/Tools/FAQ";

export default function IndexPage() {
  return (
    <main>
      <SEO
        title="Bitcoin Pizza Day Attendees surprises"
        description="We celebrated the Bitcoin Pizza Day event on Sunday, May 22nd 2022. As The 
        KRYPTOLITE Universe team, we thought we would mark this occasion with a 
        surprise gift for all attendees."
      />
      <Section className="!px-0 md:!px-8">
        <div
          className="mx-auto my-16 flex flex-col px-4 md:px-0
          md:flex-row md:justify-between md:items-center gap-3 text-center md:text-left"
        >
          <div className="w-full pt-10 space-y-6">
            <h1 className="font-bold">Bitcoin Pizza 2022 Hangout NFT</h1>
            <p className="md:text-xl">
              22nd May 2022 marks the 12th anniversary of{" "}
              <span className="text-[#CD7400]">Bitcoin Pizza Day</span>, widely
              celebrated in the Bitcoin community. As The KRYPTOLITE Universe
              team, we thought we would mark this occasion with a surprise gift
              for all attendees.
            </p>
          </div>
          <div
            className="flex-shrink-0 mx-auto w-full mt-5 grid grid-cols-3 grid-rows-1 max-w-sm gap-5
          max-h-[450px]"
          >
            <div className="grid grid-cols-1 gap-5 content-center">
              <div className="bg-black/10 rounded-md py-24" />
              <div className="bg-black/10 rounded-md py-20" />
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div className="bg-black/10 rounded-md py-14" />
              <div className="rounded-md overflow-hidden">
                <StaticImage
                  src="../images/Bitcoin-Pizza-Day-Hangout-2022-NFTs.jpg"
                  alt=""
                  layout="fullWidth"
                  placeholder="blurred"
                  quality={100}
                />
              </div>
              <div className="bg-black/10 py-24 rounded-md" />
            </div>
            <div className="grid grid-cols-1 content-center">
              <div className="bg-black/10 rounded-md row-span-2 py-40" />
            </div>
          </div>
        </div>
      </Section>
      <Section
        className="!max-w-screen-lg bg-[url('./images/party-balls.svg')] bg-no-repeat bg-right-top"
        containerClass="bg-[#64400C] relative"
        padding={true}
      >
        <div className="bg-gradient-to-r from-[#6B450B]/80 via-[#6B450B]/80 to-transparent absolute inset-0" />
        <div className="z-10 relative space-y-5 text-white text-lg md:text-xl ">
          <p>
            Bitcoin Pizza Day NFTs now available for all those who attended the{" "}
            <span className="text-[#00FFFF]">#BitcoinPizzaDayHangout2022</span>{" "}
            and filled this{" "}
            <Link
              className="text-[#00FFFF]"
              to="https://docs.google.com/forms/d/e/1FAIpQLScbfzlpCIzgNalPILo-uljBiXDGvW0nT1N-g8-hMz_vmb17MA/viewform"
            >
              form
            </Link>
          </p>
          <p>
            These limited-edition NFTs are claimable here, rarity is determined
            by how many attendees are eligible to mint for FREE.
          </p>
          <p>
            If you are an eligible participant, you get to mint your special
            edition NFT and show it off in your wallet.
          </p>
        </div>
      </Section>
      <Section padding={true}>
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-5">
            <h2 className="font-bold">Moral of the event.</h2>
            <p className="text-[#975C10] font-medium">
              12 years have passed since the very first Pizza Day. The Bitcoin
              community has evolved with infrastructure and technology allowing
              you to buy and do more than just buying a pizza with Bitcoin.
            </p>
            <p className="text-[#975C10] font-medium">
              This event is a powerful reminder that it’s best not to wager
              against crypto. And HODL (i.e. holding patiently) has proven to be
              a prudent strategy in long term. Crypto, in whatever shape it
              takes from now on, is staying put and will affect the world into
              the indefinite future, along these lines you ought to consider
              getting a piece.
            </p>
            <Button className="rounded-none">CLAIM YOUR NFT NOW</Button>
          </div>
          <div
            className="flex-shrink-0 mx-auto max-w-sm w-full p-4 my-5 md:my-0 bg-white shadow-md
          border rounded-md border-gray-100 shadow-gray-400"
          >
            <StaticImage
              src="../images/Bitcoin-Pizza-Day-Hangout-2022-NFTs.jpg"
              alt="invest-in-krl"
              layout="fullWidth"
              placeholder="blurred"
            />
          </div>
        </div>
      </Section>

      <Section containerClass="bg-gray-100" padding>
        <h3 className="text-4xl text-center">Frequently Asked Questions</h3>
        <p className="text-center">Wanna ask something?</p>
        <div>
          <FAQ expandedUuids={["what_is_bitcoin_pizza_day"]} />
        </div>
      </Section>
    </main>
  );
}
