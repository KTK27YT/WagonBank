"use client";
import React from "react";
import styles from './credit-card.module.css';

interface CreditCardProps {
    cardnumber: string;
    name: string;
    expiry: string;
    start: string;
  }

const CreditCard: React.FC<CreditCardProps> = ({cardnumber, name, expiry, start}) => {
    return (
        <div className={styles.card} data-tilt data-tilt-glare data-tilt-max-glare="0.8">
    <div className={styles.cardcontent}>
      <div className={styles.row}>
        <div className={styles.status}>
          Premium
        </div>
        <div className={styles.logo}>
          <img className={styles.image} src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrsDN4CdYzmxGhcrZzhpNFYdGfFesb0M5nCSXPGYDGt3cLH3hMlRFPQVevdyTLNyglGqII6XySeAm8X1RwPyabrpnGBAmNxYX27rFbUVMPsfGZEQ4jYqY0c-64_wsm8Jh9pKJhRBTbYQDdfMfRQyD8Piqky_W2JHEPGxCRXcYcCE6YrBECAKJehJ0_/s1600/logo.png" alt="">
          </img>
        </div>
      </div>
      <div className={styles.chip}>
        <img className={styles.image} src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFzeQ0hz39haiHkhSOKnHJCG3v6AynORgBKrj0Zf2FTYMvjAsDAxzqIFZ8DYXbyq_-u_kuZcgg5nRpXxVGp18K15NiCGvVwTv-8QUGdZwJS3sSlhRpqEpZ3RHP7vQCIoKYnd6UFEAzxrhFPR5byjFFR6ld7gWvNCD7g5LF3Y6uhJvgY1_hw8qBCqO6/s1600/chip.png" alt="">
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