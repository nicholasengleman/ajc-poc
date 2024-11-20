import Link from "next/link";
import Image from "next/image";
import fetchData from "../../../content-sources/site-api";
import logo from "../../../resources/logos/AJC/logo-full-redesign.svg";
import "./styles.scss";

const Header = async () => {
  const data = await fetchData({ hierarchy: "subnav_homepage" });
  const { children } = data;

  return (
    <div className="nav">
      <Link href="/">
        <Image src={logo} alt="AJC logo" />
      </Link>
      <ul>
        {children.map((el, i) => {
          if (!el.name.includes("link") && !el.name.includes("Link")) {
            return <li key={i}>{el.name}</li>;
          }
        })}
      </ul>
    </div>
  );
};

export default Header;
