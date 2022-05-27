import tw, { styled } from "twin.macro";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  ${tw`mt-12`}
`;
const Title = styled.h3`
  ${tw`text-lg font-bold text-white mb-2`}
  text-shadow: 2px 2px 8px rgba(255,255,255, 0.4);
`;
const Wrapper = styled.div`
  ${tw``}
`;
const UsersStats = () => {
  const [usersStats, setUserStats] = useState([]);
  const dataStats = [];
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

  //[START]=*=*=*=*=*=FETCHING USERS STATS=*=*=*=*=*=//
  useEffect(() => {
    const getUsersStats = async () => {
      try {
        const res = await userRequest.get("/users/statistics");
        setUserStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsersStats();
  }, []);
  //=*=*=*=*=*=FETCHING USERS STATS=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=SETTING UP DATA=*=*=*=*=*=//
  const stats = [
    {
      name: "Customers",
      data: dataStats,
    },
  ];

  usersStats.sort((a, b) => a._id - b._id).map((i) => dataStats.push(i.total));
  usersStats
    .sort((a, b) => a._id - b._id)
    .map((i) => dataCat.push(month[i._id - 1]));
  //=*=*=*=*=*=SETTING UP DATA=*=*=*=*=*=[END]//

  //=*=*=*=*=*=GRAPH INFO=*=*=*=*=*=//
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

  return (
    <Container>
      <Title>Customers</Title>
      <Wrapper>
        <Chart options={dataReview} series={stats} type="area" />
      </Wrapper>
    </Container>
  );
};

export default UsersStats;
