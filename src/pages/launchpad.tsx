import React from "react";
import Card from "../components/Card/Card";
import Layout from "../components/Layouts";
import Section from "../components/Layouts/Section";
import { cardItems } from "../globals";
import SEO from "../components/SEO";
import Link from "../components/Link";

export default function launchpad(){
  return (
    <Layout>
      <SEO
        title="The KRYPTOLITE Universe LaunchPad"
        description="KRYPTOLITE will empower cryptocurrency projects with the ability to distribute tokens and raise liquidity. Staking KRL-LP is required to guarantee an allocation based on the pool weight."
      />
      <Section
        containerClass="bg-[url('./images/launchpad-cover.jpg')] bg-cover bg-center"
        className="flex flex-col gap-20 items-center justify-center h-[500px] bg-gradient-to-b from-[#250045]/60
        to-[#29004E]/30 !max-w-none"
      >
        <Section className="text-white text-center ">
          <h1 className="text-4xl lg:text-6xl font-black">KRYPTOLITE BAB CLUB</h1>
          <p className="text-xl text-[#D2F804] max-w-[820px] lg:text-[29px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque nibh tellus praesent tortor condimentum.
          </p>
          
        </Section>
          <Link to="/swap" as="button" className="inline-flex space-x-2 rounded-none ">
            <span>MINT YOUR NFT NOW</span>
          </Link>
      </Section>

      <Section  containerClass="bg-[#dedede40]">
        <Section padding className="flex flex-col md:flex-row gap-10 items-stretch">
          <figure ><img width="100%" max-width="244px" height="444px" className={`max-w-[244px] m-auto block md:max-w-[444px] bg-[#FFFFFF] shadow-[0_4px_10px_2px_rgba(0,0,0,0.25)]`}  src="./images/monkey.png" alt="Album"/></figure>
          <div className="card-body md:max-w-[600px]">
              <h2 className="card-title text-[32px] md:text-[48px] text-center md:text-left">Ultricies molestie.</h2>
              <p className="text-base text-center md:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa convallis cras viverra mauris purus. </p>
              <div className="card-actions justify-end">
                <Link to="/swap" as="button" className="block md:inline-flex w-[256px] space-x-2 rounded-none m-auto mt-20 ">
                  <span>MINT YOUR NFT NOW</span>
                </Link>
              </div>
          </div>
        </Section>
      </Section>

      <Section>
        <h1 className="text-center p-10">Our Top Product</h1>
        <Section padding className="lg:flex-row flex-col flex flex-wrap justify-around  items-center ">
            {cardItems.map(item =>{
                return (
                    <Card key={item.id} id={item.id} title={item.title} content={item.content} src={item.src}></Card>
            )
            })}
        </Section>

      </Section>

    </Layout>
  )
}
