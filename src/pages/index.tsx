import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Section from "../components/Layouts/Section";
import SEO from "../components/SEO";
import cls from "classnames";
import { RiMailSendLine, RiMoneyDollarCircleFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { BsQuestionSquare, BsShieldFillCheck } from "react-icons/bs";
import SocialList from "../components/Layouts/Footer/SocialList";
import Link from "../components/Link";

export default function IndexPage() {
  return (
    <main>
      <SEO
        title="Kryptolite"
        description="KRYPTOLITE - the next 100X DeFi gem you don't want to miss"
      />
      <Section className="!pt-0 pb-0">
        <div
          className="md:h[700px] mx-auto my-16 flex flex-col
          md:flex-row md:justify-between md:item-start gap-3 text-center md:text-left"
        >
          <div className="max-w-8xl w-full pt-10 space-y-10">
            <h1 className="text-[2.7rem]">
              {highlighText("Advanced")} DeFi protocol
            </h1>
            <p className="text-2xl">
              KRYPTOLITE is the first hybrid protocol that leverages
              Proof-of-Work, Proof-of-Stake and human work to create a platform
              that is fast, inclusive and resilient to attacks.
            </p>
            <div className="my-5 space-x-5">
              <Link to="#" as="button" className="inline-flex space-x-2">
                <RiMoneyDollarCircleFill />
                <span>Buy $KRL</span>
              </Link>
              <Link
                to="#"
                as="button"
                className="inline-flex space-x-2"
                variant="outline"
              >
                <BsShieldFillCheck />
                <span>Stake $KRL</span>
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0 mx-auto max-w-sm w-full px-10 mt-5 md:mt-0">
            <StaticImage
              src="../images/icon.png"
              alt="TTEB Logo"
              layout="fullWidth"
              placeholder="blurred"
            />
          </div>
        </div>
        <div className="bg-white h-[500px] w-full p-5 shadow-xl shadow-gray-200 rounded-md">
          <div className="bg-primary-300 w-full h-full"></div>
        </div>
      </Section>
      <Section
        className="text-center flex flex-col items-center"
        padding={true}
      >
        <p className="text-xl md:text-3xl text-primary-900">
          The Kryptolite Universe is designed to allow our community tap into
          and utilize the full potential of Decentralized Finance without the
          demands of active portfolio management.
        </p>
        <Link to="#" as="button" className="mt-10 block w-auto">
          Buy $KRL Today
        </Link>
      </Section>
      <Section
        containerClass="bg-gray-50"
        className="flex flex-col items-start md:flex-row text-center md:text-left"
        padding={true}
      >
        <div className="max-w-sm w-full mx-auto mb-10 md:mb-0">
          <div className="mx-auto max-w-sm w-full px-10 mt-5 md:mt-0">
            <StaticImage
              src="../images/icon.png"
              alt="TTEB Logo"
              layout="fullWidth"
              placeholder="blurred"
            />
          </div>
        </div>
        <div className="w-full space-y-5">
          <h2>What is {highlighText("More")}</h2>
          <p>
            The KRL token is a unique utility token for the Kryptolite Universe
            (a.k.a KRYPTOVERSE) that is used for:
          </p>
          <ul className="list-disc list-inside space-y-3 text-left">
            <li>
              Staking to earn passive income (% APY) and trade with up to zero
              fees on KryptoliteSwap.
            </li>
            <li>Purchase of Exclusive KRYPTOLITE Gem NFT's.</li>
            <li>Discounted launchpad subscriptions.</li>
            <li>
              Used for governance votes to determine how network resources are
              allocated.
            </li>
          </ul>
          <p>
            KRYPTOLITE's intention is to be globally adopted for use as a proof
            of stake (PoS) token which allows our community to trade with up to
            ZERO fees and still receive reasonable APY from staked KRL at the
            same time
          </p>
          <p>
            The vast majority of crypto projects live only in the crypto space,
            however we will achieve "Real World Impact and Takeover" by
            organizing campaigns targeted at sensitising and educating the
            general public on the key role of Decentralized Finance (DeFi)
            protocols while also generating buzz over the usual channels and
            ways in crypto - always in collaboration with our community!
          </p>
        </div>
      </Section>
      <Section padding={true} className="text-center md:text-left">
        <h2 className="md:text-center">
          {highlighText("Benefits")} of investing in KRL
        </h2>
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-center">
          <div className="space-y-5">
            <p>
              KRYPTOLITE allows for high yield trading — yield farming — that
              enables investors to borrow and stake their cryptocurrencies at
              considerably higher rates compared to traditional banking and
              investments.
            </p>
            <p>
              Staking increases liquidity and helps to increase the market
              capitalization of KRL which means that even as you earn interests,
              the price value of your tokens continue to increase
            </p>
            <p>
              Token ownership has been renounced, meaning that our smart
              contract cannot be manipulated and no new KRYPTOLITE tokens will
              ever be created, you can check out the transaction hash on BSCscan
              HERE
            </p>
          </div>
          <div className="flex-shrink-0 mx-auto max-w-sm w-full px-10 my-5 md:my-0">
            <StaticImage
              src="../images/icon.png"
              alt="TTEB Logo"
              layout="fullWidth"
              placeholder="blurred"
            />
          </div>
        </div>
      </Section>
      <Section containerClass="bg-gray-50" padding={true}>
        <h2 className="md:text-center">
          {highlighText("Hold and Stake")} $KRL
        </h2>
        <div className="text-center md:text-left md:flex md:items-center md:justify-center">
          <div className="max-w-sm w-full mx-auto mb-10 md:mb-0">
            <div className="mx-auto max-w-sm w-full px-10 mt-5 md:mt-0">
              <StaticImage
                src="../images/icon.png"
                alt="TTEB Logo"
                layout="fullWidth"
                placeholder="blurred"
              />
            </div>
          </div>
          <div className="w-full space-y-4">
            <p>
              KRYPTOLITE is designed to reward the community, through unique
              mechanisms. Users are encouraged to accumulate and stake $KRL in
              order to get the most returns from our PoS algorithm.
            </p>
            <p>
              With the further development of the DeFi ecosystem across multiple
              chains and protocols, Kryptolite will remain committed to
              developing a solid economic model for the $KRL token. This
              includes being open to change and adopting new developments that
              fit our specific use cases.
            </p>
            <p>
              KRL’s tokenomics follows a “repurchase and burn” model, which
              decreases the circulating supply of the KRL token as demand
              increases over time, driving up its value. This model keeps the
              value of KRL sustainable over the long run. Our tokenomics are
              also further supported by the “stake and earn” model, which
              further incentivizes KRL holders to keep their tokens.
            </p>
          </div>
        </div>
      </Section>
      <Section className="text-center md:text-left" padding={true}>
        <h2 className="md:text-center">
          Other Things {highlighText("We Offer")}
        </h2>
        <p>
          Our own Decentralized Exchange (AMM DEX) - KRL will be the fuel of the
          automated market maker protocol.
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-red-500 p-10"></div>
          <div className="bg-red-500 p-10"></div>
          <div className="bg-red-500 p-10"></div>
        </div>
      </Section>
      <Section className="text-center md:text-left" padding={true}>
        <h2 className="md:text-center">Our {highlighText("Roadmap")}</h2>
        <div className="p-20 bg-yellow-600"></div>
      </Section>
      <Section className="text-center space-y-10" padding={true}>
        <h2 className="md:text-center">Join {highlighText("Our Community")}</h2>
        <p>
          We are a new project but positive news about us is travelling fast. Be
          sure to join our amazing community to keep up-to-date and find out how
          you can get involved.
        </p>
        <SocialList />
      </Section>
      <Section className="text-center" padding={true}>
        <h2 className="md:text-center">{highlighText("Reach us")} from here</h2>
        <p>
          If you have any question, feel free to drop us a message, we will get
          back to you as soon as we can
        </p>
        <div
          className="flex flex-col md:flex-row justify-center items-center max-w-2xl mx-auto space-y-5 md:space-y-0
          md:space-x-5 my-10"
        >
          <div
            className="bg-white border-2 border-transparent hover:border-primary-500 p-10
            flex flex-col items-center max-w-xs shadow-md rounded-xl group cursor-pointer hover:underline
            hover:text-primary-500 transition-colors duration-150 hover:bg-primary-50 text-primary-800"
          >
            <RiMailSendLine className="h-10 w-10" />
            <p>admin@kryptolite.rocks</p>
          </div>
          <div
            className="bg-white border-2 border-transparent hover:border-primary-500 p-10
            flex flex-col items-center max-w-xs shadow-md rounded-xl group cursor-pointer hover:underline
            hover:text-primary-500 transition-colors duration-150 hover:bg-primary-50 text-primary-800"
          >
            <BsQuestionSquare className="h-10 w-10" />
            <p>info@kryptolite.rocks</p>
          </div>
          <div
            className="bg-white border-2 border-transparent hover:border-primary-500 p-10
            flex flex-col items-center max-w-xs shadow-md rounded-xl group cursor-pointer hover:underline
            hover:text-primary-500 transition-colors duration-150 hover:bg-primary-50 text-primary-800"
          >
            <SiGmail className="h-10 w-10" />
            <p>kryptoliteswap@gmail.com</p>
          </div>
        </div>
      </Section>
      <Section className="flex text-center font-light gap-2" padding={true}>
        <span>Our Partners</span>
        {[1, 2, 3, 4, 5].map((_i) => (
          <div className="w-52 h-52 bg-gray-50" />
        ))}
      </Section>
    </main>
  );
}

const highlighText = (text: string, className?: string) => (
  <span className={cls(className ? className : "text-green-600 font-semibold")}>
    {text}
  </span>
);
