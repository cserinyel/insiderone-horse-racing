export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "border";
  disabled?: boolean;
}