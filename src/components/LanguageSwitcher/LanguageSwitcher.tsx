import { Button, Popover, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './LanguageSwitcher.module.scss';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [opened, setOpened] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpened(false);
  };

  const currentLabel = i18n.language === 'vi' ? 'VI' : 'EN';

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      width={120}
      position="bottom-end"
      shadow="md"
    >
      <Popover.Target>
        <Button
          size="sm"
          variant="filled"
          className={classes.activeButton}
          onClick={() => setOpened((v) => !v)}
        >
          {currentLabel}
        </Button>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack gap={6}>
          <Button
            size="xs"
            variant={i18n.language === 'en' ? 'filled' : 'outline'}
            className={
              i18n.language === 'en'
                ? classes.activeButton
                : classes.inactiveButton
            }
            onClick={() => changeLanguage('en')}
          >
            English
          </Button>

          <Button
            size="xs"
            variant={i18n.language === 'vi' ? 'filled' : 'outline'}
            className={
              i18n.language === 'vi'
                ? classes.activeButton
                : classes.inactiveButton
            }
            onClick={() => changeLanguage('vi')}
          >
            Vietnamese
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default LanguageSwitcher;
