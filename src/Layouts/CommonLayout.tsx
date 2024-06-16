import React, { ReactNode } from "react";
import { AppShell, Center, Box } from "@mantine/core";

import Header from "../Components/CustomHeader";

interface CommonLayoutProps {
  children: ReactNode;
}
const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <AppShell padding="md">
      <Header />
      <AppShell.Main>
        <Box mt={200}>

        {children}
        </Box>
      </AppShell.Main>
      <footer>
        <Center>
          <p>
            &copy; {new Date().getFullYear()} Smarter Contract. All rights
            reserved.
          </p>
        </Center>
      </footer>
    </AppShell>
  );
};

export default CommonLayout;
