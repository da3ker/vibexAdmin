import { Modal } from "@mui/material";
import tw, { styled } from "twin.macro";

const Loader = styled.div`
  ${tw`flex flex-wrap justify-center items-center w-[170px] h-[170px] absolute top-[50%] left-[50%] outline-none`}
  transform: translate(-50%, -50%) rotate(45deg);
  border: 10px solid #fff;
  animation: anima 2s linear infinite;

  @keyframes anima {
    0% {
      transform: translate(-50%, -50%) rotate(45deg) scale(0.05);
      border-radius: 0;
    }
    50% {
      transform: translate(-50%, -50%) rotate(90deg) scale(1);
      border-radius: 0;
    }
    100% {
      transform: translate(-50%, -50%) rotate(135deg) scale(0);
      border-radius: 10%;
    }
  }
`;
const Minibox = styled.span`
  ${tw`min-w-[50px] min-h-[50px] border-2 bg-white border-gray-200 text-sm text-black flex justify-center items-center font-bold`}
  animation: animate 2s linear infinite;
  &:nth-child(3) {
    animation-delay: 0.8s;
  }
  &:nth-child(2),
  span:nth-child(6) {
    animation-delay: 0.6s;
  }
  &:nth-child(1),
  span:nth-child(5),
  span:nth-child(9) {
    animation-delay: 0.4s;
  }
  &:nth-child(4),
  span:nth-child(8) {
    animation-delay: 0.2s;
  }
  &:nth-child(7) {
    animation-delay: 0s;
  }
  @keyframes animate {
    0% {
      transform: scale(1);
      border-radius: 0%;
    }
    30% {
      transform: scale(0);
      border-radius: 25%;
    }
    50% {
      transform: scale(0);
      border-radius: 0%;
    }
    75% {
      transform: scale(1);
      border-radius: 25%;
    }
    100% {
      transform: scale(1);
      border-radius: 0%;
    }
  }
`;

const Text = styled.span`
  ${tw`text-white uppercase absolute top-[50%] left-[50%] rotate-[270deg] translate-y-6 translate-x-[-9rem] font-semibold tracking-wide`}
`;

const Loading = () => {
  return (
    <Modal open={true} className=" backdrop-blur-lg  outline-none">
      <>
        <Loader>
          <Minibox />
          <Minibox />
          <Minibox>VIBEX</Minibox>
          <Minibox />
          <Minibox />
          <Minibox />
          <Minibox />
          <Minibox />
          <Minibox />
          <Text>LOADING...</Text>
        </Loader>
      </>
    </Modal>
  );
};

export default Loading;
