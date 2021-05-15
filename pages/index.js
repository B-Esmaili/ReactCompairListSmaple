import Head from "next/head";
import styles from "../styles/Home.module.css";
import configureStore from "../components/store";
import Products from "../components/products";
import CompairList from "../components/compair-list";
import { Box } from "grommet";

export default function Home() {
  return (
    <div className={styles.container}>
      <Box background="light-3" pad="small">
        <Products />
        <CompairList />
      </Box>
    </div>
  );
}
