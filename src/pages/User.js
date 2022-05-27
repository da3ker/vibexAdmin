import tw, { styled } from "twin.macro";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer } from "../redux/apiCalls";
import { Modal } from "@mui/material";
import { useState } from "react";

const Container = styled.div`
  ${tw`h-full w-full rounded-lg`}
`;
const Title = styled(motion.h1)`
  ${tw`text-4xl font-extrabold tracking-wide flex text-white`}
  text-shadow: 2px 2px 8px rgba(255,255,255, 0.4);
`;
const Wrapper = styled.div`
  ${tw`flex flex-col relative`}
`;
const ProfileWrapper = styled(motion.div)`
  ${tw`mt-12 rounded-xl lg:w-3/5 w-full flex justify-between p-8 relative backdrop-blur-sm`}
  box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
`;
const Profile = styled.div`
  ${tw`flex flex-col gap-8`}
`;
const Section = styled.div`
  ${tw`flex flex-col gap-2`}
`;
const SubTitle = styled.div`
  ${tw`text-xs font-semibold text-gray-300 lowercase tracking-wider`}
`;
const Info = styled.div`
  ${tw`pl-4 font-bold  text-white tracking-wider`}
`;
const Image = styled.img`
  ${tw`w-1/3 object-cover rounded-full border-4 self-start`}
  aspect-ratio: 1 / 1;
  ${({ status }) => status && tw`border-green-400`};
  ${({ status }) => !status && tw`border-gray-400`};
`;
const Status = styled.div`
  ${tw`absolute w-4 h-4 rounded-full bottom-4 right-4 border-2`}
  ${({ status }) => status && tw`bg-green-300 border-green-400`};
  ${({ status }) => !status && tw`bg-gray-300 border-gray-400`};
`;
const Edit = styled(motion.div)`
  ${tw`flex justify-between items-center mt-10 z-10`}
`;
// const MakeAdmin = styled.button`
//   ${tw` text-sm font-semibold tracking-wider text-gray-100 opacity-50 p-2 rounded-lg hover:bg-white hover:text-black hover:opacity-100`}
//   transition: 1s;
// `;
const Delete = styled.div`
  ${tw`text-xs font-bold opacity-0 `}
  transition: 1s;
`;
const Trash = styled.div`
  ${tw`flex items-center gap-2 cursor-pointer`}
  &:hover ${Delete} {
    opacity: 1;
  }
`;

const Background = styled.img`
  ${tw`absolute object-cover top-0 left-0 w-full h-full opacity-10 rounded-xl`}
`;

const DefaultImg = styled.div`
  ${tw`w-16 h-16 flex items-center justify-center font-bold text-lg text-white rounded-full border-2 border-white object-cover`}
  ${({ status }) => status && tw`bg-green-300 border-green-400`};
  ${({ status }) => !status && tw`bg-gray-300 border-gray-400`};
  transition: 1s;
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

const AdminWarning = styled.div`
  ${tw`text-sm text-white p-4 bg-white/[0.4] border-2 border-white outline-none rounded-md flex flex-col gap-4`}
`;

const User = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) =>
    state.customer.customers.find((user) => user._id === id)
  );

  //[START]=*=*=*=*=*=DELETING CUSTOMER'S ACCOUNT=*=*=*=*=*=//
  const handleDelete = (id) => {
    navigate("/customers");
    deleteCustomer(id, dispatch);
  };

  // //Make it as an admin
  // const isAdmin = true;

  // const handleUpdate = () => {
  //   updateCustomer(dispatch, id, { isAdmin });
  // };

  const [isOpen, setIsOpen] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  return (
    <Container>
      <Title
        initial={{ y: "-30vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        User
      </Title>
      <Wrapper>
        <ProfileWrapper
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Background src={customer.image} />
          <Profile>
            <Section>
              <SubTitle>Name:</SubTitle>
              <Info className="capitalize">
                {customer.firstName} {customer.lastName}
              </Info>
            </Section>
            <Section>
              <SubTitle>Username:</SubTitle>
              <Info>{customer.username}</Info>
            </Section>
            <Section>
              <SubTitle>Email:</SubTitle>
              <Info>{customer.email}</Info>
            </Section>
            <Section>
              <SubTitle>Phone Number:</SubTitle>
              <Info>{customer.phoneNumber}</Info>
            </Section>
            <Section>
              <SubTitle>birthday:</SubTitle>
              <Info>{customer.birthday}</Info>
            </Section>
            <Section>
              <SubTitle>gender:</SubTitle>
              <Info>{customer.gender}</Info>
            </Section>
          </Profile>
          {customer.image ? (
            <Image status={customer.status} src={customer.image} />
          ) : (
            <DefaultImg status={customer.status}>
              {customer.firstName?.charAt(0).toUpperCase()}
            </DefaultImg>
          )}
          <Status status={customer.status} />
        </ProfileWrapper>
        <Edit
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {/* <MakeAdmin
            onClick={() => {
              setIsWarning(true);
            }}
          >
            Make it as an Admin?
          </MakeAdmin> */}
          <Trash
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <UilTrashAlt
              className="hover:text-red-300"
              style={{ transition: "1s" }}
            />
            <Delete>Delete Account?</Delete>
          </Trash>
        </Edit>
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
            <Warning>Are you seriously gonna delete this account?</Warning>
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
        {/* <Modal
          open={isWarning}
          onClose={() => setIsWarning(false)}
          className="flex justify-center items-center backdrop-blur-sm"
        >
          <AdminWarning>
            Are you sure you want to make him/her an admin?
            <Options>
              <Option option="yes" onClick={handleUpdate}>
                Yes
              </Option>
              <Option option="no" onClick={() => setIsWarning(false)}>
                No
              </Option>
            </Options>
          </AdminWarning>
        </Modal> */}
      </Wrapper>
    </Container>
  );
};

export default User;
