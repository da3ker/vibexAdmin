import tw, { styled } from "twin.macro";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { userRequest } from "../requestMethods";
import "react-circular-progressbar/dist/styles.css";
import Chart from "react-apexcharts";

import {
  UilCoins,
  UilMoneyWithdrawal,
  UilReceipt,
} from "@iconscout/react-unicons";

const Container = styled.div`
  ${tw`px-4`}
`;
const CardWrapper = styled.div`
  /* ${tw`flex xl:flex-row flex-col gap-4`} */ //use this when you already have revenue and cost
  ${tw`flex flex-row gap-4`}
`;
const Card = styled.div`
  ${tw`flex-1 rounded-xl flex justify-between p-4 text-blue-50 h-48 cursor-pointer hover:scale-105`}
  transition:1s;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  ${({ title }) => title === "sales" && tw`bg-purple-300/[.5]`};
  ${({ title }) => title === "revenue" && tw`bg-blue-300/[.5]`};
  ${({ title }) => title === "expenses" && tw`bg-green-300/[.5]`};
`;
const Top = styled.div`
  ${tw`flex flex-col justify-between`}
`;
const Bot = styled.div`
  ${tw`flex flex-col justify-between items-center`}
`;
const Circle = styled.div`
  ${tw`w-20 h-20`}
`;
const Title = styled.h3`
  ${tw`text-2xl font-extrabold tracking-wider text-white`}
`;
const Right = styled.div`
  ${tw`flex flex-col justify-between items-end `}
`;
const Icon = styled.div`
  ${tw``}
`;
const Amount = styled.h2`
  ${tw`text-2xl font-extrabold`}
`;
const Subtitle = styled.h5`
  ${tw` text-xs font-medium opacity-75`}
`;
const ChartContainer = styled.div`
  ${tw`md:w-1/2 w-11/12 outline-none md:p-16 p-2 rounded-lg`}
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  ${({ title }) => title === "sales" && tw`bg-purple-300`};
  ${({ title }) => title === "revenue" && tw`bg-blue-300`};
  ${({ title }) => title === "expenses" && tw`bg-green-300`};
`;

const Cards = () => {
  const [open, setOpen] = useState();
  const [sales, setSales] = useState([]);
  const [perc, setPerc] = useState(0);
  const dataSales = [];
  const dataCat = [];

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //=*=*=*=*=*=TOGGLE MODAL=*=*=*=*=*=//
  const toggleOpen = (index) => {
    setOpen(index);
  };

  //[START]=*=*=*=*=*=FETCHING INCOME DATA=*=*=*=*=*=//
  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        setSales(res.data.sort((a, b) => a._id - b._id));
        setPerc(
          (res.data.sort((a, b) => a._id - b._id)[1].total * 100) /
            res.data[0].total -
            100
        );
      } catch (err) {
        console.log(err);
      }
    };
    getSales();
  }, []);
  //=*=*=*=*=*=FETCHING INCOME DATA=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=GRAPH INFO=*=*=*=*=*=//
  const stats = [
    {
      name: "Sales",
      data: dataSales,
    },
  ];

  sales.map((i) => dataSales.push(i.total));
  sales.map((i) => dataCat.push(month[i._id - 1]));

  const dataReview = {
    chart: {
      type: "area",
      height: "auto",
    },

    fill: {
      colors: ["#fff"],
      type: "gradient",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#fff"],
    },
    tooltip: {
      x: {},
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: dataCat,
    },
    yaxis: {
      show: false,
    },
    toolbar: {
      show: false,
    },
  };
  //=*=*=*=*=*=GRAPH INFO=*=*=*=*=*=[END]//

  return (
    <Container>
      <CardWrapper>
        <Card title={"sales"} onClick={() => toggleOpen(1)}>
          <Top>
            <Circle>
              <CircularProgressbar
                value={Math.floor(perc)}
                text={`${Math.floor(perc)}%`}
              />
            </Circle>
            <Subtitle>Compared to last month</Subtitle>
          </Top>
          <Bot>
            <Right>
              <Icon>
                <UilCoins className="scale-110" />
              </Icon>
              <Title>Sales</Title>
            </Right>
            <Amount>Php {sales[1]?.total}</Amount>
          </Bot>
        </Card>
        {/* <Card title={"revenue"} onClick={() => toggleOpen(2)}>
          <Top>
            <Circle>
              <CircularProgressbar value={65} text={`${65}%`} />
            </Circle>
            <Right>
              <Icon>
                <UilMoneyWithdrawal className="scale-110" />
              </Icon>
              <Title>Revenue</Title>
            </Right>
          </Top>
          <Bot>
            <Amount>Php 21,881</Amount>
            <Subtitle>Last 24hrs</Subtitle>
          </Bot>
        </Card>
        <Card title={"expenses"} onClick={() => toggleOpen(3)}>
          <Top>
            <Circle>
              <CircularProgressbar value={37} text={`${37}%`} />
            </Circle>
            <Right>
              <Icon>
                <UilReceipt className="scale-110" />
              </Icon>
              <Title>Expenses</Title>
            </Right>
          </Top>
          <Bot>
            <Amount>Php 10,841</Amount>
            <Subtitle>Last 24hrs</Subtitle>
          </Bot>
        </Card> */}
      </CardWrapper>
      <Modal
        open={open === 1}
        onClose={() => setOpen(false)}
        className="flex justify-center items-center"
      >
        <ChartContainer title={"sales"}>
          <Title>Sales</Title>
          <Chart options={dataReview} series={stats} type="area" />
        </ChartContainer>
      </Modal>
      {/* <Modal
        open={open === 2}
        onClose={() => setOpen(false)}
        className="flex justify-center items-center"
      >
        <ChartContainer title={"revenue"}>
          <Title>Revenue</Title>
          <Chart
            options={dataOptions.options}
            series={revenueData}
            type="area"
          />
        </ChartContainer>
      </Modal>
      <Modal
        open={open === 3}
        onClose={() => setOpen(false)}
        className="flex justify-center items-center"
      >
        <ChartContainer title={"expenses"}>
          <Title>Expenses</Title>
          <Chart
            options={dataOptions.options}
            series={expensesData}
            type="area"
          />
        </ChartContainer>
      </Modal> */}
    </Container>
  );
};

export default Cards;
