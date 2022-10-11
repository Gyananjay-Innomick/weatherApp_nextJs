import { Container } from "reactstrap";
import { ThreeCircles } from "react-loader-spinner";

export const Loading = (): JSX.Element => {
  return (
    <Container style={{ height: "80vh" }}>
      <ThreeCircles
        data-testid="threeCircles"
        height="100"
        width="100"
        color="#5e82f4"
        wrapperStyle={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
        visible={true}
        ariaLabel="three-circles-rotating"
        innerCircleColor="#8198e6"
        middleCircleColor="#a6b4e0"
      />
    </Container>
  );
};