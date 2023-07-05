import React, { useEffect, useRef } from "react";
import styles from "./BookMeeting.module.scss";
import { useLocation } from "react-router";
import Form from "react-bootstrap/Form";
import { joinClasses } from "../../common/utils/joinClasses";
import { toast } from "react-toastify";

export const BookMeeting = () => {
  const location = useLocation();
  const data = location.state;
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = () => {
    if (Math.floor(Math.random() * 100) % 2 === 0) {
      toast.success("Message sent successfully");
    } else {
      toast.error("Message sent failed");
    }
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          style={{
            backgroundImage: `url(${data.image})`,
            backgroundSize: `cover`,
          }}
          className={styles.image}
        ></div>
        <div className={styles.info}>
          <div className={styles.header}>{data.title}</div>
          <div className={styles.text}>${data.price} per month</div>
          <div className={styles.text}>Seller: {data.seller.name}</div>
          <div className={styles.text}>Email: {data.seller.email}</div>
          <div className={joinClasses(styles.text, styles.margin)}>
            Phone number: {data.seller.phoneNumber}
          </div>
          <Form className={styles.formContainer}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Type your message..."
                ref={messageRef}
              />
            </Form.Group>
            <button
              type="button"
              className={styles.button}
              onClick={handleClick}
            >
              Sent a message
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};
