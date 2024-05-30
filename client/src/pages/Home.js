import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            // we will send api request with header Authorization; split in backend
          },
        }
      );
      // console.log(response.data);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getData();
  });
  return (
    <Layout>
      <h1>HomePage</h1>
    </Layout>
  );
}

export default Home;
