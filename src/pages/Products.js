import { DataGrid } from "@mui/x-data-grid";
import tw, { styled } from "twin.macro";
import { UilFileInfoAlt } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../redux/apiCalls";
import { UilSearch } from "@iconscout/react-unicons";

const Container = styled.div`
  ${tw`h-full w-full rounded-lg`}
`;
const Header = styled.div`
  ${tw`flex justify-between`}
`;
const Add = styled(motion.span)`
  ${tw`text-2xl font-extrabold tracking-widest py-1 px-4 rounded-md text-green-100 mr-2 cursor-pointer hover:scale-105 hover:text-gray-500`}
  transition:1s;
  text-shadow: 2px 2px 8px rgba(255, 255, 255, 0.4);
  box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
`;
const Title = styled(motion.h1)`
  ${tw`text-4xl font-extrabold tracking-wide flex items-end text-white`}
  text-shadow: 2px 2px 8px rgba(255,255,255, 0.4);
`;
const Wrapper = styled.div`
  ${tw`w-full md:h-5/6 h-[28rem] rounded-lg mt-12 flex flex-col gap-2`}
`;
const Product = styled.div`
  ${tw`flex items-center gap-2`}
`;
const ProductImg = styled.img`
  ${tw`w-10 h-10 rounded-full border-2 border-white object-cover`}
`;
const Out = styled.span`
  ${tw`text-xs font-semibold text-white bg-red-300 px-2 py-1 rounded-xl`}
`;
const View = styled.div`
  ${tw`flex items-center gap-2 hover:text-blue-200 hover:underline cursor-pointer hover:font-semibold`}
`;
const Price = styled.p`
  ${tw``}
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

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [search, setSearch] = useState("");

  //[START]=*=*=*=*=*=FETCHING PRODUCTS=*=*=*=*=*=//
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  //=*=*=*=*=*=FETCHING PRODUCTS=*=*=*=*=*=[END]//

  //=*=*=*=*=*=SETTING UP COLUMNS=*=*=*=*=*=//
  const columns = [
    {
      field: "_id",
      headerName: "Id",
      width: 250,
    },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <Product>
            <ProductImg src={params.row.img} />
            {params.row.name}
          </Product>
        );
      },
    },
    {
      field: "amount",
      headerName: "Price",
      width: 120,
      renderCell: (params) => {
        return <Price>$ {params.row.price}.00</Price>;
      },
    },
    {
      field: "stocks",
      headerName: "Stocks",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            {params.row.inStock >= 1 ? (
              params.row.inStock
            ) : (
              <Out>Out of Stocks</Out>
            )}
          </>
        );
      },
    },
    {
      field: "sold",
      headerName: "Sold",
      width: 80,
    },
    {
      field: "view",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <Link to={"/product/" + params.row._id}>
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
      <Header>
        <Title
          initial={{ y: "-30vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Products
        </Title>
        <Link to="/addProduct">
          <Add
            initial={{ y: "-30vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Add
          </Add>
        </Link>
      </Header>
      <Wrapper>
        <SearchContainer>
          <Search
            id="search"
            type="search"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="id/product name"
          />{" "}
          <SearchIcon htmlFor="search">
            <UilSearch className="cursor-pointer" />
          </SearchIcon>
        </SearchContainer>
        <DataGrid
          rows={products.filter(
            (i) =>
              i._id.toLowerCase().includes(search) ||
              i.name.toLowerCase().includes(search)
          )}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          disableColumnMenu
          getRowId={(row) => row._id}
          className="!text-white !border-none overflow-x-auto px-8"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        />
      </Wrapper>
    </Container>
  );
};

export default Products;
