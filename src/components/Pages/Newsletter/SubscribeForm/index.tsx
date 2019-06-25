import * as React from 'react';

import styles from './index.module.scss';

interface SubscribeFormProps {
  emailSubscriptionService: EmailSubscriptionService;
}

export default function SubscribeForm({ emailSubscriptionService: { endpoint, hiddenFieldName } }: SubscribeFormProps) {
  return (
    <div className={styles.subscribe}>
      <form
        action={endpoint}
        method="post"
        name="mc-embedded-subscribe-form"
        target="_blank"
        className={styles.subscribeForm}
      >
        <div className={styles.emailField}>
          <input type="email" name="EMAIL" tabIndex={0} className={styles.email} placeholder="Enter your email" />
        </div>
        <button type="submit" name="subscribe" className={styles.submit}>
          Subscribe
        </button>
        <div aria-hidden="true" className={styles.hiddenField}>
          <input type="text" name={hiddenFieldName} tabIndex={-1} />
        </div>
      </form>
      <div className={styles.subscriptionInfo}>*I will never spam. One click to unsubscribe.</div>
    </div>
  );
}
