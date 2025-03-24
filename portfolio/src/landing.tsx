import { Blockquote, Button, MantineProvider } from '@mantine/core';
import { Card, Image, Text, Badge,  Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import './index.css'

export default function Landing() {
  const navigate = useNavigate();
  const mainPage=()=>{
  navigate("/bv.gaurav");
  }
  return (
    <MantineProvider theme={{ fontFamily: 'Open Sans' }} withGlobalStyles withNormalizeCSS>
<div style={{ 
  backgroundColor: "#111111",
  height: "100vh",
  width: "100vw",
  display: "flex", 
  justifyContent: "center",
  alignItems: "center"       
}}>
    <Card shadow="sm" padding="lg" radius="md" withBorder  style={{width:"500px"}} >
      <Card.Section>
          <Image
            src="/assets/doodle.jpg"
            height={160}
            alt="Norway"
            radius="md"
          />
        <Image src="/assets/Daft_Punk_-_Random_Access_Memories.jpg" height={100} width={100} radius="100%"alt="it's me" />
      <Group position="apart" mt="md" mb="xs">
      <Text variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} sx={{ fontFamily: 'Greycliff CF, sans-serif' }} fz="xl" fw={700} >Gaurav B V</Text>
        <Badge color="red" variant="light" size='xl'>
          loading
        </Badge>
      </Group>
      </Card.Section>
      <Text size="sm" >
      Hi, I'm Gaurav. It looks like you're interested in learning more about me. Please wait while the assets load.
      </Text>

      <Blockquote cite="bvgaurav" color='dimmed' >
        Life is like an npm install  you never know what you are going to get.
      </Blockquote>
      <Button variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 45 }}  onClick={mainPage} fullWidth mt="md" radius="md">
       Go to main page
      </Button>
    </Card>

  </div>  
    </MantineProvider>
  );
} 