import React, { Fragment, useCallback, useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../components/Buttons/Button";
import Section from "../components/Layouts/Section";
import Link from "../components/Link";
import SEO from "../components/SEO";
import FAQ from "../components/Tools/FAQ";
import ConnectWalletButton from "../components/Buttons/ConnectWalletButton";
import Banner from "../components/Tools/Banner";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { getPizzaDayContract } from "../utils/contractHelpers";
import BigNumber from "bignumber.js";
import useToast from "../hooks/useToast";
import { FaDiscord } from "react-icons/fa";

export default function IndexPage() {
  const [eligible, setEligible] = useState(false);
  const [claimedNFT, setClaimedNFT] = useState(false);
  const [requesting, setRequesting] = useState(false);
  // Show discord
  const [eligibilityChecked, setEligibilityChecked] = useState(false);
  const [triedClaim, setTriedClaim] = useState(false);

  const { active, account, library } = useActiveWeb3React();
  const { toastError, toastSuccess } = useToast();

  const checkEligiblity = useCallback(async () => {
    setRequesting(true);
    try {
      if (account) {
        const contract = getPizzaDayContract();
        const isWhiteListed = await contract.isWhitelistedAtendee(account);
        console.log(isWhiteListed);
        if (isWhiteListed === true) {
          setEligible(true);
          setEligibilityChecked(true);
        } else {
          setEligible(false);
          toastError("Sorry! You aren't eligible to Mint.");
          setEligibilityChecked(true);
        }
      } else {
        setEligible(false);
      }
    } catch (error) {
      //console.error(error);
      setEligible(false);
      toastError("Transaction failed, you can try again.");
    } finally {
      setRequesting(false);
    }
  }, [account]);

  const claimNFT = useCallback(async () => {
    setRequesting(true);
    try {
      if (account && library) {
        const contract = getPizzaDayContract(library.getSigner());

        // check if user has minted
        const bal = await contract.balanceOf(account);
        const hasMinted = new BigNumber(bal._hex).isGreaterThan(0);

        if (!hasMinted) {
          const tx = await contract.mint();
          await tx.wait();
          setClaimedNFT(true);
          toastSuccess("Success!");
          setTriedClaim(true);
        } else {
          // User has previously minted
          toastError("Cannot mint more");
          setTriedClaim(true);
        }
      } else {
        setClaimedNFT(false);
      }
    } catch (error) {
      setClaimedNFT(false);
      toastError("Transaction failed, you can try again.");
    } finally {
      setRequesting(false);
    }
  }, [account, library]);

  return (
    <main>
      <SEO
        title="Bitcoin Pizza Day Hangout 2022 NFT"
        description="We celebrated the Bitcoin Pizza Day event on Sunday, May 22nd 2022. As The 
        KRYPTOLITE Universe team, we thought we would mark this occasion with a 
        surprise gift for all attendees."
      />
      <Section className="!px-0 md:!px-8">
        <div
          className="mx-auto my-16 flex flex-col px-4 md:px-0
          md:flex-row md:justify-between md:items-center gap-3 text-left"
        >
          <div className="w-full pt-10 space-y-6">
            <h1 className="font-bold">Bitcoin Pizza Day Hangout 2022 NFT</h1>
            <p className="md:text-xl">
              22nd May 2022 marks the 12th anniversary of <span className="text-[#CD7400]">Bitcoin Pizza Day</span>,
              widely celebrated in the Bitcoin community. As The KRYPTOLITE Universe team, we thought we would mark this
              occasion with a surprise gift for all attendees.
            </p>
          </div>
          <div
            className="flex-shrink-0 mx-auto w-full mt-5 grid grid-cols-3 grid-rows-1 max-w-sm gap-5
          max-h-[450px]"
          >
            <div className="grid grid-cols-1 gap-5 content-center">
              <div className="bg-black/10 rounded-md py-12 md:py-24" />
              <div className="bg-black/10 rounded-md py-10 md:py-20" />
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div className="bg-black/10 rounded-md py-7 md:py-14" />
              <div className="rounded-md overflow-hidden">
                <StaticImage
                  src="../images/Bitcoin-Pizza-Day-Hangout-2022-NFTs.jpg"
                  alt=""
                  layout="fullWidth"
                  placeholder="blurred"
                  quality={100}
                />
              </div>
              <div className="bg-black/10 py-12 md:py-24 rounded-md" />
            </div>
            <div className="grid grid-cols-1 content-center">
              <div className="bg-black/10 rounded-md row-span-2 py-20 md:py-40" />
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
            <span className="text-[#00FFFF]">#BitcoinPizzaDayHangout2022</span> and filled{" "}
            <Link
              className="text-[#00FFFF]"
              to="https://docs.google.com/forms/d/e/1FAIpQLScbfzlpCIzgNalPILo-uljBiXDGvW0nT1N-g8-hMz_vmb17MA/viewform"
            >
              this Google form
            </Link>
          </p>
          <p>
            These limited-edition NFTs are claimable here, rarity is determined by how many attendees are eligible to
            mint for FREE.
          </p>
          <p>
            If you are an eligible participant, you get to mint your special edition NFT and show it off in your wallet.
          </p>
        </div>
      </Section>
      <Section padding={true}>
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-5">
            <h2 className="font-bold">Moral of the event.</h2>
            <p className="text-[#975C10] font-medium">
              12 years have passed since the very first Pizza Day. The Bitcoin community has evolved with infrastructure
              and technology allowing you to buy and do more than just buying a pizza with Bitcoin.
            </p>
            <p className="text-[#975C10] font-medium">
              This event is a powerful reminder that it’s best not to wager against crypto. And HODL (i.e. holding
              patiently) has proven to be a prudent strategy in long term. Crypto, in whatever shape it takes from now
              on, is staying put and will affect the world into the indefinite future, along these lines you ought to
              consider getting a piece.
            </p>

            <small className="block text-amber-500">
              Special shout-out to the <b>Crypto Bootcamp Community</b> and <b>Crypto Ladies League</b> for organizing
              this event in major cities across Africa.
            </small>
          </div>
          <div
            className="flex-shrink-0 mx-auto max-w-sm w-full p-4 my-5 md:my-0 bg-white shadow-md
          border rounded-md border-gray-100 shadow-gray-400"
          >
            <StaticImage
              src="../images/Bitcoin-Pizza-Day-Hangout-2022-NFTs.jpg"
              alt="Bitcoin Pizza Day Hangout 2022 NFTs"
              layout="fullWidth"
              placeholder="blurred"
            />
          </div>
        </div>
      </Section>
      <Section padding className="bg-white space-y-5 flex flex-col justify-center" containerClass="border">
        {!active && (
          <Banner type="info">
            To be eligible to claim the Bitcoin Pizza Day NFTs, you have to connect a wallet address that has been
            whitelisted by submitting{" "}
            <Link
              className="text-blue-600"
              to="https://docs.google.com/forms/d/e/1FAIpQLScbfzlpCIzgNalPILo-uljBiXDGvW0nT1N-g8-hMz_vmb17MA/viewform"
            >
              this Google form
            </Link>
          </Banner>
        )}
        <ConnectWalletButton className="w-auto mx-auto block" />
        {active && !eligible && (
          <Fragment>
            <Banner type="info">
              {eligibilityChecked
                ? `Not eligible? Don't fret! Join our discord server today to get daily points which can be
                used to purchase NFTs and upgrade your role in The Kryptolite Universe.`
                : "Try checking your eligibilty status"}
            </Banner>
            {eligibilityChecked ? (
              <Link
                to="https://discord.gg/9aY3gRPdQx"
                className="rounded-none w-auto mx-auto flex items-center gap-2"
                as="button"
              >
                <FaDiscord />
                Join Discord
              </Link>
            ) : (
              <Button
                className="rounded-none block w-auto mx-auto"
                onClick={checkEligiblity}
                disabled={requesting}
                loading={requesting}
              >
                CHECK ELIGIBILITY
              </Button>
            )}
          </Fragment>
        )}
        {active && eligible && !claimedNFT && (
          <Fragment>
            <Banner type="success">
              {triedClaim ? (
                <p>
                  Hey! You've already minted your #BitcoinPizzaDayNFT <br /> <br /> Join our discord server to get daily
                  points which can be used to purchase NFT's and upgrade your role in The Kryptolite Universe
                </p>
              ) : (
                "You are eligible"
              )}
            </Banner>
            {triedClaim ? (
              <Link
                to="https://discord.gg/9aY3gRPdQx"
                className="rounded-none w-auto mx-auto flex items-center gap-2"
                as="button"
              >
                <FaDiscord />
                Join Discord
              </Link>
            ) : (
              <Button
                className="rounded-none block w-auto mx-auto"
                onClick={claimNFT}
                disabled={requesting}
                loading={requesting}
              >
                CLAIM YOUR NFT NOW
              </Button>
            )}
          </Fragment>
        )}
        {active && eligible && claimedNFT && (
          <Banner type="success">
            <p>
              Congrats! You've minted your #BitcoinPizzaDayNFT <br /> <br /> Join our discord server to get daily points
              which can be used to purchase NFT's and upgrade your role in The Kryptolite Universe
            </p>
          </Banner>
        )}
      </Section>

      <Section containerClass="bg-gray-100" padding>
        <h3 className="text-4xl text-center">Frequently Asked Questions</h3>
        <div>
          <FAQ expandedUuids={["what_is_bitcoin_pizza_day"]} />
        </div>
      </Section>
    </main>
  );
}
