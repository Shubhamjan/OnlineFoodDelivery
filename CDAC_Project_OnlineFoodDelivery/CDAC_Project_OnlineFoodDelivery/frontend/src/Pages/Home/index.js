import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Footer from "../../Components/Header/Footer";
import Cars from "./car";
import Crousel from "./Carousel";
import image1 from "./offer-706850__340.jpg";

import "./home.css";

const Home = () => {
  return (
    <Container>
      <div>
        <nav class="navbar navbar-info bg-light " style={{ height: "100px" }}>
          <div class="container-fluid">
            <span>
              <h1 className="mt-2 mb-2" class="markee">
                Welcome To Online Food Delivery
              </h1>
              <br></br>
            </span>
          </div>
        </nav>
      </div>
      <br/>
      <div>
        <Row>
          <Col md={2} style={{ paddingLeft: "2px", marginTop: "10px" }}>
            <table className="table">
              <tr>
                <td>
                  <div class="dropdown">
                    <button
                      class="btn btn-info dropdown-toggle rounded-pill img"
                      type="button"
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Customer
                    </button>
                    <ul
                      class="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <li>
                        <Link class="dropdown-item active" to={"/customer/signin"}>
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item active" to={"/customer/signup"}>
                          Sign Up
                        </Link>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <br/>
              <tr>
                <td>
                  <div class="dropdown">
                    <button
                      class="btn btn-info dropdown-toggle rounded-pill img"
                      type="button"
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Restaurant Manager
                    </button>
                    <ul
                      class="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <li>
                        <Link class="dropdown-item active" to={"/manager/signin"}>
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item active" to={"/manager/signup"}>
                          Sign Up
                        </Link>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <br/>
              <tr>
                <td>
                  <div class="dropdown">
                    <button
                      class="btn btn-info dropdown-toggle rounded-pill img"
                      type="button"
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Delivery Person
                    </button>
                    <ul
                      class="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <li>
                        <Link class="dropdown-item active" to={"/dp/signin"}>
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item active" to={"/deliveryperson/signup"}>
                          Sign Up
                        </Link>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <br/>
              {/* New Admin Dropdown */}
              <tr>
                <td>
                  <div class="dropdown">
                    <button
                      class="btn btn-info dropdown-toggle rounded-pill img"
                      type="button"
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </button>
                    <ul
                      class="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <li>
                        <Link class="dropdown-item active" to={"/admin/signin"}>
                          Sign In
                        </Link>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>

              <tr>
                {/* <img src={image1} style={{ paddingRight: "30px", height:"200px", width:"300px" }} /> */}
              </tr>
            </table>
          </Col>

          <Col md={10} style={{ paddingLeft: "200px", marginTop: "10px" }}>
            <Crousel />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Home;
