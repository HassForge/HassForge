import { ColorMap } from "./color-map";
import { ForegroundColor } from "./styles";

export const glowColors: ColorMap<ForegroundColor> = {
  none: {
    pressingOn: "border-transparent",
    on: "border-transparent",
  },
  yellow: {
    pressingOn: `neuro-glow 
      [--glow-text-1:theme(colors.yellow.700)] 
      [--glow-text-2:theme(colors.yellow.700)] 
      [--glow-text-3:theme(colors.yellow.800)] 
      [--shadow-end:theme(colors.yellow.400/10%)] 
      [--shadow-start:theme(colors.yellow.700/22%)]`,
    on: `neuro-glow 
      [--glow-text-1:theme(colors.yellow.500)]
      [--glow-color-1-start:theme(colors.yellow.700/10%)] 
      [--glow-color-1-end:theme(colors.yellow.400/8%)] 
      
      [--glow-text-2:theme(colors.yellow.900)]
      [--glow-color-2-start:theme(colors.yellow.700/14%)] 
      [--glow-color-2-end:theme(colors.yellow.400/9%)] 
      
      [--glow-text-3:theme(colors.yellow.600)]
      [--glow-color-3-start:theme(colors.yellow.700/10%)] 
      [--glow-color-3-end:theme(colors.yellow.400/7%)] 
      `,
  },
  red: {
    pressingOn: `neuro-glow  neuro-shadow-lg
      [--glow-text-1:theme(colors.red.700)] 
      [--glow-text-2:theme(colors.red.950)] 
      [--glow-text-3:theme(colors.red.800)] 
      [--shadow-end:theme(colors.red.500/10%)] 
      [--shadow-start:theme(colors.red.950/22%)]`,
    on: `neuro-glow  neuro-shadow-md
      [--glow-text-1:theme(colors.red.500)]
      [--glow-color-1-start:theme(colors.red.950/20%)] 
      [--glow-color-1-end:theme(colors.red.500/10%)] 
      
      [--glow-text-2:theme(colors.red.900)]
      [--glow-color-2-start:theme(colors.red.950/18%)] 
      [--glow-color-2-end:theme(colors.red.500/8%)] 
      
      [--glow-text-3:theme(colors.red.600)]
      [--glow-color-3-start:theme(colors.red.950/30%)] 
      [--glow-color-3-end:theme(colors.red.500/12%)] 
      `,
  },
  orange: {
    pressingOn: `neuro-glow 
      [--glow-text-1:theme(colors.orange.700)] 
      [--glow-text-2:theme(colors.orange.950)] 
      [--glow-text-3:theme(colors.orange.800)] 
      [--shadow-end:theme(colors.orange.500/10%)] 
      [--shadow-start:theme(colors.orange.950/22%)]`,
    on: `neuro-glow 
      [--glow-text-1:theme(colors.orange.500)]
      [--glow-color-1-start:theme(colors.orange.950/24%)] 
      [--glow-color-1-end:theme(colors.orange.200/2%)] 
      
      [--glow-text-2:theme(colors.orange.900)]
      [--glow-color-2-start:theme(colors.orange.950/20%)] 
      [--glow-color-2-end:theme(colors.orange.200/3%)] 
      
      [--glow-text-3:theme(colors.orange.600)]
      [--glow-color-3-start:theme(colors.orange.950/26%)] 
      [--glow-color-3-end:theme(colors.orange.200/2%)] 
      `,
  },
};
