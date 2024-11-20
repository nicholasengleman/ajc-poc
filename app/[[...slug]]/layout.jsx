import { draftMode } from "next/headers";
import Container from "../../components/Container";

import "./../globals.css";
import "../../styles/base/_index.scss";
import "../../styles/container/_index.scss";

export default function RootLayout({ children }) {
  const { isEnabled } = draftMode();

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <main>
            <Container>{children}</Container>
          </main>
        </div>
      </body>
    </html>
  );
}
