import { LogoLink } from "core/theme/styles/header.styled";
import Link from "node_modules/next/link";
import React from "react";

function Logo() {
  const logo = "/images/logo.png";
  return (
    <Link href="/">
      <LogoLink title="Kelly Felder">
        <img src={logo} alt="Kelly Felder - logo" />
      </LogoLink>
    </Link>
  );
}

export default Logo;
