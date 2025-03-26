import styled from "styled-components";
import logo from "../assets/images/logo.svg";

const LogoText = styled.span`
  color: var(--primary-500);
  font-weight: 700;
  font-size: 1.5rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  @media (max-width: 576px) {
    display: none;
  }
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <img src={logo} alt='HirePulse' />
      <LogoText>HirePulse</LogoText>
    </LogoWrapper>
  );
};

export default Logo;
