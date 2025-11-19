import { Container, Title, Text, Grid, Card, Stack, Group, Button, TextInput, Textarea } from '@mantine/core';
import { IconPhone, IconMapPin, IconClock, IconMail, IconSend } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import styles from './ContactOrder.module.scss';

const ContactOrder = () => {
  const { t } = useTranslation('landing');
  return (
    <div className={styles.section}>
      <Container size="lg">
        <Stack gap="xl" align="center" className={styles.header}>
          <Title order={2} className={styles.title}>
            {t('contact.title')}
          </Title>
          <Text size="lg" className={styles.subtitle} ta="center" maw={600}>
            {t('contact.subtitle')}
          </Text>
        </Stack>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="lg">
              <Title order={3} className={styles.contactTitle}>
                {t('contact.contactInformation')}
              </Title>
              
              <Card className={styles.contactCard} shadow="sm" radius="lg">
                <Stack gap="md">
                  <Group className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <IconPhone size={24} />
                    </div>
                    <div>
                      <Text fw={600} size="lg">{t('contact.phone')}</Text>
                      <Text size="md" c="dimmed">(555) 123-PIZZA</Text>
                    </div>
                  </Group>

                  <Group className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <IconMail size={24} />
                    </div>
                    <div>
                      <Text fw={600} size="lg">{t('contact.email')}</Text>
                      <Text size="md" c="dimmed">orders@pizzahub.com</Text>
                    </div>
                  </Group>

                  <Group className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <IconMapPin size={24} />
                    </div>
                    <div>
                      <Text fw={600} size="lg">{t('contact.address')}</Text>
                      <Text size="md" c="dimmed">123 Pizza Street, Food City, FC 12345</Text>
                    </div>
                  </Group>

                  <Group className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <IconClock size={24} />
                    </div>
                    <div>
                      <Text fw={600} size="lg">{t('contact.hours')}</Text>
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
                  {t('contact.orderOnline')}
                </Button>
                <Button size="lg" variant="outline" className={styles.callButton}>
                  {t('contact.callNow')}
                </Button>
              </div>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card className={styles.formCard} shadow="sm" radius="lg">
              <Stack gap="md">
                <Title order={3} className={styles.formTitle}>
                  {t('contact.sendMessage')}
                </Title>
                
                <TextInput
                  label={t('contact.yourName')}
                  placeholder={t('contact.enterName')}
                  size="md"
                  className={styles.input}
                />
                
                <TextInput
                  label={t('contact.emailAddress')}
                  placeholder={t('contact.enterEmail')}
                  size="md"
                  className={styles.input}
                />
                
                <TextInput
                  label={t('contact.phoneNumber')}
                  placeholder={t('contact.enterPhone')}
                  size="md"
                  className={styles.input}
                />
                
                <Textarea
                  label={t('contact.message')}
                  placeholder={t('contact.enterMessage')}
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
                  {t('contact.send')}
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
