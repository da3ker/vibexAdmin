import tw, { styled } from "twin.macro";
import UsersStats from "./UsersStats";
import Wished from "./Wished";

const Container = styled.div`
  ${tw`pt-12 pl-2 md:pr-6 pr-2 md:overflow-y-auto overflow-y-hidden flex flex-col items-center justify-start`}
  @media screen and (max-width: 770px) {
    height: max-content;
  }
`;

const RightBar = () => {
  return (
    <Container>
      <Wished />
      <UsersStats />
    </Container>
  );
};

export default RightBar;
