import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import logo from "../logo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { reset } from "../redux/userRedux";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";
import Loading from "../components/Loading";

const Container = styled(motion.div)`
  ${tw`w-full h-full flex justify-start items-center flex-col overflow-hidden`}
`;
const Wrapper = styled.div`
  ${tw`rounded-lg p-8`}
  /* box-shadow: rgba(255, 255, 255, 0.2) 0px 12px 28px 0px, rgba(255, 255, 255, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset; */
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;
const LoginForm = styled.form`
  ${tw`flex flex-col gap-4`}
`;
const Section = styled.div`
  ${tw`flex flex-col gap-4`}
`;
const Label = styled.label`
  ${tw`lowercase text-sm font-bold text-white tracking-wider`}
`;
const Input = styled.input`
  ${tw`bg-transparent ml-2 outline-none text-gray-800 tracking-wider px-2 py-1 font-semibold`}
  box-shadow: rgba(0, 0, 0, 0.15) -1.95px 1.95px 2.6px;
`;
const PasswordInput = styled.div`
  ${tw`flex items-center ml-2`}
  box-shadow: rgba(0, 0, 0, 0.15) -1.95px 1.95px 2.6px;
`;
const PasswordVisibility = styled.div`
  ${tw` mr-4 cursor-pointer`}
`;
const LoginButton = styled.button`
  ${tw`px-8 tracking-wider font-bold py-2 text-white bg-gray-900 rounded-sm self-center mt-6 hover:scale-105 hover:bg-transparent hover:text-black `}
  transition:1s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.5) 1.95px 1.95px 2.6px;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
const Logo = styled.img`
  ${tw`h-16`}
`;
const TitleName = styled.h3`
  ${tw``}
  font-family: 'Black Ops One', cursive;
`;
const Highlight = styled.span`
  ${tw`text-blue-500`}
  font-family: 'Black Ops One', cursive;
`;
const Vibex = styled.div`
  ${tw`mb-20 text-xl flex flex-col items-center`}
  font-family: 'Black Ops One', cursive;
`;
const Error = styled.span`
  ${tw`text-xs mx-auto font-light text-red-400 tracking-wider`}
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  //[START]=*=*=*=*=*=LOGGING-IN USER=*=*=*=*=*=//
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  //=*=*=*=*=*=LOGGING-IN USER=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=RESETTING ERRORS=*=*=*=*=*=//
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  //=*=*=*=*=*=RESETTING ERRORS=*=*=*=*=*=[END]//

  //=*=*=*=*=*=PASSWORD VISIBILITY=*=*=*=*=*=//
  const [passVis, setPassVis] = useState("password");

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Vibex>
        <Logo src={logo} className="invert" />
        <TitleName>
          VIBE<Highlight>X</Highlight>
        </TitleName>
      </Vibex>
      <Wrapper>
        <LoginForm>
          <Section>
            <Label htmlFor="username">username:</Label>
            <Input
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Section>
          <Section>
            <Label htmlFor="password">password:</Label>
            <PasswordInput>
              <Input
                id="password"
                type={passVis}
                className="!shadow-none !ml-0"
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordVisibility>
                {passVis === "text" ? (
                  <UilEye
                    className="text-gray-200"
                    onClick={() => setPassVis("password")}
                  />
                ) : (
                  <UilEyeSlash
                    className="text-gray-800"
                    onClick={() => setPassVis("text")}
                  />
                )}
              </PasswordVisibility>
            </PasswordInput>
          </Section>
          {error && <Error>{error}</Error>}
          <LoginButton
            type="submit"
            onClick={handleClick}
            disabled={isFetching}
          >
            Login
          </LoginButton>
        </LoginForm>
      </Wrapper>
      {isFetching && <Loading />}
    </Container>
  );
};

export default Login;
