import "moment/locale/hu";

import moment from "moment";

import {
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
} from "@ionic/react";

import { ArticleData } from "../models/article-data";

interface ArticleItemProps {
  article: ArticleData
}

export const ArticleItem = ({ article }: ArticleItemProps) => {
  const domain = new URL(article.url).hostname.replace('www.', '')

  return (
    <IonCard>
      {article.urlToImage && (
        <img src={article.urlToImage} alt="Article Image" />
      )}
      <IonCardHeader>
        <IonCardSubtitle>{domain}</IonCardSubtitle>
        <IonCardTitle
          onClick={() => window.open(article.url, '_system', 'location=yes')}
        >
          {article.title}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{article.description}</IonCardContent>

      <IonCardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {moment(article.publishedAt).format('LLL')}
      </IonCardContent>
    </IonCard>
  )
}
