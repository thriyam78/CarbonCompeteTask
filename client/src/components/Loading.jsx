import { Triangle } from "react-loader-spinner";

export default function Loading({ className }) {
  return (
    <div
      className={`flex ${className} justify-center align-middle h-full w-full`}
    >
      <Triangle
        height={60}
        width={60}
        color="#7D4E35"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}