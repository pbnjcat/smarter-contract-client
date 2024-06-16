import { useState } from 'react';
import {
  Container,
  Group,
  Box,
  Button,
  Text,
  AppShell,
} from "@mantine/core";
import detectEthereumProvider from '@metamask/detect-provider';

import styled from "../styles/header.module.scss";
import LangMenu from "./LangMenu";
import TemplateMenu from "./TemplateBtn";

export default function Header() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      console.log('MetaMask is installed!');
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
      `}</style>
      <AppShell.Header>
        <Container className={styled.inner}>
          <Text size="lg" fw={500} style={{ fontFamily: 'Poppins, sans-serif' }}>
            Smarter Contract
          </Text>
          <Box className={styled.button_grp}>
            
          </Box>
          <Group visibleFrom="xs">
            <Button onClick={connectWallet}>
              {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
            </Button>
          </Group>
        </Container>
      </AppShell.Header>
    </>
  );
}
