import { HAPackage } from "@hassforge/types";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export const mergeHAPackages = (packages: HAPackage[]): HAPackage => {
  return {
    automation: packages
      .map((pkg) => pkg.automation)
      .filter(notEmpty)
      .flat(),
    binary_sensor: packages
      .map((pkg) => pkg.binary_sensor)
      .filter(notEmpty)
      .flat(),
    climate: packages
      .map((pkg) => pkg.climate)
      .filter(notEmpty)
      .flat(),
    sensor: packages
      .map((pkg) => pkg.sensor)
      .filter(notEmpty)
      .flat(),
    template: packages
      .map((pkg) => pkg.template)
      .filter(notEmpty)
      .flat(),
    homeassistant: packages
      .map((pkg) => pkg.homeassistant)
      .reduce(
        (acc, ha) => {
          return {
            customize: { ...acc?.customize, ...ha?.customize },
          };
        },
        { customize: {} }
      ),
  };
};
