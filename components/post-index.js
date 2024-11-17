import Header from "./features/Header";
import Row from "./features/Row";

export function PostIndex({ data }) {
  const { row1, row2 } = data || {};

  return (
    <>
      <Header />
      <Row data={row1} />
      <Row data={row2} />
    </>
  );
}
