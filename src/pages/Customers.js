import { DataGrid } from "@mui/x-data-grid";
import tw, { styled } from "twin.macro";
import { UilFileInfoAlt } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../redux/apiCalls";
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
const User = styled.div`
  ${tw`flex items-center gap-2 capitalize`}
`;
const ProfileImg = styled.img`
  ${tw`w-10 h-10 rounded-full border-2 border-white object-cover`}
`;
const Status = styled.div`
  ${tw`py-1 px-2 rounded-lg font-semibold capitalize tracking-wider`}
  ${({ status }) => status && tw`bg-green-300 text-green-500`};
  ${({ status }) => !status && tw`bg-gray-300 text-gray-500`};
`;
const View = styled.div`
  ${tw`flex items-center gap-2 hover:text-blue-200 hover:underline cursor-pointer hover:font-semibold`}
`;
const DefaultImg = styled.div`
  ${tw`w-10 h-10 flex items-center justify-center font-bold text-lg text-white rounded-full border-2 border-white object-cover hover:scale-110`}
  transition: 1s;
`;
const Phone = styled.div`
  ${tw`font-semibold`}
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

const Customers = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customer);
  const [search, setSearch] = useState("");

  //[START]=*=*=*=*=*=FETCHING CUSTOMERS DATA=*=*=*=*=*=//
  useEffect(() => {
    getCustomers(dispatch);
  }, [dispatch]);
  //=*=*=*=*=*=FETCHING CUSTOMERS DATA=*=*=*=*=*=[END]//

  //=*=*=*=*=*=SETTING UP COLUMNS=*=*=*=*=*=//
  const columns = [
    {
      field: "user",
      headerName: "User",
      width: 180,
      renderCell: (params) => {
        return (
          <User>
            {params.row.image ? (
              <ProfileImg src={params.row.image} />
            ) : (
              <DefaultImg>
                {params.row.firstName.charAt(0).toUpperCase()}
              </DefaultImg>
            )}
            {params.row.firstName} {params.row.lastName}
          </User>
        );
      },
    },
    {
      field: "_id",
      headerName: "Id",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 170,
      renderCell: (params) => {
        return (
          <Phone>
            {params.row.phoneNumber ? params.row.phoneNumber : "N/A"}
          </Phone>
        );
      },
    },
    {
      field: "stats",
      headerName: "Status",
      width: 90,
      renderCell: (params) => {
        return (
          <Status status={params.row.status}>
            {params.row.status ? "online" : "offline"}
          </Status>
        );
      },
    },
    {
      field: "view",
      headerName: "",
      width: 80,
      renderCell: (params) => {
        return (
          <Link to={"/user/" + params.row._id}>
            <View>
              View
              <UilFileInfoAlt />
            </View>
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
        Customers
      </Title>
      <Wrapper>
        <SearchContainer>
          <Search
            id="search"
            type="search"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="name /id /email /phone"
          />{" "}
          <SearchIcon htmlFor="search">
            <UilSearch className="cursor-pointer" />
          </SearchIcon>
        </SearchContainer>
        <DataGrid
          rows={customers
            .filter(
              (i) =>
                i.firstName.toLowerCase().includes(search) ||
                i.lastName.toLowerCase().includes(search) ||
                i._id.toLowerCase().includes(search) ||
                i.email.toLowerCase().includes(search) ||
                i.phoneNumber?.includes(search)
            )
            .filter((user) => !user.isAdmin)}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          disableColumnMenu
          getRowId={(row) => row._id}
          className="!text-white !border-none overflow-x-auto px-4"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        />
      </Wrapper>
    </Container>
  );
};

export default Customers;
