import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER } from "../main";
import { Container, HStack, Input } from "@chakra-ui/react";
import Loader from "./Loader";
import ExchangeCard from "./ExchangeCard";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [exchangeStore, setExchangeStore] = useState([]);

  const filterItem = (event) => {
    setSearchItem(event.target.value);
    const foundItems = exchangeStore.filter((exchange) =>
      exchange.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    if (foundItems.length !== 0) setExchanges(foundItems);
    else setExchanges(exchangeStore);
  };

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${SERVER}/exchanges`);
        setExchanges(data);
        setExchangeStore(data);
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
          <HStack justifyContent={"center"}>
            <Input
              onChange={filterItem}
              placeholder={"Search Coin..."}
              w={["60", "md"]}
              m={"8"}
              border={"2px solid rgb(144,200,249)"}
              focusBorderColor={"false"}
            />
          </HStack>
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
