import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import moment from "moment";
import { Modal } from "@mui/material";
import { UilTrashAlt } from "@iconscout/react-unicons";

const Container = styled.div`
  ${tw`h-full w-full rounded-lg`}
`;
const Title = styled(motion.h1)`
  ${tw`text-4xl font-extrabold tracking-wide text-white`}
  text-shadow: 2px 2px 8px rgba(255,255,255, 0.4);
`;
const Wrapper = styled(motion.div)`
  ${tw`mt-12`}
`;
const Ul = styled.ul`
  ${tw`ml-4 flex flex-col gap-4`}
`;
const List = styled.li`
  ${tw`flex flex-col gap-2`}
`;
const SubTitle = styled.div`
  ${tw`text-sm lowercase font-semibold text-white tracking-wider`}
`;
const Info = styled.div`
  ${tw`ml-4 font-semibold text-gray-800 capitalize`}
`;

const Save = styled.button`
  ${tw`py-1 mt-8 px-2 text-xs bg-purple-200 self-end rounded-lg font-bold text-white tracking-wider opacity-50 hover:bg-transparent hover:text-gray-700 hover:opacity-100`}
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  transition: 1s;
`;
const DeleteText = styled.div`
  ${tw`text-xs font-bold opacity-0 `}
  transition: 1s;
`;

const Delete = styled.div`
  ${tw`flex items-center gap-2 cursor-pointer mt-4`}
  &:hover ${DeleteText} {
    opacity: 1;
  }
`;
const Bottom = styled.div`
  ${tw`flex justify-between items-center`}
`;

//Modal
const DeleteWarning = styled(motion.div)`
  ${tw`text-sm text-white p-4 flex flex-col gap-4 bg-black outline-none`}
`;
const Warning = styled.h3`
  ${tw`font-semibold tracking-wider`}
`;
const Options = styled.div`
  ${tw`flex justify-between`}
`;
const Option = styled.span`
  ${tw`cursor-pointer tracking-wider font-bold px-2 text-gray-600 py-1 bg-white hover:scale-110 uppercase`}
  ${({ option }) => option === "yes" && tw`hover:bg-red-300 hover:text-red-700`}
  ${({ option }) =>
    option === "no" && tw`hover:bg-green-300 hover:text-green-700`}
  transition:1s;
`;

const ReportDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [message, setMessage] = useState({});
  const [read, setRead] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //[START]=*=*=*=*=*=FETCHING MESSAGE DATA=*=*=*=*=*=//
  useEffect(() => {
    const getMessage = async (id) => {
      try {
        const res = await userRequest.get(`/messages/find/message/${id}`);
        setMessage(res.data[0]);
        setRead(true);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage(id);
  }, [id]);
  //=*=*=*=*=*=FETCHING MESSAGE DATA=*=*=*=*=*=[END]//

  //=*=*=*=*=*=UPDATING MESSAGE STATUS=*=*=*=*=*=//
  useEffect(() => {
    const handleUpdate = async () => {
      try {
        await userRequest.put(`/messages/${id}`, { read });
      } catch (err) {
        console.log(err);
      }
    };
    handleUpdate(id);
  }, [id, read]);

  //=*=*=*=*=*=MARKING MESSAGE AS UNREAD=*=*=*=*=*=//
  const handleRead = async () => {
    setRead(false);
    try {
      await userRequest.put(`/messages/${id}`, { read });
      navigate("/reports");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await userRequest.delete(`/messages/${id}`);
      navigate("/reports");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Title
        initial={{ y: "-30vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Report Details
      </Title>
      <Wrapper
        initial={{ x: "-100vh", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Ul>
          <List>
            <SubTitle>Subject:</SubTitle>
            <Info>{message.subject}</Info>
          </List>
          <List>
            <SubTitle>Message:</SubTitle>
            <Info>{message.message}</Info>
          </List>
          <List>
            <SubTitle>Date:</SubTitle>
            <Info>{moment(message.createdAt).format("MMM DD YYYY")}</Info>
          </List>
          <List>
            <SubTitle>From:</SubTitle>
            <Link to={"/user/" + message.userId}>
              <Info
                className="hover:underline hover:!text-white !text-sm !text-gray-300"
                style={{ transition: "1s" }}
              >
                {message.userId}
              </Info>
            </Link>
          </List>
        </Ul>
        <Bottom>
          <Save type="submit" onClick={handleRead}>
            Mark as unread?
          </Save>
          <Delete
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <DeleteText>Delete Message?</DeleteText>
            <UilTrashAlt
              className="hover:text-red-300"
              style={{ transition: "1s" }}
            />
          </Delete>
        </Bottom>
      </Wrapper>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex justify-center items-center backdrop-blur-sm"
      >
        <DeleteWarning
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Warning>Are you sure you want to delete this message?</Warning>
          <Options>
            <Option option="yes" onClick={() => handleDelete(id)}>
              Yes
            </Option>
            <Option option="no" onClick={() => setIsOpen(false)}>
              No
            </Option>
          </Options>
        </DeleteWarning>
      </Modal>
    </Container>
  );
};

export default ReportDetails;
