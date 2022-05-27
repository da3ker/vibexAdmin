import tw, { styled } from "twin.macro";
import { DataGrid } from "@mui/x-data-grid";
import { UilFileInfoAlt } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { UilSearch } from "@iconscout/react-unicons";

const Container = styled.div`
  ${tw`h-full w-full rounded-lg`}
`;
const Title = styled(motion.h1)`
  ${tw`text-4xl font-extrabold tracking-wide flex items-end text-white`}
  text-shadow: 2px 2px 8px rgba(255,255,255, 0.4);
`;
const Wrapper = styled.div`
  ${tw`w-full md:h-5/6 h-[28rem] rounded-lg mt-12 flex flex-col gap-2`}
`;
const Status = styled.p`
  ${tw`py-1 px-2 rounded-lg font-semibold text-blue-50 w-auto capitalize tracking-wider`}
  ${({ status }) => status === "ready to deliver" && tw`bg-yellow-300`};
  ${({ status }) => status === "on the way" && tw`bg-green-300`};
  ${({ status }) => status === "delivered" && tw`bg-blue-300`};
`;
const Details = styled.div`
  ${tw`flex items-center gap-2 hover:text-blue-200 hover:underline cursor-pointer hover:font-semibold`}
`;
const SearchContainer = styled.div`
  ${tw`flex border-2 border-white self-start items-center rounded-md text-white`}
`;
const Search = styled.input`
  ${tw`pl-2 py-1 outline-none bg-transparent text-sm placeholder:text-gray-100 placeholder:opacity-75`}
`;
const SearchIcon = styled.label`
  ${tw``}
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  //[START]=*=*=*=*=*=FETCHING ORDERS=*=*=*=*=*=//
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders/");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
  //=*=*=*=*=*=FETCHING ORDERS=*=*=*=*=*=[END]//

  //=*=*=*=*=*=SETTING UP COLUMNS=*=*=*=*=*=//
  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
      width: 180,
      renderCell: (params) => {
        return <>{params.row.paymentData.orderID}</>;
      },
    },
    {
      field: "userID",
      headerName: "User ID",
      width: 190,
      renderCell: (params) => {
        return <div className="!text-xs">{params.row.userId}</div>;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 80,
      renderCell: (params) => {
        return <>{params.row.products.length}</>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 90,
      renderCell: (params) => {
        return <>${params.row.amount}.00</>;
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 100,
      renderCell: (params) => {
        return <>{moment(params.row.createdAt).format("MMM DD YYYY")}</>;
      },
    },
    {
      field: "stats",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return <Status status={params.row.status}>{params.row.status}</Status>;
      },
    },
    {
      field: "details",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <Link to={"/order/" + params.row._id}>
            <Details>
              Details <UilFileInfoAlt />
            </Details>
          </Link>
        );
      },
    },
  ];

  return (
    <Container>
      <Title
        initial={{ y: "-30vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Orders
      </Title>
      <Wrapper>
        <SearchContainer>
          <Search
            id="search"
            type="search"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="order id /user id /date"
          />{" "}
          <SearchIcon htmlFor="search">
            <UilSearch className="cursor-pointer" />
          </SearchIcon>
        </SearchContainer>
        <DataGrid
          rows={orders.filter(
            (i) =>
              i.paymentData.orderID.toLowerCase().includes(search) ||
              moment(i.createdAt)
                .format("MMM DD YYYY")
                .toLowerCase()
                .includes(search) ||
              i.userId.toLowerCase().includes(search)
          )}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          disableColumnMenu
          getRowId={(row) => row.paymentData.orderID}
          className="!text-white !border-none !overflow-x-auto px-8"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        />
      </Wrapper>
    </Container>
  );
};

export default Orders;
