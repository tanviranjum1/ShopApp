import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {step1 ? (
            <Nav.Link as={Link} to="/login">
              Sign In
            </Nav.Link>
          ) : (
            <Nav.Link disabled as={Link} to="/login">
              Sign In
            </Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step2 ? (
            <Nav.Link as={Link} to="/shipping">
              Shipping{" "}
            </Nav.Link>
          ) : (
            <Nav.Link disabled as={Link} to="/shipping">
              Shipping{" "}
            </Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <Nav.Link as={Link} to="/payment">
              Payment{" "}
            </Nav.Link>
          ) : (
            <Nav.Link disabled as={Link} to="/payment">
              Payment{" "}
            </Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <Nav.Link as={Link} to="/placeorder">
              Place Order
            </Nav.Link>
          ) : (
            <Nav.Link disabled as={Link} to="/placeorder">
              Place Order
            </Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </>
  );
};

export default CheckoutSteps;

// <Nav.Item>
// {props.step2 ? (
//   <LinkContainer to="/shipping">
//     {" "}
//     <Nav.Link>Shipping</Nav.Link>
//   </LinkContainer>
// ) : (
//   <Nav.Link disabled>Shipping</Nav.Link>
// )}
// </Nav.Item>
// const CheckoutSteps = (props) => {
//   return (
//     <>
//       <Nav className="justify-content-center mb-4">
//         <Nav.Item>
//           {props.step1 ? (
//             <LinkContainer to="/login">
//               {" "}
//               <Nav.Link>Sign In</Nav.Link>
//             </LinkContainer>
//           ) : (
//             <Nav.Link disabled>Sign In</Nav.Link>
//           )}
//         </Nav.Item>
//         <Nav.Item>
//           {props.step2 ? (
//             <LinkContainer to="/shipping">
//               {" "}
//               <Nav.Link>Shipping</Nav.Link>
//             </LinkContainer>
//           ) : (
//             <Nav.Link disabled>Shipping</Nav.Link>
//           )}
//         </Nav.Item>
//         {/* <Nav.Item>
//         {step3 ? (
//           <LinkContainer to="/payment">
//             {" "}
//             <Nav.Link>Payment</Nav.Link>
//           </LinkContainer>
//         ) : (
//           <Nav.Link disabled>Payment</Nav.Link>
//         )}
//       </Nav.Item>
//       <Nav.Item>
//         {step4 ? (
//           <LinkContainer to="/placeorder">
//             {" "}
//             <Nav.Link>Place Order</Nav.Link>
//           </LinkContainer>
//         ) : (
//           <Nav.Link disabled>Place Order</Nav.Link>
//         )}
//       </Nav.Item> */}
//       </Nav>
//     </>
//   );
// };

// export default CheckoutSteps;
