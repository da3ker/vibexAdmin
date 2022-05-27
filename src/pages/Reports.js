import { DataGrid } from "@mui/x-data-grid";
import tw, { styled } from "twin.macro";
import { UilEnvelopeAlt, UilEnvelopeOpen } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import { userRequest } from "../requestMethods";
import moment from "moment";

const Container = styled.div`
  ${tw`h-full w-full rounded-lg`}
`;
const Header = styled.div`
  ${tw`flex`}
`;
const Title = styled(motion.h1)`
  ${tw`text-4xl font-extrabold tracking-wide flex items-end text-white`}
  text-shadow: 2px 2px 8px rgba(255,255,255, 0.4);
`;
const Wrapper = styled.div`
  ${tw`w-full md:h-5/6 h-[28rem] rounded-lg mt-12 flex flex-col gap-2`}
`;
const Subject = styled.div`
  ${tw`flex items-center gap-2`}
`;
const View = styled.div`
  ${tw`flex items-center  gap-2 hover:text-blue-200 hover:underline cursor-pointer hover:font-semibold`}
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

const Reports = () => {
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);

  //[START]=*=*=*=*=*=FETCHING MESSAGES=*=*=*=*=*=//
  useEffect(() => {
    const getMessages = async (msg) => {
      try {
        const res = await userRequest.get("/messages/");
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, []);
  //=*=*=*=*=*=FETCHING MESSAGES=*=*=*=*=*=[END]//

  //=*=*=*=*=*=SETTING UP COLUMNS=*=*=*=*=*=//
  const columns = [
    {
      field: "_id",
      headerName: "Id",
      width: 300,
    },
    {
      field: "title",
      headerName: "Subject",
      width: 250,
      renderCell: (params) => {
        return <Subject>{params.row.subject}</Subject>;
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        return <>{moment(params.row.createdAt).format("MMM DD YYYY")}</>;
      },
    },
    {
      field: "view",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <Link to={"/report/" + params.row._id}>
            <View>
              Read
              {params.row.read ? <UilEnvelopeOpen /> : <UilEnvelopeAlt />}
            </View>
          </Link>
        );
      },
    },
  ];
  return (
    <Container>
      <Header>
        <Title
          initial={{ y: "-30vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Reports
        </Title>
      </Header>
      <Wrapper>
        <SearchContainer>
          <Search
            id="search"
            type="search"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="id/subject/date"
          />{" "}
          <SearchIcon htmlFor="search">
            <UilSearch className="cursor-pointer" />
          </SearchIcon>
        </SearchContainer>
        <DataGrid
          rows={messages.filter(
            (i) =>
              i.subject.toLowerCase().includes(search) ||
              moment(i.createdAt)
                .format("MMM DD YYYY")
                .toLowerCase()
                .includes(search) ||
              i._id.toLowerCase().includes(search)
          )}
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

export default Reports;
