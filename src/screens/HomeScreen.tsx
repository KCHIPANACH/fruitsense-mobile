import React from "react";
import { MainTemplate } from "../components/templates/MainTemplate";
import { PredictionPanel } from "../components/organisms/PredictionPanel";

export const HomeScreen: React.FC = () => (
  <MainTemplate>
    <PredictionPanel />
  </MainTemplate>
);
