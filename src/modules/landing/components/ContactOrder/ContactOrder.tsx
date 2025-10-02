import { Container, Title, Text, Grid, Card, Stack, Group, Button, TextInput, Textarea } from '@mantine/core';
import { IconPhone, IconMapPin, IconClock, IconMail, IconSend } from '@tabler/icons-react';
import styles from './ContactOrder.module.scss';

const ContactOrder = () => {
  return (
    <div className={styles.section}>
      <Container size="lg">
        <Stack gap="xl" align="center" className={styles.header}>
          <Title order={2} className={styles.title}>
            Get In Touch
          </Title>
          <Text size="lg" className={styles.subtitle} ta="center" maw={600}>
            Ready to order? Have questions? We're here to help and deliver the best pizza experience!
          </Text>
        </Stack>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="lg">
              <Title order={3} className={styles.contactTitle}>
                Contact Information
              </Title>
              
              <Card className={styles.contactCard} shadow="sm" radius="lg">
                <Stack gap="md">
                  <Group className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <IconPhone size={24} />
                    </div>
                    <div>
                      <Text fw={600} size="lg">Phone</Text>
                      <Text size="md" c="dimmed">(555) 123-PIZZA</Text>
                    </div>
                  </Group>

                  <Group className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <IconMail size={24} />
                    </div>
                    <div>
                      <Text fw={600} size="lg">Email</Text>
                      <Text size="md" c="dimmed">orders@pizzahub.com</Text>
                    </div>
                  </Group>

                  <Group className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <IconMapPin size={24} />
                    </div>
                    <div>
                      <Text fw={600} size="lg">Address</Text>
                      <Text size="md" c="dimmed">123 Pizza Street, Food City, FC 12345</Text>
                    </div>
                  </Group>

                  <Group className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <IconClock size={24} />
                    </div>
                    <div>
                      <Text fw={600} size="lg">Hours</Text>
                      <Text size="md" c="dimmed">
                        Mon-Thu: 11AM - 10PM<br />
                        Fri-Sat: 11AM - 11PM<br />
                        Sun: 12PM - 9PM
                      </Text>
                    </div>
                  </Group>
                </Stack>
              </Card>

              <div className={styles.orderButtons}>
                <Button size="lg" className={styles.orderButton}>
                  Order Online
                </Button>
                <Button size="lg" variant="outline" className={styles.callButton}>
                  Call Now
                </Button>
              </div>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card className={styles.formCard} shadow="sm" radius="lg">
              <Stack gap="md">
                <Title order={3} className={styles.formTitle}>
                  Send us a Message
                </Title>
                
                <TextInput
                  label="Your Name"
                  placeholder="Enter your name"
                  size="md"
                  className={styles.input}
                />
                
                <TextInput
                  label="Email Address"
                  placeholder="Enter your email"
                  size="md"
                  className={styles.input}
                />
                
                <TextInput
                  label="Phone Number"
                  placeholder="Enter your phone"
                  size="md"
                  className={styles.input}
                />
                
                <Textarea
                  label="Message"
                  placeholder="Tell us about your order or any questions..."
                  rows={4}
                  size="md"
                  className={styles.input}
                />
                
                <Button 
                  size="lg" 
                  className={styles.submitButton}
                  leftSection={<IconSend size={20} />}
                  fullWidth
                >
                  Send Message
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactOrder;
