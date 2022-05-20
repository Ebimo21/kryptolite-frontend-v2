import React from "react";
import { FaFacebook, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { BsInstagram, BsTelegram } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";

type SocialIconTypes =
  | "twitter"
  | "telegramGroup"
  | "telegramNews"
  | "facebook"
  | "discord"
  | "instagram";

const socials: { name: SocialIconTypes; url: string }[] = [
  { name: "twitter", url: "https://twitter.com/KryptoliteSwap" },
  { name: "facebook", url: "https://fb.me/KryptoliteCommunity" },
  { name: "telegramGroup", url: "https://t.me/KryptoliteCommunity" },
  { name: "telegramNews", url: "https://t.me/KryptoliteNews" },
  { name: "instagram", url: "https://instagram.com/kryptolite_community" },
  { name: "discord", url: "https://discord.gg/Kryptoverse" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 shadow-lg border shadow-black py-8 flex flex-col items-center">
      <div className="font-light">
        &copy; Copyright {new Date().getFullYear()} KRYPTOLITE.
      </div>
      <div>
        <div className="mt-3 flex items-start justify-center lg:justify-start space-x-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getSocialIcon(social.name)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

const getSocialIcon = (name: SocialIconTypes) => {
  let svgIcon = <></>;
  const iconClass =
    "w-8 h-8 text-primary-800 hover:text-primary-500 inline-block transition-colors duration-150";
  switch (name) {
    case "twitter":
      svgIcon = <FaTwitter className={iconClass} title={name} />;
      break;
    case "telegramGroup":
      svgIcon = <BsTelegram className={iconClass} title={name} />;
      break;
    case "telegramNews":
      svgIcon = <FaTelegramPlane className={iconClass} title={name} />;
      break;
    case "facebook":
      svgIcon = <FaFacebook className={iconClass} title={name} />;
      break;
    case "instagram":
      svgIcon = <BsInstagram className={iconClass} title={name} />;
      break;
    case "discord":
      svgIcon = <SiDiscord className={iconClass} title={name} />;
      break;
    default:
      break;
  }
  return svgIcon;
};
