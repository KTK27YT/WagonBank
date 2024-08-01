"use client";
import React, { useEffect, useRef } from "react";
import styles from './credit-card.module.css';
import VanillaTilt from "vanilla-tilt";


interface CreditCardProps {
  cardnumber: string;
  name: string;
  expiry: string;
  start: string;
}

const CreditCard: React.FC<CreditCardProps> = ({ cardnumber, name, expiry, start }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.8,
      });
    }

    //Don't want typescript to annoy me
    const cardElement = cardRef.current as unknown as { vanillaTilt: VanillaTilt };
    return () => {
      if (cardRef.current) {
        cardElement.vanillaTilt.destroy();
      }
    };
  }, []);
  return (
    <div ref={cardRef} className={styles.card} data-tilt data-tilt-glare data-tilt-max-glare="0.8">
      <div className={styles.cardcontent}>
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
          <div className={styles.from}>{start}</div>
          <div className={styles.from}>{expiry}</div>
        </div>
      </div>
    </div>
  );
}

export default CreditCard;