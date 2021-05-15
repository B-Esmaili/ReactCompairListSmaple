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
import { addProductToCompairList } from "../actions/compair-list";
import { connect } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

let aspects = {
  title: { label: "", render: (t) => t },
  price: { label: "Price", render: (v) => v ? `${v}$` : "" },
  colors: {
    label: "Colors",
    render: (v) => (
      <Box direction="row">
        {v.map((c) => (
          <Box
            pad="xxsmall"
            background={c}
            round="full"
            width="1em"
            height="1em"
          />
        ))}
      </Box>
    ),
  },
  condition: { label: "Condition", render: (v) => v },
};

const CompairList = (props) => {
  let { compairList } = props;

  let emptyObj = {
    colors: [],
    price: "",
    title: ""
  };

  let items = useMemo(()=>{
      let trimede =  compairList.slice(0, 3);
      return padArray(trimede , 3 , emptyObj);
  });
   
  return (
    <Box background="light-1" margin={{ top: "large" }} pad="small"> 
      <Grid columns="15em" gap="small">
        {Object.keys(aspects).map((asp) => (
          <>
            <Box>{aspects[asp].label}</Box>
            {
              items
              .map((p) => (
                <Box> {aspects[asp].render(p[asp])} </Box>
              ))}
          </>
        ))}
      </Grid>
    </Box>
  );
};

const padArray = (arr, size, fill=null)=> {
    return arr.concat(Array(size - arr.length).fill(fill));
}

const mapStateToProps = (state) => {
  return {
    compairList: state.compairList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCompairList: (p) => dispatch(addProductToCompairList(p)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompairList);
