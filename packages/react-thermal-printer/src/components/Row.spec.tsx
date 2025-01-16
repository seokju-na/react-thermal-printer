import { Row } from "./Row";
import { Printer } from "./Printer";
import { render } from "../render";

it("fix invalid count value error for long text", async () => {
  await render(
    <Printer type="epson" width={42} characterSet="korea">
      <Row
        left="다섯글자다"
        right={"잉잉잉잉잉잉잉3잉잉잉잉잉잉잉-3잉4잉999잉잉"}
      />
    </Printer>
  );
});
