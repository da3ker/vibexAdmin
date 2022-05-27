import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  ${tw`h-full w-full rounded-lg`}
`;
const Title = styled(motion.h1)`
  ${tw`text-4xl font-extrabold tracking-wide text-white`}
  text-shadow: 2px 2px 8px rgba(255,255,255, 0.4);
`;
const Wrapper = styled(motion.div)`
  ${tw`mt-12 flex flex-col gap-8`}
`;
const ChartWrapper = styled.div`
  ${tw`px-14`}
`;
const ChartTitle = styled.h2`
  ${tw`text-3xl font-bold`}
  text-shadow: 2px 2px 4px rgba(255,255,255, 0.4);
  ${({ title }) => title === "sales" && tw`text-purple-300`};
  ${({ title }) => title === "revenue" && tw`text-blue-300`};
  ${({ title }) => title === "expenses" && tw`text-green-300`};
`;

const Analytics = () => {
  const [sales, setSales] = useState([]);
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

  //[START]=*=*=*=*=*=FETCHING INCOME DATA=*=*=*=*=*=//
  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        setSales(res.data.sort((a, b) => a._id - b._id));
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
      <Title
        initial={{ y: "-30vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Analytics
      </Title>
      <Wrapper>
        <ChartWrapper>
          <ChartTitle title="sales">Sales</ChartTitle>
          <Chart options={dataReview} series={stats} type="area" />
        </ChartWrapper>
        {/* <ChartWrapper>
          <ChartTitle title="revenue">Revenue</ChartTitle>
          <Chart
            options={dataOptions.options}
            series={revenueData}
            type="area"
          />
        </ChartWrapper>
        <ChartWrapper>
          <ChartTitle title="expenses">Expenses</ChartTitle>
          <Chart
            options={dataOptions.options}
            series={expensesData}
            type="area"
          />
        </ChartWrapper> */}
      </Wrapper>
    </Container>
  );
};

export default Analytics;
