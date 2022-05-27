import tw, { styled } from "twin.macro";
import logo from "../logo.png";
import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";

//ICONS~~~
import {
  UilEstate,
  UilClipboardNotes,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
  UilBars,
  UilMessage,
} from "@iconscout/react-unicons";

const Container = styled.div`
  ${tw``}
`;
const HiddenMenu = styled.div`
  ${tw`p-2 rounded-full bg-blue-200/[.5] fixed top-7 left-7 md:hidden block cursor-pointer`}
`;
const Wrapper = styled(motion.div)`
  ${tw`pt-12 md:flex hidden flex-col items-center relative w-full h-full`}
  background-color:rgba(191, 255, 255, 0.05);
  transition: all 300ms ease;
`;
//Title~~~Start
const Title = styled.div`
  ${tw`flex items-center`}
`;
const Logo = styled.img`
  ${tw`h-16`}
`;
const TitleWrapper = styled.div`
  ${tw`flex flex-col leading-3 items-center `}
`;
const TitleName = styled.h3`
  ${tw``}
  font-family: 'Black Ops One', cursive;
`;
const Highlight = styled.span`
  ${tw`text-blue-500`}
  font-family: 'Black Ops One', cursive;
`;
const TitleDesc = styled.h4`
  ${tw`text-xs font-medium`}
`;
//Title~~~End

//Menu~~~Start
const Menu = styled.div`
  ${tw`mt-12 flex flex-col w-full cursor-pointer`}
`;
const MenuItem = styled(motion.div)`
  ${tw`flex items-center py-4 pl-8 gap-4 border-blue-400 font-medium hover:font-semibold hover:bg-blue-200/[0.5] rounded-l-xl`}
  ${({ selected }) =>
    selected && tw`bg-blue-300/[.7] font-semibold border-r-[10px]`};
  transition: all 400ms ease;
`;
const ItemIcon = styled.span`
  ${tw`text-white`}
`;
const Item = styled.span`
  ${tw`tracking-wide text-white`}
`;
//Menu~~~End

const SignOut = styled(motion.div)`
  ${tw` text-blue-200 absolute bottom-10 w-full left-6 cursor-pointer hover:text-red-300`}
  transition: 0.5s;
`;

//Popup Menu~~~Start
const PopMenu = styled(motion.div)`
  ${tw`w-44 h-44 bg-transparent outline-none flex flex-col justify-center items-center mb-56 z-50`}
`;
const PopTop = styled.div`
  ${tw`mb-4`}
`;
const PopMid = styled.div`
  ${tw`flex gap-4`}
`;
const PopBot = styled.div`
  ${tw`mt-4 flex gap-4`}
`;
const PopIcon = styled(motion.div)`
  ${tw`p-2 rounded-full bg-purple-300 hover:text-white active:text-green-200 cursor-pointer`}
`;
const Vibex = styled(motion.div)`
  ${tw` text-xl mb-20 flex flex-col items-center`}
  font-family: 'Black Ops One', cursive;
`;
//Popup Menu~~~End

//User~~~
const User = styled.div`
  ${tw`flex items-center flex-col mt-2 py-4 gap-2`}
`;
const UserImg = styled.img`
  ${tw`w-10 h-10 rounded-full border-2 border-white object-cover hover:scale-110`}
  transition: 1s;
`;
const Greet = styled.span`
  ${tw`text-xs font-semibold text-white tracking-wider`}
`;
const HiddenUser = styled.div`
  ${tw`fixed top-7 right-7 md:hidden block cursor-pointer`}
`;
const DefaultImg = styled.div`
  ${tw`w-10 h-10 flex items-center justify-center font-bold text-lg text-white rounded-full border-2 border-white object-cover hover:scale-110`}
  transition: 1s;
`;

const SideBar = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  //[START]=*=*=*=*=*=TOGGLE MODAL=*=*=*=*=*=//
  const toggleActive = (path) => {
    setActive(path);
  };
  //=*=*=*=*=*=TOGGLE MODAL=*=*=*=*=*=[START]//

  //[START]=*=*=*=*=*=ANIMATION VARIANTS=*=*=*=*=*=//
  const variants = {
    open: { x: 0 },
    closed: { x: "100vw", opacity: 0 },
  };
  const popVariants = {
    open: { x: 0, y: 0, opacity: 1 },
    closed: { x: "-100%", y: "-150%", opacity: 0 },
  };
  //=*=*=*=*=*=ANIMATION VARIANTS=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=LOGGING-OUT USER=*=*=*=*=*=//
  const handleOut = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  //=*=*=*=*=*=LOGGING-OUT USER=*=*=*=*=*=[END]//

  //=*=*=*=*=*=FETCHING CURRENT USER DATA=*=*=*=*=*=//
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <HiddenUser className={isOpen && "!hidden"}>
        {currentUser?.image ? (
          <UserImg src={currentUser?.image} />
        ) : (
          <DefaultImg>
            {currentUser?.firstName.charAt(0).toUpperCase()}
          </DefaultImg>
        )}
      </HiddenUser>
      <HiddenMenu
        className={isOpen && "!hidden"}
        onClick={() => setIsOpen(true)}
      >
        <UilBars />
      </HiddenMenu>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex justify-center items-center backdrop-blur-sm"
      >
        <PopMenu
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.5 }}
          variants={popVariants}
          initial={"closed"}
          drag
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,
          }}
        >
          <Vibex
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <Logo src={logo} className="invert" />
            <TitleName>
              VIBE<Highlight>X</Highlight>
            </TitleName>
          </Vibex>
          <PopTop>
            <Link to="/customers" onClick={() => setIsOpen(false)}>
              <PopIcon
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <UilUsersAlt />
              </PopIcon>
            </Link>
          </PopTop>
          <PopMid>
            <Link to="/orders" onClick={() => setIsOpen(false)}>
              <PopIcon
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <UilClipboardNotes />
              </PopIcon>
            </Link>
            <Link to="/" onClick={() => setIsOpen(false)}>
              <PopIcon className="!bg-blue-300">
                <UilEstate />
              </PopIcon>
            </Link>
            <Link to="/products" onClick={() => setIsOpen(false)}>
              <PopIcon
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <UilPackage />
              </PopIcon>
            </Link>
          </PopMid>
          <PopBot>
            <Link to="/analytics" onClick={() => setIsOpen(false)}>
              <PopIcon
                initial={{ y: "-100%", opacity: 0, x: "70%" }}
                animate={{ y: 0, opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <UilChart />
              </PopIcon>
            </Link>
            <Link to="/reports" onClick={() => setIsOpen(false)}>
              <PopIcon
                initial={{ y: "-100%", opacity: 0, x: "-70%" }}
                animate={{ y: 0, opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <UilMessage />
              </PopIcon>
            </Link>
          </PopBot>
          <SignOut
            animate={active === "logout" ? "closed" : "open"}
            transition={{ duration: 1 }}
            variants={variants}
            initial={"open"}
            onClick={(e) => {
              toggleActive("logout");
              handleOut(e);
            }}
            className="!relative !bottom-0 !left-0 !mt-10 !opacity-50 hover:!opacity-100"
          >
            <UilSignOutAlt className="scale-110" />
          </SignOut>
        </PopMenu>
      </Modal>
      <Wrapper>
        <Title>
          <Logo src={logo} />
          <TitleWrapper>
            <TitleName>
              VIBE<Highlight>X</Highlight>
            </TitleName>
            <TitleDesc>admin</TitleDesc>
          </TitleWrapper>
        </Title>
        <Menu>
          <Link to="/">
            <MenuItem selected={pathname === ""}>
              <ItemIcon>
                <UilEstate className="scale-110" />
              </ItemIcon>
              <Item>Home</Item>
            </MenuItem>
          </Link>
          <Link to="/orders">
            <MenuItem selected={pathname === "orders"}>
              <ItemIcon>
                <UilClipboardNotes className="scale-110" />
              </ItemIcon>
              <Item>Orders</Item>
            </MenuItem>
          </Link>
          <Link to="/customers">
            <MenuItem selected={pathname === "customers"}>
              <ItemIcon>
                <UilUsersAlt className="scale-110" />
              </ItemIcon>
              <Item>Customers</Item>
            </MenuItem>
          </Link>
          <Link to="/products">
            <MenuItem selected={pathname === "products"}>
              <ItemIcon>
                <UilPackage className="scale-110" />
              </ItemIcon>
              <Item>Products</Item>
            </MenuItem>
          </Link>
          <Link to="/analytics">
            <MenuItem selected={pathname === "analytics"}>
              <ItemIcon>
                <UilChart className="scale-110" />
              </ItemIcon>
              <Item>Analytics</Item>
            </MenuItem>
          </Link>
          <Link to="/reports">
            <MenuItem selected={pathname === "reports"}>
              <ItemIcon>
                <UilMessage className="scale-110" />
              </ItemIcon>
              <Item>Reports</Item>
            </MenuItem>
          </Link>
          <User>
            {currentUser?.image ? (
              <UserImg src={currentUser?.image} />
            ) : (
              <DefaultImg>
                {currentUser?.firstName.charAt(0).toUpperCase()}
              </DefaultImg>
            )}
            <Greet>Hello {currentUser?.firstName}!</Greet>
          </User>
        </Menu>
        <SignOut
          animate={active === "logout" ? "closed" : "open"}
          transition={{ duration: 1 }}
          variants={variants}
          initial={"open"}
          onClick={(e) => {
            toggleActive("logout");
            handleOut(e);
          }}
        >
          <UilSignOutAlt className="scale-110" />
        </SignOut>
      </Wrapper>
    </Container>
  );
};

export default SideBar;
