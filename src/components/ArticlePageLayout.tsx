import { logoRss, settingsOutline } from 'ionicons/icons'
import { FC, useEffect, useRef } from 'react'

import {
    IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonRefresher,
    IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail, useIonRouter
} from '@ionic/react'

import { AppIonBackButton } from './AppIonBackButton'

interface ArticlePageLayoutProps {
  title: string
  refreshFunction: (e: CustomEvent<RefresherEventDetail>) => Promise<void>
  virtuosoRef: any
  scrolledToTop: boolean
}

export const ArticlePageLayout: FC<ArticlePageLayoutProps> = ({
  children,
  title,
  refreshFunction,
  virtuosoRef,
  scrolledToTop,
}) => {
  const router = useIonRouter()
  const contentRef = useRef<HTMLIonContentElement>(null)

  useEffect(() => {
    const handleScrollToTop = (e: any) => {
      if (e.detail.selected) {
        contentRef.current?.scrollToTop(500)
        virtuosoRef.current?.scrollToIndex({
          index: 0,
          behavior: 'smooth',
        })
      }
    }
    window.addEventListener('ionTabButtonClick', handleScrollToTop)

    return () => {
      window.removeEventListener('ionTabButtonClick', handleScrollToTop)
    }
  }, [virtuosoRef])

  const onRSSPage = () => router.routeInfo.pathname === '/rss'

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <AppIonBackButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              color={onRSSPage() ? 'primary' : ''}
              onClick={() => {
                router.push('/rss')
                if (onRSSPage()) {
                  contentRef.current?.scrollToTop(500)
                  virtuosoRef.current?.scrollToIndex({
                    index: 0,
                    align: 'end',
                    behavior: 'smooth',
                  })
                }
              }}
            >
              <IonIcon icon={logoRss}></IonIcon>
            </IonButton>
            <IonButton onClick={() => router.push('/options')}>
              <IonIcon icon={settingsOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen ref={contentRef}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRefresher
          slot="fixed"
          onIonRefresh={refreshFunction}
          disabled={!scrolledToTop}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {children}
      </IonContent>
    </IonPage>
  )
}
