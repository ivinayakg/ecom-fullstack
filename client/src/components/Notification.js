import { useState, useEffect } from "react";
import "./css/notificationComponent.css";

const notificationPUBSUB = () => {
  let subscriber = () => {};

  const subscribe = (cb) => {
    subscriber = cb;
  };

  const publish = (data) => {
    subscriber(data);
  };

  return { subscribe, publish };
};

export const { subscribe, publish: notificationHandler } = notificationPUBSUB();

const NotificationComponenet = ({ data, timeout }) => {
  return (
    <div className={`notification notification--${data?.type}`}>
      <div className="notification_content">{data?.content}</div>
      <div className="notification_slider">
        <div
          className="notification_slide"
          style={{ animationDuration: `${timeout}ms` }}
        ></div>
      </div>
    </div>
  );
};

export const NotificationParent = ({ timeout }) => {
  const [notify, setNotify] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setNotify(false);
        setData(null);
      }, timeout);
    }
  }, [data, timeout]);

  subscribe((data) => {
    setNotify(true);
    setData(data);
  });

  return (
    <>{notify && <NotificationComponenet timeout={timeout} data={data} />}</>
  );
};
