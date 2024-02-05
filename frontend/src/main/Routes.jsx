import React from "react";
import { Route, Routes } from "react-router-dom";

import UserCrud from "../components/user/UserCrud";

export default (props) => (
  <Routes>
    <Route exact path="/" element={<UserCrud />} />
    <Route path="/*" element={<UserCrud />} />
  </Routes>
);
