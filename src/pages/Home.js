import { motion } from "framer-motion";
import tw, { styled } from "twin.macro";
import Cards from "../components/Cards";
import Recents from "../components/Recents";

const Container = styled.div`
  ${tw`h-full w-full rounded-lg`}
`;
const Title = styled(motion.h1)`
  ${tw`text-4xl font-extrabold tracking-wide flex items-end text-white`}
  text-shadow: 2px 2px 8px rgba(255,255,255, 0.4);
`;
const Wrapper = styled(motion.div)`
  ${tw`w-full rounded-lg mt-12 flex flex-col gap-12`}
`;

const Home = () => {
  return (
    <Container>
      <Title
        initial={{ y: "-30vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Dashboard
      </Title>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Cards />
        <Recents />
      </Wrapper>
    </Container>
  );
};

export default Home;
