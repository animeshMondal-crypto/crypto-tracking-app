import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER } from "../main";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";
import ExchangeCard from "./ExchangeCard";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${SERVER}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  return (
    <Container maxW={"container.xl"}>
      {error ? (
        <ErrorComponent message={"Internal Server Error.."} />
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((exchange) => (
              <ExchangeCard
                key={exchange.id}
                name={exchange.name}
                img={exchange.image}
                rank={exchange.trust_score_rank}
                url={exchange.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};
export default Exchanges;
