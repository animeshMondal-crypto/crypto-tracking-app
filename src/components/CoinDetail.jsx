import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER } from "../main";
import Chart from "./Chart";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";
import Item from "./Item";
import CustomBar from "./CustomBar";

const CoinDetail = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const params = useParams();
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const switchChartStats = (value) => {
    switch (value) {
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "365d":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${SERVER}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${SERVER}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  return (
    <Container maxW={"container.xl"}>
      {error ? (
        <ErrorComponent message={"Internal Server Error.."} />
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"} borderWidth={1}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>
          <HStack
            p={"4"}
            overflowX={["auto"]}
            justifyContent={["none", "center"]}
          >
            {btns.map((timeFrame) => (
              <Button
                key={timeFrame}
                onClick={() => switchChartStats(timeFrame)}
              >
                {timeFrame}
              </Button>
            ))}
          </HStack>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>₹ INR</Radio>
              <Radio value={"usd"}>$ USD</Radio>
              <Radio value={"eur"}>€ EUR</Radio>
            </HStack>
          </RadioGroup>
          <VStack spacing={"4"} alignItems={"flex-start"} p={"16"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
              Last Updated On {Date(coin.market_data.last_updated)}
            </Text>
            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h >= 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.800"}
              color={"white"}
            >{`#${coin.market_cap_rank}`}</Badge>
            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />
            <Box w={"full"} p={"4"}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

export default CoinDetail;
