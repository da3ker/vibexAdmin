import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import moment from "moment";
import { Modal } from "@mui/material";

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
const Desc = styled.span`
  ${tw`font-bold`}
`;
const Color = styled.span`
  ${tw`font-bold`}
  ${({ color }) => color === "yellow" && tw`text-yellow-300`};
  ${({ color }) => color === "black" && tw`text-black`};
  ${({ color }) => color === "white" && tw`text-white`};
`;
const TotalAmount = styled.div`
  ${tw`ml-4 font-bold tracking-wider text-red-400`}
`;
const Status = styled.select`
  ${tw`ml-4 py-1 px-2 rounded-lg text-white font-semibold tracking-wider self-start`}
  ${({ status }) => status === "ready to deliver" && tw`bg-yellow-300`};
  ${({ status }) => status === "on the way" && tw`bg-green-300`};
  ${({ status }) => status === "delivered" && tw`bg-blue-300`};
`;
const Option = styled.option`
  ${tw``}
`;
const Product = styled.span`
  ${tw`hover:underline cursor-pointer`}
`;
const Save = styled.button`
  ${tw`py-1 mt-8 px-2 text-xs bg-purple-200 self-end rounded-lg font-bold text-white tracking-wider opacity-50 hover:bg-transparent hover:text-gray-700 hover:opacity-100`}
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  transition: 1s;
`;
const Success = styled.div`
  ${tw`p-4 font-bold text-sm bg-white/[.5] rounded-md text-white tracking-wider`}
`;

const OrderDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  //[START]=*=*=*=*=*=FETCHING ORDER DATA=*=*=*=*=*=//
  useEffect(() => {
    const getOrder = async (id) => {
      try {
        const res = await userRequest.get(`/orders/find/order/${id}`);
        setOrder(res.data[0]);
        setStatus(res.data[0].status);
      } catch (err) {
        console.log(err);
      }
    };
    getOrder(id);
  }, [id]);
  //=*=*=*=*=*=FETCHING ORDER DATA=*=*=*=*=*=[END]//

  //=*=*=*=*=*=UPDATING ORDER STATUS=*=*=*=*=*=//
  const handleUpdate = async () => {
    try {
      await userRequest.put(`/orders/${id}`, { status });
      setIsSuccess(true);
      setTimeout(function () {
        window.location.reload(false);
      }, 1000);
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
        Order Details
      </Title>
      <Wrapper
        initial={{ x: "-100vh", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Ul>
          <List>
            <SubTitle>Products:</SubTitle>
            <Info className="flex sm:gap-2 gap-0 sm:flex-row flex-col ">
              {order?.products.map((item) => (
                <Link to={`/product/${item._id}`} key={item._id}>
                  <Product>
                    {item.name}{" "}
                    <Desc className="lowercase">(x{item.quantity})</Desc>{" "}
                    <Desc>({item.size})</Desc>{" "}
                    <Color color={item.color}>({item.color})</Color>
                  </Product>
                </Link>
              ))}
            </Info>
          </List>
          <List>
            <SubTitle>Shipping Address:</SubTitle>
            <Info>
              {order?.address.address} {order?.address.city}{" "}
              {order?.address.state} {order?.address.postal},{" "}
              {order?.address.firstName} {order?.address.lastName}{" "}
              {order?.address.phone}
            </Info>
          </List>
          <List>
            <SubTitle>Order Id:</SubTitle>
            <Info>{order?.paymentData.orderID}</Info>
          </List>
          <List>
            <SubTitle>Payment Id:</SubTitle>
            <Info>{order?.paymentData.paymentID}</Info>
          </List>
          <List>
            <SubTitle>Total Amount:</SubTitle>
            <TotalAmount>${order?.amount}.00</TotalAmount>
          </List>
          <List>
            <SubTitle>Date Purchased:</SubTitle>
            <Info>{moment(order?.createdAt).format("MMMM DD YYYY")}</Info>
          </List>
          <List>
            <SubTitle>Status:</SubTitle>
            <Status
              status={status}
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
              key={status} //needed to re-render default value
            >
              <Option value="ready to deliver">Ready to Deliver</Option>
              <Option value="on the way">On the way</Option>
              <Option value="delivered">Delivered</Option>
            </Status>
          </List>
        </Ul>
        <Save type="submit" onClick={handleUpdate}>
          Save
        </Save>
      </Wrapper>
      <Modal
        open={isSuccess}
        // onClose={() => {
        //   setIsSuccess(false);
        // }}
        className="flex justify-center items-center backdrop-blur-sm"
      >
        <Success>Status Updated!</Success>
      </Modal>
    </Container>
  );
};

export default OrderDetails;
