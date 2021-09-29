import React from 'react';
import { IonButton, IonCol, IonIcon, IonRow, IonCard, IonCardContent } from '@ionic/react';


const BmiResult: React.FC<{
  bmiftlbs: number,
  bmi: number,
  kategori:string
}> = props => {
	return (
		<IonRow>
        <IonCol>
              <IonCard>
                  <IonCardContent className="ion-text-center">
                      <h2>{props.bmi}</h2>
                      <h2>{props.kategori}</h2>
                  </IonCardContent>
              </IonCard>
          </IonCol>
    </IonRow>
	);
};

export default BmiResult;