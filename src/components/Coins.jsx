import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { SERVER } from "../main";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [coinStorage, setCoinStorage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [searchItem, setSearchItem] = useState("");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const buttons = new Array(110).fill(0);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${SERVER}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setCoinStorage(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  const filterItem = (event) => {
    setSearchItem(event.target.value);
    const foundItems = coinStorage.filter((coin) =>
      coin.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    if (foundItems.length !== 0) setCoins(foundItems);
    else setCoins(coins);
  };
  return (
    <Container maxW={"container.xl"}>
      {error ? (
        <ErrorComponent message={"Internal Server Error.."} />
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>₹ INR</Radio>
              <Radio value={"usd"}>$ USD</Radio>
              <Radio value={"eur"}>€ EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack justifyContent={"center"}>
            <Input
              onChange={filterItem}
              placeholder={"Search Coin..."}
              w={["60", "md"]}
              border={"2px solid rgb(144,200,249)"}
              focusBorderColor={"false"}
            />
          </HStack>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((coin) => (
              <CoinCard
                key={coin.id}
                id={coin.id}
                name={coin.name}
                img={coin.image}
                symbol={coin.symbol}
                price={coin.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {buttons.map((btn, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
