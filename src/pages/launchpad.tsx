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
          <h1 className="text-6xl font-black">KRYPTOLITE BAB CLUB</h1>
          <p className="text-[#D2F804] max-w-[820px] text-[29px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque nibh tellus praesent tortor condimentum.
          </p>
          
        </Section>
          <Link to="/swap" as="button" className="inline-flex space-x-2 rounded-none ">
            <span>MINT YOUR NFT NOW</span>
          </Link>
      </Section>

      <Section  containerClass="bg-[#dedede40]">
        <Section padding className="flex gap-10 items-stretch">
          <figure ><img width="444px" height="444px" className={`bg-[#FFFFFF] shadow-[0_4px_10px_2px_rgba(0,0,0,0.25)]`}  src="./images/monkey.png" alt="Album"/></figure>
          <div className="card-body">
              <h2 className="card-title text-[48px]">Ultricies molestie.</h2>
              <p className="text-[24px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa convallis cras viverra mauris purus. </p>
              <div className="card-actions justify-end">
                <Link to="/swap" as="button" className="inline-flex space-x-2 rounded-none mt-20 ">
                  <span>MINT YOUR NFT NOW</span>
                </Link>
              </div>
          </div>
        </Section>
      </Section>

      <Section>
        <Section padding className="lg:flex-row flex-col flex flex-wrap justify-around  items-center ">
            {cardItems.map(item =>{
                return (
                    <Card key={item.id} title={item.title} content={item.content} src={item.src}></Card>
            )
            })}
        </Section>

      </Section>

    </Layout>
  )
}
