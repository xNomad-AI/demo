"use client";
import { ConnectButton } from "@/app/home/connect-button";
import { Address } from "@/components/address";
import {
  Button,
  Dropdown,
  IconArrowDown,
  IconLogout,
  message,
  SelectOption,
} from "@/primitive/components";
import { useWallet } from "@solana/wallet-adapter-react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
const navs = [
  {
    href: "/xNomad",
    label: "xNomad Gallery",
  },
  {
    href: "/profile",
    label: "My AI-NFTs",
  },
  {
    href: "",
    label: (
      <Button size='s' className='font-semibold !text-black'>
        Create AI-NFT
      </Button>
    ),
  },
];
export function Header() {
  const pathname = usePathname();
  const { publicKey } = useWallet();
  return (
    <>
      <header
        id='header'
        className={clsx(
          "fixed bg-white-20 backdrop-blur-[20px] top-0 left-0 w-full z-10 border-b h-64 flex items-center px-64 mobile:px-16 justify-between",
          {
            hidden: pathname === "/",
          }
        )}
      >
        <Link href={"/"}>
          <Image src={"/brand.png"} width={145} height={40} alt='' />
        </Link>
        <div className='flex items-center gap-32'>
          {navs.map((nav) => (
            <NavItem key={nav.href} href={nav.href}>
              {nav.label}
            </NavItem>
          ))}
          {!publicKey ? (
            <ConnectButton size='m' />
          ) : (
            <Dropdown
              content={
                <div className='flex flex-col gap-8'>
                  <SelectOption selected={false}>Profile</SelectOption>
                  <SelectOption selected={false}>
                    <IconLogout />
                    Logout
                  </SelectOption>
                </div>
              }
            >
              <div className='flex items-center'>
                <Address
                  className='font-bold'
                  disableTooltip
                  address={publicKey.toBase58() as string}
                />
                <IconArrowDown />
              </div>
            </Dropdown>
          )}
        </div>
      </header>
      <div
        className={clsx("h-64 w-full", {
          hidden: pathname === "/",
        })}
      ></div>
    </>
  );
}

function NavItem({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        if (href === "") {
          e.preventDefault();
          message("Coming soon");
        }
      }}
      className='text-white-40 hover:text-text1'
      prefetch
    >
      {children}
    </Link>
  );
}
