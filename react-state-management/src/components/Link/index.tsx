import { Link as WouterLink } from "wouter";
import "./Link.css";

interface LinkProps {
  href: string;
  children: string;
  active?: boolean;
}

export const Link = ({ href, children, active = false }: LinkProps) => {
  const classNames = active ? "link active" : "link";

  return (
    <WouterLink to={href}>
      <a className={classNames}>{children}</a>
    </WouterLink>
  );
};
