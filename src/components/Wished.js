import { Modal } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div`
  ${tw``}
`;
const Title = styled.h2`
  ${tw`text-2xl font-bold tracking-wider text-blue-50`}
  text-shadow: 2px 2px 8px rgba(255,255,255, 0.4);
`;
const WishesContainer = styled.div`
  ${tw`mt-4 bg-blue-400/[.3] flex flex-col gap-4 p-4 rounded-lg`}
`;
const Wish = styled.div`
  ${tw`flex gap-1 items-center`}
`;
const Img = styled.img`
  ${tw`rounded-full min-w-[44px] min-h-[44px] w-11 h-11 object-cover mr-2 border-2 border-white self-center`}
`;
const Details = styled.div`
  ${tw` flex-1 text-xs flex flex-col`}
`;
const Name = styled.h4`
  ${tw`font-semibold text-blue-800 uppercase hover:underline cursor-pointer`}
`;
const Id = styled.h5`
  ${tw`text-blue-100 text-[10px]`}
`;
const WishNumber = styled.h5`
  ${tw`text-xs font-semibold text-white`}
`;
const All = styled.span`
  ${tw`mx-auto text-white text-sm cursor-pointer hover:underline hover:font-semibold`}
`;
const Wishes = styled(motion.div)`
  ${tw`p-10 bg-blue-200/[.80] flex flex-col gap-8 overflow-y-auto rounded-md outline-none`}
`;

const Wished = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { products } = useSelector((state) => state.product);

  //=*=*=*=*=*=FETCHING PRODUCTS DATA=*=*=*=*=*=//
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <Title>Most Wished</Title>
      <WishesContainer>
        {products
          .filter((i) => i.wished)
          .sort((a, b) => b.wished - a.wished)
          .slice(0, 3)
          .map((item) => (
            <Wish key={item.name + Math.random()}>
              <Img src={item.img} />
              <Details>
                <Link to={"/product/" + item._id}>
                  <Name>{item.name} </Name>
                </Link>
                <Id>{item._id}</Id>
                <WishNumber>WISHED: {item.wished}</WishNumber>
              </Details>
            </Wish>
          ))}
        <All onClick={() => setOpen(true)}>View all</All>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          className="flex justify-center items-center backdrop-blur-md outline-none"
        >
          <Wishes
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="h-[calc(100vh_-_4em)]"
          >
            <Title>Most Wished</Title>
            {products
              .filter((i) => i.wished)
              .sort((a, b) => b.wished - a.wished)
              .map((item) => (
                <Wish key={item.name + Math.random()}>
                  <Img src={item.img} />
                  <Details>
                    <Link to={"/product/" + item._id}>
                      <Name>{item.name} </Name>
                    </Link>
                    <Id>{item._id}</Id>
                    <WishNumber>WISHED: {item.wished}</WishNumber>
                  </Details>
                </Wish>
              ))}
          </Wishes>
        </Modal>
      </WishesContainer>
    </Container>
  );
};

export default Wished;
