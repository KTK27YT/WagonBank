import React, { useEffect, useState } from 'react';
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import Icon from './Icon-border';
import styles from './credit-card.module.css';


export interface CardDetailsProps {
    cardDetailsData: {
        PAN: string,
        expiry: string,
        cvv: string,
        image: string,
        character: string,
        Name: string
    };
}



export const CreditCardUI: any = ({ cardDetailsData }: CardDetailsProps) => {
    const { PAN, expiry, cvv, image, character, Name } = cardDetailsData;

    return (

        <Card title="null" name={Name} cardnumber={PAN} expiry={expiry} cvv={cvv} icon={image}>

        </Card >

    );
};


interface CardProps {
    title: React.ReactNode;
    icon: React.ReactNode;
    children?: React.ReactNode;
    cardnumber: string;
    name: string;
    expiry: string;
    cvv?: string;
}

export const Card: React.FC<CardProps> = ({ title, icon, children, cardnumber, name, cvv, expiry }) => {
    const [cvvVisible, setCvvVisible] = useState(false);
    const [retrievedCvv, setRetrievedCvv] = useState(cvv ?? '');

    const handleButtonClick = () => {

        setCvvVisible(!cvvVisible);
    };


    return (

        <div className={styles.cardnoblur} style={{
            backgroundImage: `url(${icon})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            width: '450px',
            height: '270px',
            overflow: 'hidden',


        }} >
            <div className={styles.cardcontentdarken} >
                <div className={styles.row}>
                    <div className={styles.status}>
                        WagonBank
                    </div>
                    <div className={styles.logo}>
                        <img className={styles.image} src="/visa.png" alt="">
                        </img>
                    </div>
                </div>
                <div className={styles.chip}>
                    <img className={styles.image} src="/Wagon.png" alt="">
                    </img>
                </div>
                <div className={styles.number}>{cardnumber}</div>
                <div className={styles.name}>{name}</div>
                <div className={styles.row}>
                    <div className={styles.from}>{expiry}</div>
                    <button onClick={handleButtonClick} className={styles.button}>
                        {cvvVisible ? 'Hide CVV' : 'Show CVV'}
                    </button>
                    {cvvVisible && <div className={styles.cvv}>CVV: {retrievedCvv}</div>}
                </div>

            </div>
        </div >
    );
};



export default CreditCardUI;