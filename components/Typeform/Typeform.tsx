interface Props extends Omit<InputHTMLAttributes<any>, "onChange"> {
  className?: string;
  onChange: (value: string) => void;
}

const Input = ({}: Props) => {
  return <div></div>;
};
export default Input;
