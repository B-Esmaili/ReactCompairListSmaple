import {
  Box,
  Grid,
  Card,
  Button,
  CardBody,
  CardFooter,
  Image,
  Text,
  Stack,
} from "grommet";
import { addProductToCompairList, removeFromCompairList } from "../actions/compair-list";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useGet } from "restful-react";
import styled from "styled-components";
import { commerce } from "faker";

const HoverElement = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: none;
  opacity: 0.7;
  transition: background-color 0.5s;
`;
const ProductBody = styled(Box)`
  position: relative;
  height: 100%;

  &:hover ${HoverElement} {
    display: initial;
  }
`;

const Products = (props) => {
  let { addToCompairList, compairList ,removeFromCompairList} = props;

  let [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      if (!products.length) {
        let _products = await (
          await fetch("https://fakestoreapi.com/products")
        ).json();

        setProducts(
          _products.slice(0, 8).map((p) => ({
            ...p,
            colors: new Array(3).fill(0).map((c) => commerce.color()),
            condition: commerce.productAdjective(),
          }))
        );
      }
    })();
  }, []);

  return (
    <Box width="1200px">
      <Grid columns="15em" fill="horizontal" gap="small">
        {products.map((p) => (
          <Card height="small" width="small" background="#fff" fill>
            <CardBody pad={false}>
              <ProductBody>
                <Box>
                  <Image src={p.image}></Image>
                </Box>
                <HoverElement background="green">
                  <Box fill justify="center" align="center" direction="row">
                    {compairList.some((ci) => ci.id === p.id) ? (
                      <Button
                        label="Remove from list"
                        background="brand"
                        primary
                        onClick={() => removeFromCompairList(p.id)}
                      />
                    ) : (
                      <Button
                        label="Add to list"
                        background="brand"
                        primary
                        onClick={() => addToCompairList(p)}
                      />
                    )}
                  </Box>
                </HoverElement>
              </ProductBody>
            </CardBody>
            <CardFooter
              pad={{ horizontal: "medium", vertical: "small" }}
              background="#fff"
            >
              <Box background="#fff" fill>
                <Box direction="row">
                  <Text truncate> {p.title} </Text>
                  <Text alignSelf="end" textAlign="start" color="green">
                    {" "}
                    {p.price} $
                  </Text>
                </Box>
                <Box>
                  <Text> {p.category} </Text>
                </Box>
              </Box>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    compairList: state.compairList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCompairList: (p) => dispatch(addProductToCompairList(p)),
    removeFromCompairList: (p) => dispatch(removeFromCompairList(p)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
