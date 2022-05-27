import { motion } from "framer-motion";
import tw, { styled } from "twin.macro";
import { UilCloudUpload } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addProduct } from "../redux/apiCalls";
import { Modal } from "@mui/material";
import { reset } from "../redux/productsRedux";
import Loading from "../components/Loading";

//FIREBASE~~~
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Container = styled.div`
  ${tw`h-full w-full rounded-lg`}
`;
const Title = styled(motion.h1)`
  ${tw`text-4xl font-extrabold tracking-wide text-white`}
  text-shadow: 2px 2px 8px rgba(255,255,255, 0.4);
`;
const Wrapper = styled.div`
  ${tw`mt-12`}
`;
const AddForm = styled.form`
  ${tw`flex flex-col gap-8`}
`;
const InfoForm = styled.div`
  ${tw`flex justify-start gap-6`}
`;
const InfoPart = styled(motion.div)`
  ${tw`flex flex-col gap-4`}
`;
const Section = styled.div`
  ${tw`flex flex-col gap-1`}
`;
const Subtitle = styled.label`
  ${tw`text-sm font-bold tracking-wider lowercase text-gray-700`}
`;
const InfoInput = styled.input`
  ${tw`pl-2 py-1 bg-transparent outline-none text-sm font-medium text-white lowercase`}
  box-shadow: rgba(255, 255, 255, 0.15) -1.95px 1.95px 2.6px;
`;

const SecondPart = styled(motion.div)`
  ${tw`flex flex-col gap-4`}
`;
const ImageContainer = styled.div`
  ${tw`flex flex-col gap-2`}
`;
const ImageName = styled.span`
  ${tw`text-xs font-semibold text-white`}
`;
const UploadLabel = styled.label`
  ${tw`cursor-pointer lowercase text-xs text-white hover:scale-110 hover:text-blue-300`}
  transition: 1s;
`;
const UploadTitle = styled.label`
  ${tw`lowercase text-[10px] text-white`}
`;
const UploadInput = styled.input`
  ${tw`hidden`}
`;
const CreateButton = styled(motion.button)`
  ${tw`py-1 px-4 bg-green-200 rounded-lg text-white font-bold tracking-wider self-start opacity-75 hover:bg-transparent hover:text-green-300 hover:scale-110`}
  transition: 1s;
  &:hover {
    box-shadow: rgba(103, 255, 115, 0.3) 1.95px 1.95px 3.8px;
  }
`;
const Error = styled.span`
  ${tw`text-xs font-semibold tracking-wider text-red-400 mt-[-1rem]`}
`;
const Success = styled.div`
  ${tw`text-sm font-semibold tracking-widest text-white px-10 py-5 outline-none bg-white/[.4] rounded-lg`}
`;
const UnSuccess = styled.div`
  ${tw`text-sm font-semibold tracking-widest text-red-400 px-10 py-5 outline-none bg-black/[.4] rounded-lg`}
`;
const Load = styled.div`
  ${tw` w-6 h-2 rounded-full bg-blue-200`}
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
  ${tw`w-6 h-2 rounded bg-green-300`}
`;

const AddProduct = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const [imgLink, setImgLink] = useState("");
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    inStock: "",
  });
  const { name, desc, price, inStock } = formData;
  const [inputError, setInputError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { error, isFetching } = useSelector((state) => state.product);
  const [load, setLoad] = useState(true);

  //[START]=*=*=*=*=*=DATA FOR FEATURED PRODUCTS=*=*=*=*=*=//
  const [imgBg, setImgBg] = useState(null);
  const [imgBgLink, setImgBgLink] = useState("");
  const [subName, setSubName] = useState("");
  //=*=*=*=*=*=DATA FOR FEATURED PRODUCTS=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=HANDLING DATA INFORMATIONS=*=*=*=*=*=//
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
  //=*=*=*=*=*=HANDLING DATA INFORMATIONS=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=FORCE REFRESH=*=*=*=*=*=//
  const forceRefresh = () => {
    if (!error) {
      window.location.reload(false);
    } else {
      return;
    }
  };
  //=*=*=*=*=*=FORCE REFRESH=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=RESETTING ERRORS=*=*=*=*=*=//
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  //=*=*=*=*=*=RESETTING ERRORS=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=UPLOADING PRODUCT IMAGE=*=*=*=*=*=//
  useEffect(() => {
    if (img) {
      const imgName = new Date().getTime() + img.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, imgName);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgLink(downloadURL);
            setLoad(true);
          });
        }
      );
    }
  }, [img]);
  //=*=*=*=*=*=UPLOADING PRODUCT IMAGE=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=UPLOADING PRODUCT BACKGROUND IMAGE=*=*=*=*=*=//
  useEffect(() => {
    if (imgBg) {
      const imgName = new Date().getTime() + imgBg.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, imgName);

      const uploadTask = uploadBytesResumable(storageRef, imgBg);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgBgLink(downloadURL);
            setLoad(true);
          });
        }
      );
    }
  }, [imgBg]);
  //=*=*=*=*=*=UPLOADING PRODUCT BACKGROUND IMAGE=*=*=*=*=*=[END]//

  //[START][*][*][*][*][*]ADDING PRODUCT[*][*][*][*][*]//
  const handleClick = (e) => {
    e.preventDefault();

    //[START]=*=*=*=*=*=FOR FEATURED PRODUCTS=*=*=*=*=*=//
    if (categories.includes("featured")) {
      if (
        !name ||
        !desc ||
        !price ||
        !inStock ||
        !imgLink ||
        categories === [] ||
        colors === [] ||
        sizes === [] ||
        !imgBgLink ||
        !subName
      ) {
        console.log("Please Fill out all fields!");
        setInputError(true);
        return;
      }
      const product = {
        ...formData,
        subName,
        img: imgLink,
        imgBg: imgBgLink,
        categories,
        colors,
        sizes,
      };
      setInputError(false);
      addProduct(product, dispatch);
      setIsSuccess(true);
    }
    //=*=*=*=*=*=FOR FEATURED PRODUCTS=*=*=*=*=*=[END]//
    else {
      if (
        !name ||
        !desc ||
        !price ||
        !inStock ||
        !imgLink ||
        categories === [] ||
        colors === [] ||
        sizes === []
      ) {
        console.log("Please Fill out all fields!");
        setInputError(true);
        return;
      }
      const product = {
        ...formData,
        img: imgLink,
        categories,
        colors,
        sizes,
      };
      setInputError(false);
      addProduct(product, dispatch);
      setIsSuccess(true);
    }
  };
  //[*][*][*][*][*]ADDING PRODUCT[*][*][*][*][*][END]//

  return (
    <Container>
      <Title
        initial={{ y: "-30vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Add new product
      </Title>
      <Wrapper>
        <AddForm>
          <InfoForm>
            <InfoPart
              initial={{ x: "-100vh", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <Section>
                <Subtitle>Product Name:</Subtitle>
                <InfoInput
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  required
                  onChange={(e) => onChange(e)}
                />
              </Section>
              <Section>
                <Subtitle>Description:</Subtitle>
                <InfoInput
                  type="text"
                  id="desc"
                  name="desc"
                  value={desc}
                  required
                  onChange={(e) => onChange(e)}
                />
              </Section>
              <Section>
                <Subtitle>Price:</Subtitle>
                <InfoInput
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  required
                  onChange={(e) => onChange(e)}
                />
              </Section>
              <Section>
                <Subtitle>Categories:</Subtitle>
                <InfoInput
                  type="text"
                  id="categories"
                  name="categories"
                  value={categories}
                  required
                  onChange={(e) => handleCat(e)}
                />
              </Section>
              <Section>
                <Subtitle>Sizes:</Subtitle>
                <InfoInput
                  type="text"
                  id="sizes"
                  name="sizes"
                  value={sizes}
                  required
                  onChange={(e) => handleSizes(e)}
                />
              </Section>
              <Section>
                <Subtitle>Colors:</Subtitle>
                <InfoInput
                  type="text"
                  id="colors"
                  name="colors"
                  value={colors}
                  required
                  onChange={(e) => handleColors(e)}
                />
              </Section>
              <Section>
                <Subtitle>Stocks:</Subtitle>
                <InfoInput
                  type="number"
                  id="inStock"
                  name="inStock"
                  value={inStock}
                  required
                  onChange={(e) => onChange(e)}
                />
              </Section>
            </InfoPart>
            <SecondPart
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <ImageContainer>
                <UploadTitle>Product Image:</UploadTitle>
                <UploadLabel htmlFor="file" onClick={() => setLoad(false)}>
                  <UilCloudUpload className="scale-150" />
                  <ImageName>{img?.name}</ImageName>
                </UploadLabel>
                <UploadInput
                  id="file"
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                />
                {!load ? <Load /> : <Uploaded />}
              </ImageContainer>
              {categories.includes("featured") && (
                <>
                  <ImageContainer>
                    <UploadTitle>Product Background Image:</UploadTitle>
                    <UploadLabel
                      htmlFor="bgFile"
                      onClick={() => setLoad(false)}
                    >
                      <UilCloudUpload className="scale-150" />
                      <ImageName>{imgBg?.name}</ImageName>
                    </UploadLabel>
                    <UploadInput
                      id="bgFile"
                      type="file"
                      onChange={(e) => setImgBg(e.target.files[0])}
                    />
                    {!load ? <Load /> : <Uploaded />}
                  </ImageContainer>
                  <Section>
                    <Subtitle>Product SubName:</Subtitle>
                    <InfoInput
                      type="text"
                      id="subName"
                      name="subName"
                      value={subName}
                      required
                      onChange={(e) => setSubName(e.target.value)}
                    />
                  </Section>
                </>
              )}
            </SecondPart>
          </InfoForm>
          {inputError && <Error>Please fill out all input fields.</Error>}
          <CreateButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            type="submit"
            onClick={(e) => handleClick(e)}
          >
            Create
          </CreateButton>
        </AddForm>
        <Modal
          open={isSuccess}
          onClose={() => {
            setIsSuccess(false);
            forceRefresh();
          }}
          className="flex justify-center items-center backdrop-blur-sm"
        >
          {!error ? (
            <Success>New Product successfully added!</Success>
          ) : (
            <UnSuccess>{error}</UnSuccess>
          )}
        </Modal>
      </Wrapper>
      {isFetching && <Loading />}
    </Container>
  );
};

export default AddProduct;
