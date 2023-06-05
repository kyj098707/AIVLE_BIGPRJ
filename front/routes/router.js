import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

//{(retrun)} ...이고 {} 없이 ()사용하면 retrun을 생략한다.
const MyRoter = () => (
  <Fragment>
    <Header />
    <h2>Hello Body</h2>
    <Footer />
    <a href=""></a>
  </Fragment>
);

export default MyRoter;
