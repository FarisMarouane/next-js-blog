'use client';

import { stripHtml } from 'string-strip-html';
import Image from 'next/image';

import useSpeech from '../hooks/useSpeech';
import useIsMobile from '../hooks/useIsMobile';
import useIsMacOs from '../hooks/useIsMacOs';
import useIsChromiumBased from '../hooks/useIsChromiumBased';
import { Locale } from '../i18n-config';
import styles from '../styles/components/ReadArticle.module.scss';

const ReadArticle = ({
  locale,
  articleContent,
  titleTranslation,
}: {
  locale: Locale;
  articleContent: string;
  titleTranslation: string;
}) => {
  const { toggleSpeaking, isSpeaking } = useSpeech(
    stripHtml(articleContent).result,
    locale,
  );

  const isMobile = useIsMobile();
  const isMacOs = useIsMacOs();
  const isChromiumBrowser = useIsChromiumBased();

  const handleClick = () => {
    toggleSpeaking();
  };

  if (!isMobile && isMacOs && isChromiumBrowser) {
    return (
      <button
        type="button"
        className={styles.read_article_button}
        onClick={handleClick}
      >
        <span>{titleTranslation} </span>
        <Image
          src={
            isSpeaking
              ? '/images/sound_off_icon_black.png'
              : '/images/sound_on_icon_black.png'
          }
          alt="sound_icon"
          width={16}
          height={16}
        />
      </button>
    );
  }

  return null;
};

export default ReadArticle;
