import tw, { styled } from "twin.macro";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import moment from "moment";

//TABLE~~~
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Container = styled.div`
  ${tw`mb-4`}
`;
const Title = styled.h3`
  ${tw`text-2xl font-bold mb-4 text-blue-50`}
  text-shadow: 2px 2px 8px rgba(255,255,255, 0.4);
`;
const Wrapper = styled.div`
  ${tw`px-4`}
`;
const Status = styled.p`
  ${tw`xl:pr-2 pr-0 py-2 rounded-lg font-semibold text-blue-50 w-auto capitalize tracking-wider`}
  ${({ status }) => status === "ready to deliver" && tw`bg-yellow-300`};
  ${({ status }) => status === "on the way" && tw`bg-green-300`};
  ${({ status }) => status === "delivered" && tw`bg-blue-300`};
`;

function createData(orderId, quantity, amount, date, status, _id) {
  return { orderId, quantity, amount, date, status, _id };
}

const Recents = () => {
  const [orders, setOrders] = useState([]);

  //[START]=*=*=*=*=*=FETCHING RECENT ORDERS=*=*=*=*=*=//
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders/");
        setOrders(res.data);
      } catch (err) {
        if (err) {
          window.location.reload(false);
          console.log(err);
        }
      }
    };
    getOrders();
  }, []);
  //=*=*=*=*=*=FETCHING RECENT ORDERS=*=*=*=*=*=[END]//
  console.log(orders);
  //=*=*=*=*=*=SETTING ROWS=*=*=*=*=*=//
  const rows = orders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((item) =>
      createData(
        item.paymentData.orderID,
        item.products.length,
        item.amount,
        moment(item.createdAt).format("MMMM DD YYYY"),
        item.status,
        item._id
      )
    )
    .slice(0, 5);
  return (
    <Container>
      <Title>Recent Orders</Title>
      <Wrapper>
        <TableContainer
          component={Paper}
          className="!bg-transparent overflow-x-auto p-2"
        >
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="!font-bold !tracking-wider">
                  Order ID
                </TableCell>
                <TableCell align="right" className="!font-bold !tracking-wider">
                  Quantity
                </TableCell>
                <TableCell align="right" className="!font-bold !tracking-wider">
                  Amount
                </TableCell>
                <TableCell align="right" className="!font-bold !tracking-wider">
                  Date
                </TableCell>
                <TableCell
                  align="right"
                  className="!font-bold !tracking-wider "
                >
                  Status
                </TableCell>
                <TableCell
                  align="right"
                  className="!font-bold !tracking-wider"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.orderId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="!text-blue-50 !font-semibold !tracking-widest "
                  >
                    {row.orderId}
                  </TableCell>
                  <TableCell
                    className="!text-blue-50 !font-medium "
                    align="right"
                  >
                    {row.quantity}
                  </TableCell>
                  <TableCell
                    className="!text-blue-50 !font-medium "
                    align="right"
                  >
                    ${row.amount}.00
                  </TableCell>
                  <TableCell
                    className="!text-blue-50 !font-medium "
                    align="right"
                  >
                    {row.date}
                  </TableCell>
                  <TableCell
                    className="!text-blue-50 !font-medium "
                    align="right"
                  >
                    <Status status={row.status}>{row.status}</Status>
                  </TableCell>
                  <TableCell
                    className="!text-blue-50 !font-medium hover:underline cursor-pointer hover:!text-blue-200 hover:scale-105"
                    align="right"
                  >
                    <Link to={"/order/" + row._id}>{"Details"}</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>
    </Container>
  );
};

export default Recents;
