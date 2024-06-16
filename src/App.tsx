import { MantineProvider } from '@mantine/core';
import "@mantine/core/styles.css";
import { Router } from './Router';
import CommonLayout from './Layouts/CommonLayout';

function App() {
  return (
    <MantineProvider>
      <CommonLayout>
        <Router />
      </CommonLayout>
    </MantineProvider>
  );
}

export default App;