"use client";
import React, { useState } from "react";
import * as styles from "./styles/blocks/styles";
import ToDo from "../components/ToDo"
import Title from "../components/Title"

export default function Home() { 

  return (
    <styles.PrimeContainer>
      <Title/>
      <ToDo/>
    </styles.PrimeContainer>
  );
}
