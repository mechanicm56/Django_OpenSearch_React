/* eslint-disable import/no-extraneous-dependencies */
import { motion } from "framer-motion";

import Dessert from "../components/Dessert";
import Popular from "../components/Popular";
import Veggie from "../components/Veggie";

function Home() {
  return (
    <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Popular />
      {/* <Veggie />
      <Dessert /> */}
    </motion.div>
  );
}

export default Home;
