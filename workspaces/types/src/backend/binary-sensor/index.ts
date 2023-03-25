import { HABayesianBinarySensor } from "./bayesian";
import { HATrendBinarySensor } from "./trend";

export * from "./bayesian";
export * from "./trend";

export type HABinarySensor = HABayesianBinarySensor | HATrendBinarySensor;
