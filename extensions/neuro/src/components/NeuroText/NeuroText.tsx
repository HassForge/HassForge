import { ComponentChildren } from "preact";

export interface NeuroTextProps {
  children?: ComponentChildren;
}

export const NeuroText = ({ children }: NeuroTextProps) => {
  return (
    <div className="relative">
      <div className="text-4xl font-bold text-gray-800 neuro-shadow-text neuro-shadow-1px">
        {children}
      </div>
    </div>
  );
};
