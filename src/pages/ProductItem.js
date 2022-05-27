import tw, { styled } from "twin.macro";
import { UilCloudUpload } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteProduct, updateProduct } from "../redux/apiCalls";
import Loading from "../components/Loading";

//FIREBASE~~~
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

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
  ${tw`text-4xl font-extrabold tracking-wide text-white capitalize`}
  text-shadow: 2px 2px 8px rgba(255,255,255, 0.4);
`;
const Wrapper = styled.div`
  ${tw`flex relative mt-12 gap-4 lg:flex-row flex-col`}
`;
const ProductImg = styled.img`
  ${tw`object-cover rounded-xl absolute w-full h-full top-0 left-0 opacity-50`}
  transition: 1s;
`;
const ProductBgImg = styled.img`
  ${tw`object-cover rounded-xl absolute w-full h-full top-0 left-0 opacity-25`}
  z-index:-1;
`;
const Product = styled(motion.div)`
  ${tw`flex gap-4 flex-1 p-4 rounded-xl relative`}
  &:hover ${ProductImg} {
    opacity: 1;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;
const ProductInfo = styled.div`
  ${tw`flex flex-col gap-4 w-1/2 justify-between backdrop-blur-sm z-20`}
`;
const InfoWrapper = styled.div`
  ${tw`flex flex-col gap-1`}
`;
const SubTitle = styled.p`
  ${tw`text-xs font-semibold text-gray-300 lowercase tracking-wider`}
`;
const Info = styled.p`
  ${tw`pl-4 font-bold  text-white tracking-wider`}
`;
const Colors = styled.div`
  ${tw`pl-4 flex gap-2`}
`;
const Color = styled.div`
  ${tw`rounded-full w-8 h-8 border-2`}
  aspect-ratio: 1 / 1;
  ${({ color }) => color === "yellow" && tw`border-yellow-400 bg-yellow-300`};
  ${({ color }) => color === "black" && tw`border-gray-600 bg-black`};
  ${({ color }) => color === "white" && tw`border-gray-200 bg-white`};
`;
const Sizes = styled.div`
  ${tw` pl-4 flex gap-2 uppercase`}
`;
const Size = styled.div`
  ${tw`px-4 py-2 border-2 border-white text-sm text-white`}
`;
const Category = styled.div`
  ${tw`px-4 py-1 border-[1px] border-white text-xs text-white tracking-wider`}
`;
const Edit = styled(motion.form)`
  ${tw`flex-1 rounded-xl p-4 flex justify-between`}
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;
const UpdateProduct = styled.div`
  ${tw`flex flex-col gap-4 w-1/2`}
`;
const UpdateTitle = styled.label`
  ${tw`text-xs font-semibold lowercase tracking-wider`}
`;
const UpdateInfo = styled.input`
  ${tw`pl-4 font-bold tracking-wider outline-none bg-transparent text-gray-100`}
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;
const UpdatePicture = styled.div`
  ${tw`flex flex-col justify-between w-1/2`}
`;
const Update = styled.div`
  ${tw`flex items-center justify-end gap-2 relative`}
`;
const Picture = styled.img`
  ${tw`w-3/4 rounded-lg object-cover `}
  aspect-ratio: 1/1;
`;
const UpdateLabel = styled.label`
  ${tw`cursor-pointer absolute bottom-2 right-2 text-gray-200 hover:text-white flex text-[8px] gap-2 items-center`}
  transition: 0.5s;
`;
const Load = styled.div`
  ${tw`absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-300`}
  animation: colorChange 5s linear infinite;
  @keyframes colorChange {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
`;
const Uploaded = styled.div`
  ${tw`absolute top-2 right-2 w-4 h-4 rounded bg-green-300`}
`;
const UpdateInput = styled.input`
  ${tw`hidden`}
`;
const UpdateButton = styled.button`
  ${tw`py-1 px-4 bg-blue-100 self-end rounded-lg font-bold text-white tracking-wider opacity-50 hover:bg-transparent hover:text-gray-700 hover:opacity-100`}
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  transition: 1s;
`;
const Select = styled.select`
  ${tw`pl-4 font-bold tracking-wider outline-none bg-transparent text-gray-100`}
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;
const StatusOption = styled.option`
  ${tw`text-gray-700 font-bold `}
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
const Success = styled.div`
  ${tw`text-sm font-semibold tracking-widest text-white px-10 py-5 outline-none bg-white/[.4] rounded-lg`}
`;
const UnSuccess = styled.div`
  ${tw`text-sm font-semibold tracking-widest text-red-400 px-10 py-5 outline-none bg-black/[.4] rounded-lg`}
`;

const ProductItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.product.products.find((item) => item._id === id)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(true);

  //[START]=*=*=*=*=*=DELETING PRODUCT=*=*=*=*=*=//
  const handleDelete = (id) => {
    navigate("/products");
    deleteProduct(id, dispatch);
  };
  //=*=*=*=*=*=DELETING PRODUCT=*=*=*=*=*=[END]//

  //[START][=][=][=][=][=]***UPDATING PRODUCT***[=][=][=][=][=]//
  const [img, setImg] = useState(null);
  const [imgLink, setImgLink] = useState("");
  const [categories, setCategories] = useState(product.categories);
  const [colors, setColors] = useState(product.colors);
  const [sizes, setSizes] = useState(product.sizes);
  const [status, setStatus] = useState(product.status);
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    oldprice: !product.oldprice ? "" : product.oldprice,
    inStock: product.inStock,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const { name, price, oldprice, inStock } = formData;
  const { error, isFetching } = useSelector((state) => state.product);

  //[START]=*=*=*=*=*=HANDLING DATA INFORMATION=*=*=*=*=*=//
  const handleCat = (e) => {
    setCategories(e.target.value.replace(/\s/g, "").split(","));
  };
  const handleColors = (e) => {
    setColors(e.target.value.replace(/\s/g, "").split(","));
  };
  const handleSizes = (e) => {
    setSizes(e.target.value.replace(/\s/g, "").split(","));
  };

  const onChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  //=*=*=*=*=*=HANDLING DATA INFORMATION=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=FORCE REFRESH=*=*=*=*=*=//
  const forceRefresh = () => {
    if (!error) {
      window.location.reload(false);
      navigate("/products");
    } else {
      return;
    }
  };
  //=*=*=*=*=*=FORCE REFRESH=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=UPLOADING PRODUCT IMAGE=*=*=*=*=*=//
  useEffect(() => {
    if (img) {
      const imgName = new Date().getTime() + img?.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, imgName);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgLink(downloadURL);
            setLoad(true);
          });
        }
      );
    }
  }, [img]);
  //=*=*=*=*=*=UPLOADING PRODUCT IMAGE=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=UPDATING PRODUCT DATA=*=*=*=*=*=//
  const handleClick = (e) => {
    e.preventDefault();
    //======updating product data {WITHOUT NAME & IMAGE}======//
    if (name === product.name && !img) {
      const updatedProduct = {
        price,
        oldprice,
        inStock,
        status,
        categories,
        colors,
        sizes,
      };
      updateProduct(id, updatedProduct, dispatch);
      setIsSuccess(true);
    }
    //======updating product data {WITHOUT NAME}======//
    if (name === product.name) {
      const updatedProduct = {
        price,
        oldprice,
        inStock,
        status,
        img: imgLink,
        categories,
        colors,
        sizes,
      };
      updateProduct(id, updatedProduct, dispatch);
      setIsSuccess(true);
    }
    //======updating product data {WITHOUT IMAGE}======//
    else if (!img) {
      const updatedProduct = {
        ...formData,
        categories,
        colors,
        sizes,
      };
      updateProduct(id, updatedProduct, dispatch);
      setIsSuccess(true);
    }
    //======updating product data {COMPLETE}======//
    else {
      const updatedProduct = {
        ...formData,
        img: imgLink,
        categories,
        colors,
        sizes,
      };
      updateProduct(id, updatedProduct, dispatch);
      setIsSuccess(true);
    }
  };
  //=*=*=*=*=*=UPDATING PRODUCT DATA=*=*=*=*=*=[END]//

  //[=][=][=][=][=]***UPDATING PRODUCT***[=][=][=][=][=][END]//

  // useEffect(() => {
  //   dispatch(reset());
  // }, [dispatch]);

  return (
    <Container>
      <Header>
        <Title
          initial={{ y: "-30vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {product.name}
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
        <Product
          initial={{ x: "-100vh", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ProductInfo>
            <InfoWrapper>
              <SubTitle>Product Id:</SubTitle>
              <Info>{product._id}</Info>
            </InfoWrapper>
            <InfoWrapper>
              <SubTitle>Price:</SubTitle>
              <Info>${product.price}.00</Info>
            </InfoWrapper>
            {(product.oldprice || product.oldprice > 0) && (
              <InfoWrapper>
                <SubTitle>Old Price:</SubTitle>
                <Info>${product.oldprice}.00</Info>
              </InfoWrapper>
            )}
            <InfoWrapper>
              <SubTitle>Available Colors:</SubTitle>
              <Colors>
                {product.colors.map((color) => (
                  <Color color={color} key={color} />
                ))}
              </Colors>
            </InfoWrapper>
            <InfoWrapper>
              <SubTitle>Available Sizes:</SubTitle>
              <Sizes>
                {product.sizes.map((size) => (
                  <Size key={size}>{size}</Size>
                ))}
              </Sizes>
            </InfoWrapper>
            <InfoWrapper>
              <SubTitle>Categories:</SubTitle>
              <Sizes>
                {product.categories.map((cat) => (
                  <Category key={cat}>[{cat}]</Category>
                ))}
              </Sizes>
            </InfoWrapper>
            <InfoWrapper>
              <SubTitle>Stocks:</SubTitle>
              <Info>{product.inStock}</Info>
            </InfoWrapper>
            <InfoWrapper>
              <SubTitle>Status:</SubTitle>
              <Info>{product.status ? "Available" : "Not Available"}</Info>
            </InfoWrapper>
            <InfoWrapper>
              <SubTitle>Sold:</SubTitle>
              <Info>{product.sold}</Info>
            </InfoWrapper>
          </ProductInfo>
          <ProductImg src={product.img} />
        </Product>
        <Edit
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <UpdateProduct>
            <InfoWrapper>
              <UpdateTitle>update product name:</UpdateTitle>
              <UpdateInfo
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </InfoWrapper>
            <InfoWrapper>
              <UpdateTitle>update price:</UpdateTitle>
              <UpdateInfo
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => onChange(e)}
              />
            </InfoWrapper>
            <InfoWrapper>
              <UpdateTitle className="flex flex-col">
                old price:
                <span className="text-[8px] text-gray-500">
                  (for on sale products)
                </span>
              </UpdateTitle>
              <UpdateInfo
                type="number"
                id="oldprice"
                name="oldprice"
                value={oldprice}
                onChange={(e) => onChange(e)}
              />
            </InfoWrapper>
            <InfoWrapper>
              <UpdateTitle>update categories:</UpdateTitle>
              <UpdateInfo
                type="text"
                id="categories"
                name="categories"
                value={categories}
                onChange={(e) => handleCat(e)}
              />
            </InfoWrapper>
            <InfoWrapper>
              <UpdateTitle>update available colors:</UpdateTitle>
              <UpdateInfo
                type="text"
                id="colors"
                name="colors"
                value={colors}
                onChange={(e) => handleColors(e)}
              />
            </InfoWrapper>
            <InfoWrapper>
              <UpdateTitle>update available sizes:</UpdateTitle>
              <UpdateInfo
                type="text"
                id="sizes"
                name="sizes"
                value={sizes}
                onChange={(e) => handleSizes(e)}
              />
            </InfoWrapper>
            <InfoWrapper>
              <UpdateTitle>update stocks:</UpdateTitle>
              <UpdateInfo
                type="text"
                id="inStock"
                name="inStock"
                value={inStock}
                onChange={(e) => onChange(e)}
              />
            </InfoWrapper>
            <InfoWrapper>
              <UpdateTitle>update status:</UpdateTitle>
              <Select
                defaultValue={product.status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <StatusOption value="true">Available</StatusOption>
                <StatusOption value="false">Not Available</StatusOption>
              </Select>
            </InfoWrapper>
          </UpdateProduct>
          <UpdatePicture>
            <Update>
              <Picture src={product.img} />
              <UpdateLabel htmlFor="updateimg" onClick={() => setLoad(false)}>
                {img?.name}
                <UilCloudUpload className="scale-150" />
              </UpdateLabel>
              {!load ? <Load /> : <Uploaded />}
              <UpdateInput
                type="file"
                id="updateimg"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </Update>
            <UpdateButton type="submit" onClick={(e) => handleClick(e)}>
              Update
            </UpdateButton>
          </UpdatePicture>
          <ProductBgImg src={product.imgBg} />
        </Edit>
      </Wrapper>
      <Delete
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <UilTrashAlt
          className="hover:text-red-300"
          style={{ transition: "1s" }}
        />
        <DeleteText>Delete Product?</DeleteText>
      </Delete>
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
          <Warning>Are you sure you want to delete this product?</Warning>
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
      <Modal
        open={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          forceRefresh();
        }}
        className="flex justify-center items-center backdrop-blur-sm"
      >
        {!error ? (
          <Success>Product successfully updated!</Success>
        ) : (
          <UnSuccess>{error}</UnSuccess>
        )}
      </Modal>
      {isFetching && <Loading />}
    </Container>
  );
};

export default ProductItem;
