import Header from "../../../../components/features/Header";
import Row from "../../../../components/features/Row";

export function SectionFrontLayout({ data }) {
  const { row1, row2 } = data || {};

  return (
    <>
      <Header />
      <Row data={row1} />
      <Row data={row2} />
    </>
  );
}
