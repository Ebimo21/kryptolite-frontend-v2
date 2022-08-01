interface BaseNavigationType {
  id: number;
  title: string;
  href: string;
}
export interface NavigationType extends BaseNavigationType {
  children?: NavigationType[];
}
export const navigationItems: NavigationType[] = [
  {
    id: 1,
    title: "Swap",
    href: "/swap",
  },
  { id: 2, title: "Stake", href: "/stake" },
  { id: 3, title: "Launch Pad", href: "/launch-pad" },
  {
    id: 4,
    title: "More",
    href: "#",
    children: [
      {
        id: 1,
        title: "Bitcoin Pizza NFT",
        href: "/bitcoin-pizza-day-2022",
      },
      {
        id: 2,
        title: "Contract",
        href: "https://bscscan.com/token/0xf1288cf18b1faaa35f40111c3e5d2f827e1e920e",
      },
      {
        id: 3,
        title: "White Paper",
        href: "https://www.kryptolite.rocks/doc/KRYPTOLITE-WHITEPAPER-1.1.pdf",
      },
      {
        id: 4,
        title: "Github",
        href: "https://github.com/KRYPTOLITE",
      },
    ],
  },
  // { id: 7, title: "Launch Pad", href: "/launch-pad" },
  // { id: 6, title: "Contact Us", href: "#contact-us" },
];
